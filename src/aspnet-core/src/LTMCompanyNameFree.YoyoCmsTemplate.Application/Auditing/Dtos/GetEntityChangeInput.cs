using System;
using Abp.Extensions;
using Abp.Runtime.Validation;
using L._52ABP.Application.Dtos;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Auditing.Dto
{
    public class GetEntityChangeInput : PagedAndSortedInputDto, IShouldNormalize
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string UserName { get; set; }

        public string EntityTypeFullName { get; set; }

        public void Normalize()
        {
            if (Sorting.IsNullOrWhiteSpace())
            {
                Sorting = "ChangeTime DESC";
            }

            if (Sorting.IndexOf("UserName", StringComparison.OrdinalIgnoreCase) >= 0)
            {
                Sorting = "User." + Sorting;
            }
            else
            {
                Sorting = "EntityChange." + Sorting;
            }
        }
    }
}
