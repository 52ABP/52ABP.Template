using LTMCompanyNameFree.YoyoCmsTemplate.MultiTenancy.Dto;
using System.Threading.Tasks;

namespace LTMCompanyNameFree.YoyoCmsTemplate.MultiTenancy
{
    public interface ITenantRegistrationAppService
    {
        /// <summary>
        /// 注册租户信息
        /// </summary>
        /// <param name="Input"></param>
        /// <returns></returns>
        Task<TenantDto> RegisterTenantAsync(CreateTenantDto input);
    }
}
