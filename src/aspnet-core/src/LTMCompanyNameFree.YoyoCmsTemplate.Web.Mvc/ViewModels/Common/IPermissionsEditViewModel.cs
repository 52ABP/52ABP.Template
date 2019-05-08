using System.Collections.Generic;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.Models.Common
{
    public interface IPermissionsEditViewModel
    {
        List<FlatPermissionDto> Permissions { get; set; }
    }
}