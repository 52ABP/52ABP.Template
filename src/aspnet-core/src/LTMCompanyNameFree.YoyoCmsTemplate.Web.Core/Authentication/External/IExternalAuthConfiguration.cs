using System.Collections.Generic;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Authentication.External
{
    public interface IExternalAuthConfiguration
    {
        List<ExternalLoginProviderInfo> Providers { get; }
    }
}
