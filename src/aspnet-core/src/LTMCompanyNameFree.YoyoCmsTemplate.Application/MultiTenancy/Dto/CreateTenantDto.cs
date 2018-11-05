using System.ComponentModel.DataAnnotations;
using Abp.Authorization.Users;
using Abp.AutoMapper;
using Abp.MultiTenancy;

namespace LTMCompanyNameFree.YoyoCmsTemplate.MultiTenancy.Dto
{
    /// <summary>
    /// 创建租户的DTO信息
    /// </summary>
    [AutoMapTo(typeof(Tenant))]
    public class CreateTenantDto
    {
        /// <summary>
        /// 全局唯一的租户Id
        /// </summary>
        [Required]
        [StringLength(AbpTenantBase.MaxTenancyNameLength)]
        [RegularExpression(AbpTenantBase.TenancyNameRegex)]
        public string TenancyName { get; set; }

        [Required]
        [StringLength(AbpTenantBase.MaxNameLength)]
        public string Name { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxEmailAddressLength)]
        public string AdminEmailAddress { get; set; }

        [StringLength(AbpTenantBase.MaxConnectionStringLength)]
        public string ConnectionString { get; set; }

        public bool IsActive {get; set;}

        /// <summary>
        /// 租户密码
        /// </summary>
        public string TenantPassword { get; set; }

    }
}
