using Abp.AutoMapper;
using Abp.Extensions;
using Abp.IdentityFramework;
using Abp.MultiTenancy;
using Abp.Runtime.Security;
using LTMCompanyNameFree.YoyoCmsTemplate.Authorization.Roles;
using LTMCompanyNameFree.YoyoCmsTemplate.Authorization.Users;
using LTMCompanyNameFree.YoyoCmsTemplate.Editions;
using LTMCompanyNameFree.YoyoCmsTemplate.MultiTenancy.Dto;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LTMCompanyNameFree.YoyoCmsTemplate.MultiTenancy
{
    public class TenantRegistrationAppService : YoyoCmsTemplateAppServiceBase, ITenantRegistrationAppService
    {
        private readonly EditionManager _editionManager;
        private readonly RoleManager _roleManager;
        private readonly IAbpZeroDbMigrator _abpZeroDbMigrator;
        private readonly IPasswordHasher<User> _passwordHasher;

        public TenantRegistrationAppService(
            EditionManager editionManager,
            RoleManager roleManager,
            IAbpZeroDbMigrator abpZeroDbMigrator,
            IPasswordHasher<User> passwordHasher)
        {
            _editionManager = editionManager;

            _roleManager = roleManager;
            _abpZeroDbMigrator = abpZeroDbMigrator;
            _passwordHasher = passwordHasher;
        }

        public async Task<TenantDto> RegisterTenant(CreateTenantDto input)
        {
            // 创建租户
            var tenant = new Tenant(input.TenancyName, input.TenancyName)
            {
                IsActive = true
            };
            tenant.ConnectionString = input.ConnectionString.IsNullOrEmpty()
                ? null
                : SimpleStringCipher.Instance.Encrypt(input.ConnectionString);

            var defaultEdition = await _editionManager.FindByNameAsync(EditionManager.DefaultEditionName);
            if (defaultEdition != null)
            {
                tenant.EditionId = defaultEdition.Id;
            }

            await TenantManager.CreateAsync(tenant);

            // 保存以获取新租户的Id
            await CurrentUnitOfWork.SaveChangesAsync();

            // 创建租户数据库
            _abpZeroDbMigrator.CreateOrMigrateForTenant(tenant);

            // 新的租户,所以设置工作单元当前所属的租户
            using (CurrentUnitOfWork.SetTenantId(tenant.Id))
            {
                // 创建角色
                CheckErrors(await _roleManager.CreateStaticRoles(tenant.Id));

                // 保存，获取角色id
                await CurrentUnitOfWork.SaveChangesAsync();

                // 分配权限
                var adminRole = _roleManager.Roles.Single(r => r.Name == StaticRoleNames.Tenants.Admin);
                await _roleManager.GrantAllPermissionsAsync(adminRole);

                // 创建此租户的管理员用户
                var adminUser = User.CreateTenantAdminUser(tenant.Id, input.AdminEmailAddress);
                // 如果没有提交密码,那么走的是默认密码 123qwe
                adminUser.Password = _passwordHasher.HashPassword(adminUser, input.AdminPassword.IsNullOrWhiteSpace() ? User.DefaultPassword : input.AdminPassword);
                CheckErrors(await UserManager.CreateAsync(adminUser));

                // 保存，获取角色id
                await CurrentUnitOfWork.SaveChangesAsync();

                // 授权
                CheckErrors(await UserManager.AddToRoleAsync(adminUser, adminRole.Name));
                await CurrentUnitOfWork.SaveChangesAsync();
            }

            return tenant.MapTo<TenantDto>();
        }

        private void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
