using HomeHub.App.Interfaces;
using HomeHub.Domain.Entities;
using HomeHub.Domain.Enums;
using HomeHub.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HomeHub.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UserRepository(AppDbContext context, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<User> GetUserById(Guid userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId) ?? throw new EntityNotFoundException("User", userId);
        }

        public async Task<User> UpdateUser(User user)
        {
            var userForUpdate = await _context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);

            if (userForUpdate == null)
            {
                throw new EntityNotFoundException("User", user.Id);
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task DeleteUser(Guid userId)
        {
            var userToDelete = await _userManager.FindByIdAsync(userId.ToString());

            if (userToDelete == null)
            {
                throw new EntityNotFoundException("User", userId);
            }

            var result = await _userManager.DeleteAsync(userToDelete);

            if (!result.Succeeded)
            {
                throw new ApplicationException("User deletion failed!");
            }
        }

        public async Task AddUserToStorage(Guid ownerId, Guid houseId, List<Guid> roomsIds, List<Guid> subStoragesIds, Guid userId)
        {
            var userStorages = await _context.UserStorage.Where(us => us.UserId == ownerId).Select(us => us.StorageId).ToListAsync();

            var house = await _context.Storages.FirstOrDefaultAsync(s => s.Id == houseId && s.Type == StorageType.House && userStorages.Contains(houseId));

            if (house == null)
            {
                throw new EntityNotFoundException(nameof(Storage), houseId);
            }

            var userStorage = await _context.UserStorage.FirstOrDefaultAsync(us => us.Id == userId && us.StorageId == houseId);
            if (userStorage != null)
            {
                throw new UserAlreadyAssignedToStorageException();
            }

            var newUserStorage = new UserStorage
            {
                UserId = userId,
                StorageId = houseId,
            };

            _context.UserStorage.Add(newUserStorage);

            await _context.SaveChangesAsync();

            foreach (var id in roomsIds)
            {
                var newUserRoom = new UserStorage
                {
                    UserId = userId,
                    StorageId = id,
                };

                _context.UserStorage.Add(newUserRoom);

                await _context.SaveChangesAsync();
            }

            foreach (var id in subStoragesIds)
            {
                var newUserSubStorage = new UserStorage
                {
                    UserId = userId,
                    StorageId = id,
                };

                _context.UserStorage.Add(newUserSubStorage);

                await _context.SaveChangesAsync();
            }
        }

        public async Task<ICollection<User>> GetUsersByHouseId(Guid ownerId, Guid houseId)
        {
            var userStorages = await _context.UserStorage.Where(us => us.UserId == ownerId).Select(us => us.StorageId).ToListAsync();

            var house = await _context.Storages.FirstOrDefaultAsync(s => s.Id == houseId && s.Type == StorageType.House && userStorages.Contains(houseId));

            if (house == null)
            {
                throw new EntityNotFoundException(nameof(Storage), houseId);
            }

            var userIdsFromStorage = await _context.UserStorage.Where(us => us.StorageId == houseId).Select(us => us.UserId).ToListAsync();
            return await _context.Users.Where(u => userIdsFromStorage.Contains(u.Id)).ToListAsync();
        }

        public async Task<User> RegisterUser(User user, string password)
        {
            var existingIdentity = await _userManager.FindByEmailAsync(user.UserName);
            if (existingIdentity != null)
            {
                throw new UserAlreadyExistsException(user.UserName);
            }

            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                throw new ApplicationException("User creation failed!");
            }
            return user;
        }

        public async Task<User> LoginUser(string email, string password)
        {
            var identityUser = await _userManager.FindByEmailAsync(email);
            if (identityUser == null)
            {
                throw new InvalidCredentialsException();
            }

            var result = await _signInManager.CheckPasswordSignInAsync(identityUser, password, false);

            if (!result.Succeeded)
            {
                throw new InvalidCredentialsException();
            }

            return identityUser;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                throw new UserNotFoundException(email);
            }

            return user;
        }
    }
}
