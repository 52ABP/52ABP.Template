using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Abp.Localization;
using LTMCompanyNameFree.YoyoCmsTemplate.Sessions;
using Abp.Configuration.Startup;
using LTMCompanyNameFree.YoyoCmsTemplate.Web.Views.Shared.Components.SideBarUserArea;
using System.Threading.Tasks;
using LTMCompanyNameFree.YoyoCmsTemplate.Web.Views.Shared.Components.TopBarUserProfile;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.Views.Shared.Components.TopBarLanguageSwitch
{
    public class TopBarUserProfileViewComponent : YoyoCmsTemplateViewComponent
    {
        private readonly ISessionAppService _sessionAppService;
        private readonly IMultiTenancyConfig _multiTenancyConfig;

        public TopBarUserProfileViewComponent(ISessionAppService sessionAppService,
            IMultiTenancyConfig multiTenancyConfig)
        {
            _sessionAppService = sessionAppService;
            _multiTenancyConfig = multiTenancyConfig;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var model = new TopBarUserProfileViewModel
            {
                LoginInformations = await _sessionAppService.GetCurrentLoginInformations(),
                IsMultiTenancyEnabled = _multiTenancyConfig.IsEnabled,
            };

            return View(model);
 
        }
    }
}
