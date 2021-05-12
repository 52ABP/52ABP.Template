using Abp.AspNetCore.Mvc.Views;
using Abp.Runtime.Session;
using Microsoft.AspNetCore.Mvc.Razor.Internal;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.Views
{
    public abstract class YoyoCmsTemplateRazorPage<TModel> : AbpRazorPage<TModel>
    {
        [RazorInject]
        public IAbpSession AbpSession { get; set; }

        protected YoyoCmsTemplateRazorPage()
        {
            LocalizationSourceName = YoyoCmsTemplateConsts.LocalizationSourceName;
        }
    }
}
