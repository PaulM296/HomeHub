using Microsoft.AspNetCore.Identity;

namespace HomeHub.Domain.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        // Relationship with Storage - through UserStorage
        public ICollection<UserStorage> UserStorages { get; set; }
    }
}
