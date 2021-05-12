using System.Collections.Generic;
using LTMCompanyNameFree.YoyoCmsTemplate.Roles.Dto;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.Models.Common
{
    public interface IPermissionsEditViewModel
    {
        List<FlatPermissionDto> Permissions { get; set; }
    }
}