namespace HomeHub.Domain.Entities
{
    public class UserStorage
    {
        public Guid Id { get; set; }

        // Relationship with User
        public Guid UserId { get; set; }
        public User User { get; set; }

        // Relationship with Storage
        public Guid StorageId { get; set; }
        public Storage Storage { get; set; }
    }
}
