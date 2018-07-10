using System.ComponentModel.DataAnnotations;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Configuration.Dto
{
    public class ChangeUiThemeInput
    {
        [Required]
        [StringLength(32)]
        public string Theme { get; set; }
    }
}
