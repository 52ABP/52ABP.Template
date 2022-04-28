using Abp.EntityHistory;
using LTMCompanyNameFree.YoyoCmsTemplate.Authorization.Users;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Auditing
{
    /// <summary>
    /// A helper class to store an <see cref="EntityChange"/> and a <see cref="User"/> object.
    /// </summary>
    public class EntityChangeAndUser
    {
        public EntityChange EntityChange { get; set; }

        public User User { get; set; }
    }
}
