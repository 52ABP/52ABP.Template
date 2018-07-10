using Microsoft.AspNetCore.Antiforgery;
using LTMCompanyNameFree.YoyoCmsTemplate.Controllers;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.Host.Controllers
{
    public class AntiForgeryController : YoyoCmsTemplateControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
