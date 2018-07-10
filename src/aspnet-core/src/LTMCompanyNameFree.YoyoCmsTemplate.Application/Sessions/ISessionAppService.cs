using System.Threading.Tasks;
using Abp.Application.Services;
using LTMCompanyNameFree.YoyoCmsTemplate.Sessions.Dto;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
