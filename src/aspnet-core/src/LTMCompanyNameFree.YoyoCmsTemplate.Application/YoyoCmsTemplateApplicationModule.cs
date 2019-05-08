using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using LTMCompanyNameFree.YoyoCmsTemplate.Authorization;

namespace LTMCompanyNameFree.YoyoCmsTemplate
{
    [DependsOn(
        typeof(YoyoCmsTemplateCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class YoyoCmsTemplateApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<YoyoCmsTemplateAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(YoyoCmsTemplateApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddProfiles(thisAssembly)
            );
        }
    }
}
