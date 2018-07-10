using Abp.AutoMapper;
using LTMCompanyNameFree.YoyoCmsTemplate.Authentication.External;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Models.TokenAuth
{
    [AutoMapFrom(typeof(ExternalLoginProviderInfo))]
    public class ExternalLoginProviderInfoModel
    {
        public string Name { get; set; }

        public string ClientId { get; set; }
    }
}
