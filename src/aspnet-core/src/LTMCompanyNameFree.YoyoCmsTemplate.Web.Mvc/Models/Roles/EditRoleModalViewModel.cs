using Abp.AutoMapper;
using LTMCompanyNameFree.YoyoCmsTemplate.Roles.Dto;
using LTMCompanyNameFree.YoyoCmsTemplate.Web.Models.Common;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.Models.Roles
{
    [AutoMapFrom(typeof(GetRoleForEditOutput))]
    public class EditRoleModalViewModel : GetRoleForEditOutput, IPermissionsEditViewModel
    {
        public bool HasPermission(FlatPermissionDto permission)
        {
            return GrantedPermissionNames.Contains(permission.Name);
        }
    }
}
