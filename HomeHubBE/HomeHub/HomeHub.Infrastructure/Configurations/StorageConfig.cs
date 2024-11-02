using HomeHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HomeHub.Infrastructure.Configurations
{
    public class StorageConfig : IEntityTypeConfiguration<Storage>
    {
        public void Configure(EntityTypeBuilder<Storage> builder)
        {
            builder.HasOne(s => s.ParentStorage)
                .WithMany(s => s.SubStorages)
                .HasForeignKey(s => s.ParentStorageId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
