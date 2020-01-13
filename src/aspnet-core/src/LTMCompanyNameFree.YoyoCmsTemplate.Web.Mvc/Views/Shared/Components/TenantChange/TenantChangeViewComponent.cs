using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Abp.AutoMapper;
using LTMCompanyNameFree.YoyoCmsTemplate.Sessions;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.Views.Shared.Components.TenantChange
{
    public class TenantChangeViewComponent : YoyoCmsTemplateViewComponent
    {
        private readonly ISessionAppService _sessionAppService;

        public TenantChangeViewComponent(ISessionAppService sessionAppService)
        {
            _sessionAppService = sessionAppService;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var loginInfo = await _sessionAppService.GetCurrentLoginInformations();
            var model = ObjectMapper.Map<TenantChangeViewModel>(loginInfo);

            return View(model);
        }
    }
}