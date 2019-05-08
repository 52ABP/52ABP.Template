using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Abp.Localization;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.Views.Shared.Components.TopBarLanguageSwitch
{
    public class TopBarNotificationsViewComponent : YoyoCmsTemplateViewComponent
    {
 
        public TopBarNotificationsViewComponent()
        {
        
        }

        public IViewComponentResult Invoke()
        {
         

            return View();
        }
    }
}
