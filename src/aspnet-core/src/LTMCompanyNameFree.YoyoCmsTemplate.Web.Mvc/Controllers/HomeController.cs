using Abp.AspNetCore.Mvc.Authorization;
using LTMCompanyNameFree.YoyoCmsTemplate.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.Mvc.Controllers
{
    [AbpMvcAuthorize]
    public class HomeController : YoyoCmsTemplateControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
