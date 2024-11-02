using HomeHub.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace HomeHub.Infrastructure.Configurations
{
    public class UserStorageConfig : IEntityTypeConfiguration<UserStorage>
    {
        public void Configure(EntityTypeBuilder<UserStorage> builder)
        {
            builder.HasOne(us => us.User)
                .WithMany(u => u.UserStorages)
                .HasForeignKey(us => us.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(us => us.Storage)
                .WithMany(s => s.UserStorages)
                .HasForeignKey(us => us.StorageId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
