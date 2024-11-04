using HomeHub.App.Interfaces;
using HomeHub.Domain.Entities;
using HomeHub.Infrastructure.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace HomeHub.Infrastructure.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private readonly AppDbContext _context;

        public ItemRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Item> CreateItem(Item item)
        {
            var itemFound = await _context.Items.Where(i => i.StorageId == item.StorageId && item.Name.Equals(i.Name)).FirstOrDefaultAsync();

            if (itemFound != null)
            {
                throw new EntityAlreadyExistsException(nameof(Item), item.Name);
            }

            _context.Items.Add(item);

            await _context.SaveChangesAsync();

            return item;
        }

        public async Task DeleteItemById(Guid itemId)
        {
            var itemForDelete = await _context.Items.FirstOrDefaultAsync(i => i.Id == itemId);

            if (itemForDelete == null)
            {
                throw new EntityNotFoundException(nameof(Item), itemId);
            }

            _context.Items.Remove(itemForDelete);

            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<Item>> GetAllItems()
        {
            return await _context.Items.ToListAsync();
        }

        public async Task<ICollection<Item>> GetAllItemsContainingName(Guid userId, string itemName)
        {
            var userStorages = await _context.UserStorage.Where(us => us.UserId == userId).Select(us => us.StorageId).ToListAsync();

            return await _context.Items.Where(i => i.Name.ToLower().Contains(itemName.ToLower()) && userStorages.Contains(i.StorageId)).ToListAsync();
        }

        public async Task<ICollection<Item>> GetAllItemsByStorageId(Guid userId, Guid storageId)
        {
            var userStorages = await _context.UserStorage.Where(us => us.UserId == userId).Select(us => us.StorageId).ToListAsync();

            return await _context.Items.Where(i => i.StorageId == storageId && userStorages.Contains(i.StorageId)).ToListAsync();
        }

        public async Task<Item> GetItemByName(Guid userId, string name)
        {
            var userStorages = await _context.UserStorage.Where(us => us.UserId == userId).Select(us => us.StorageId).ToListAsync();

            var getItem = await _context.Items.FirstOrDefaultAsync(i => i.Name.ToLower() == name.ToLower() && userStorages.Contains(i.StorageId));

            if (getItem == null)
            {
                throw new EntityNotFoundException(nameof(Item), name);
            }

            return getItem;
        }

        public async Task<Item> UpdateItemById(Item item)
        {
            var itemForUpdate = await _context.Items.FirstOrDefaultAsync(i => i.Id == item.Id);

            if (itemForUpdate == null)
            {
                throw new EntityNotFoundException(nameof(Item), item.Name);
            }

            _context.Items.Update(item);

            await _context.SaveChangesAsync();

            return item;
        }
    }
}
