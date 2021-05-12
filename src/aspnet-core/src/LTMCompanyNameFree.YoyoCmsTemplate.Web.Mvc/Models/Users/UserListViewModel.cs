using System.Collections.Generic;
using LTMCompanyNameFree.YoyoCmsTemplate.Roles.Dto;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.Models.Users
{
    public class UserListViewModel
    {
        public IReadOnlyList<RoleDto> Roles { get; set; }
    }
}
