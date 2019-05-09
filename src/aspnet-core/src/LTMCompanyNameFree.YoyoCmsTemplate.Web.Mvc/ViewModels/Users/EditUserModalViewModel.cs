using System.Collections.Generic;
using System.Linq;
using LTMCompanyNameFree.YoyoCmsTemplate.Roles.Dto;
using LTMCompanyNameFree.YoyoCmsTemplate.Users.Dto;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.ViewModels.Users
{
    public class EditUserModalViewModel
    {
        public UserDto User { get; set; }

        public IReadOnlyList<RoleDto> Roles { get; set; }

        public bool UserIsInRole(RoleDto role)
        {
            return User.RoleNames != null && User.RoleNames.Any(r => r == role.NormalizedName);
        }
    }
}
