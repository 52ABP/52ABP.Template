using Abp.AspNetCore.Mvc.ViewComponents;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.Views
{
    public abstract class YoyoCmsTemplateViewComponent : AbpViewComponent
    {
        protected YoyoCmsTemplateViewComponent()
        {
            LocalizationSourceName = YoyoCmsTemplateConsts.LocalizationSourceName;
        }
    }
}
