using Abp.MultiTenancy;
using LTMCompanyNameFree.YoyoCmsTemplate.Authorization.Users;

namespace LTMCompanyNameFree.YoyoCmsTemplate.MultiTenancy
{
    public class Tenant : AbpTenant<User>
    {
        public Tenant()
        {            
        }

        public Tenant(string tenancyName, string name)
            : base(tenancyName, name)
        {
        }
    }
}
