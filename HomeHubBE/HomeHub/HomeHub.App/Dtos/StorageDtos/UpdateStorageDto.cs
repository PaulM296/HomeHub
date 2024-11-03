using System.ComponentModel.DataAnnotations;

namespace HomeHub.App.Dtos.StorageDtos
{
    public class UpdateStorageDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
