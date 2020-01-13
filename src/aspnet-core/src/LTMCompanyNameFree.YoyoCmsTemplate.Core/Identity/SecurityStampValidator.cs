using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Abp.Authorization;
using LTMCompanyNameFree.YoyoCmsTemplate.Authorization.Roles;
using LTMCompanyNameFree.YoyoCmsTemplate.Authorization.Users;
using LTMCompanyNameFree.YoyoCmsTemplate.MultiTenancy;
using Microsoft.Extensions.Logging;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Identity
{
    public class SecurityStampValidator : AbpSecurityStampValidator<Tenant, Role, User>
    {
        public SecurityStampValidator(
         IOptions<SecurityStampValidatorOptions> options,
         SignInManager signInManager,
         ISystemClock systemClock,
         ILoggerFactory loggerFactory)
         : base(options, signInManager, systemClock, loggerFactory)
        {
        }
    }
}