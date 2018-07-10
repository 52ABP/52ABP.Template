using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using LTMCompanyNameFree.YoyoCmsTemplate.Configuration.Dto;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : YoyoCmsTemplateAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
