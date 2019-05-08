using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using LTMCompanyNameFree.YoyoCmsTemplate.Roles.Dto;
using LTMCompanyNameFree.YoyoCmsTemplate.Users.Dto;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}
