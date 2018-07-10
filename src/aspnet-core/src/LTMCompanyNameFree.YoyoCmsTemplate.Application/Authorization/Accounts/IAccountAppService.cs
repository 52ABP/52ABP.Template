using System.Threading.Tasks;
using Abp.Application.Services;
using LTMCompanyNameFree.YoyoCmsTemplate.Authorization.Accounts.Dto;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
