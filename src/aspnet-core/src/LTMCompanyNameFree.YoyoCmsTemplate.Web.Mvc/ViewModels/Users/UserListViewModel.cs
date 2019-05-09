using System.Collections.Generic;
using LTMCompanyNameFree.YoyoCmsTemplate.Roles.Dto;
using LTMCompanyNameFree.YoyoCmsTemplate.Users.Dto;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.ViewModels.Users
{
    public class UserListViewModel
    {
        public IReadOnlyList<UserDto> Users { get; set; }

        public IReadOnlyList<RoleDto> Roles { get; set; }
    }
}
