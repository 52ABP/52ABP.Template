using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Controllers
{
    public abstract class YoyoCmsTemplateControllerBase: AbpController
    {
        protected YoyoCmsTemplateControllerBase()
        {
            LocalizationSourceName = YoyoCmsTemplateConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
