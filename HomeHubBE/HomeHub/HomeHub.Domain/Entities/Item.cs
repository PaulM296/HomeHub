namespace HomeHub.Domain.Entities
{
    public class Item
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
        public string Description { get; set; }
        public DateOnly? ExpirationDate { get; set; }
        public DateOnly? WarrantyDate { get; set; }

        // Relationship with Storage
        public Guid StorageId { get; set; }
        public Storage Storage { get; set; }
    }
}
