using System.ComponentModel.DataAnnotations;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}