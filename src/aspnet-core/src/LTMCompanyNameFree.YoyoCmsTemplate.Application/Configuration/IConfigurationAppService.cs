using System.Threading.Tasks;
using LTMCompanyNameFree.YoyoCmsTemplate.Configuration.Dto;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
