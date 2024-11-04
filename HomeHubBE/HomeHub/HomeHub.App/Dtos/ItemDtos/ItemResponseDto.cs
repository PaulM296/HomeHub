namespace HomeHub.App.Dtos.ItemDtos
{
    public class ItemResponseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
        public string Description { get; set; }
        public DateOnly? ExpirationDate { get; set; }
        public DateOnly? WarrantyDate { get; set; }
    }
}
