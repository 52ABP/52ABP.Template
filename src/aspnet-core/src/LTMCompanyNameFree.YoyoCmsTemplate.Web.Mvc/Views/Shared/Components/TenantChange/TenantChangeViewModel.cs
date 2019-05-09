using Abp.AutoMapper;
using LTMCompanyNameFree.YoyoCmsTemplate.Sessions.Dto;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.Views.Shared.Components.TenantChange
{
    [AutoMapFrom(typeof(GetCurrentLoginInformationsOutput))]
    public class TenantChangeViewModel
    {
        public TenantLoginInfoDto Tenant { get; set; }
    }
}
