using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Abp.Authorization;
using Abp.Domain.Uow;
using LTMCompanyNameFree.YoyoCmsTemplate.Authorization.Roles;
using LTMCompanyNameFree.YoyoCmsTemplate.Authorization.Users;
using LTMCompanyNameFree.YoyoCmsTemplate.MultiTenancy;
using Microsoft.Extensions.Logging;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Identity
{
    public class SecurityStampValidator : AbpSecurityStampValidator<Tenant, Role, User>
    {
        public SecurityStampValidator(IOptions<SecurityStampValidatorOptions> options, AbpSignInManager<Tenant, Role, User> signInManager, ISystemClock systemClock, ILoggerFactory loggerFactory, IUnitOfWorkManager unitOfWorkManager) : base(options, signInManager, systemClock, loggerFactory, unitOfWorkManager)
        {
        }
    }
}
