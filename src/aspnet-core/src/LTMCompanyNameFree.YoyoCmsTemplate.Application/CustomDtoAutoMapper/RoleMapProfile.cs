using Abp.Authorization;
using Abp.Authorization.Roles;
using AutoMapper;
using LTMCompanyNameFree.YoyoCmsTemplate.Authorization.Roles;
using LTMCompanyNameFree.YoyoCmsTemplate.Roles.Dto;

namespace LTMCompanyNameFree.YoyoCmsTemplate.CustomDtoAutoMapper
{
    public class RoleMapProfile : Profile
    {
        public RoleMapProfile()
        {
            // Role and permission
            CreateMap<Permission, string>().ConvertUsing(r => r.Name);
            CreateMap<RolePermissionSetting, string>().ConvertUsing(r => r.Name);

            CreateMap<CreateRoleDto, Role>().ForMember(x => x.Permissions, opt => opt.Ignore());
            CreateMap<RoleDto, Role>().ForMember(x => x.Permissions, opt => opt.Ignore());
        }
    }
}
