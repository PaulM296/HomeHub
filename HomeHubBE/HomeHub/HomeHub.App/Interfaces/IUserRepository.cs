using HomeHub.Domain.Entities;

namespace HomeHub.App.Interfaces
{
    public interface IUserRepository
    {
        Task<User> RegisterUser(User user, string password);
        Task<User> LoginUser(string email, string password);
        Task<User> GetUserByEmail(string email);
        Task<User> GetUserById(Guid userId);
        Task<User> UpdateUser(User user);
        Task DeleteUser(Guid userId);
        Task AddUserToStorage(Guid ownerId, Guid houseId, List<Guid> roomsIds, List<Guid> subStoragesIds, Guid userId);
        Task<ICollection<User>> GetUsersByHouseId(Guid ownerId, Guid houseId);
    }
}
