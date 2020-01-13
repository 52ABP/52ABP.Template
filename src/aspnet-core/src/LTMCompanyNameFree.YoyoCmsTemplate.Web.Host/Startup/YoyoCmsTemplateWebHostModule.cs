using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using LTMCompanyNameFree.YoyoCmsTemplate.Configuration;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.Host.Startup
{
    [DependsOn(
       typeof(YoyoCmsTemplateWebCoreModule))]
    public class YoyoCmsTemplateWebHostModule : AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public YoyoCmsTemplateWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(YoyoCmsTemplateWebHostModule).GetAssembly());
        }
    }
}