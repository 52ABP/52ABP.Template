using System.Collections.Generic;
using LTMCompanyNameFree.YoyoCmsTemplate.Roles.Dto;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.Models.Roles
{
    public class RoleListViewModel
    {
        public IReadOnlyList<PermissionDto> Permissions { get; set; }
    }
}
