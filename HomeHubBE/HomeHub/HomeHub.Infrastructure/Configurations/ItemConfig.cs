using HomeHub.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace HomeHub.Infrastructure.Configurations
{
    public class ItemConfig : IEntityTypeConfiguration<Item>
    {
        public void Configure(EntityTypeBuilder<Item> builder)
        {
            builder.HasOne(i => i.Storage)
                .WithMany(s => s.Items)
                .HasForeignKey(i => i.StorageId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
