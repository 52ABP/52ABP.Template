using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using LTMCompanyNameFree.YoyoCmsTemplate.Configuration;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.Startup
{
    [DependsOn(typeof(YoyoCmsTemplateWebCoreModule))]
    public class YoyoCmsTemplateWebMvcModule : AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public YoyoCmsTemplateWebMvcModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void PreInitialize()
        {
            Configuration.Navigation.Providers.Add<YoyoCmsTemplateNavigationProvider>();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(YoyoCmsTemplateWebMvcModule).GetAssembly());
        }
    }
}
