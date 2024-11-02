using HomeHub.Domain.Entities;

namespace HomeHub.App.Interfaces
{
    public interface IStorageRepository
    {
        Task<Storage> CreateStorage(Storage storage, Guid userId);
        Task<Storage> UpdateStorage(Storage storage);
        Task DeleteStorageById(Guid storageId);
        Task<Storage> GetStorageByName(Guid userId, string storageName);
        Task<ICollection<Storage>> GetHousesByUserId(Guid userId);
        Task<ICollection<Storage>> GetRoomsByHouseId(Guid userId, Guid parentId);
        Task<ICollection<Storage>> GetSubStoragesByRoomId(Guid userId, Guid parentId);
        Task AddUsersFromParentStorage(Guid parentId, Guid childId);
    }
}
