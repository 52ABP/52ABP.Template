using Abp.Application.Services;
using Abp.Application.Services.Dto;
using LTMCompanyNameFree.YoyoCmsTemplate.MultiTenancy.Dto;

namespace LTMCompanyNameFree.YoyoCmsTemplate.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

