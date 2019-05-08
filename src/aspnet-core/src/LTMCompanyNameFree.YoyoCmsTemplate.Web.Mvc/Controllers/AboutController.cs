using Microsoft.AspNetCore.Mvc;
using Abp.AspNetCore.Mvc.Authorization;
using LTMCompanyNameFree.YoyoCmsTemplate.Controllers;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.Controllers
{
    [AbpMvcAuthorize]
    public class AboutController : YoyoCmsTemplateControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
	}
}
