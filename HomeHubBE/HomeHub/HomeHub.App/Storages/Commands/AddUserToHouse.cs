using HomeHub.App.Interfaces;
using MediatR;

namespace HomeHub.App.Storages.Commands
{
    public record AddUserToHouse(Guid OwnerId, Guid HouseId, string Email) : IRequest<Unit>;

    public class AddUserToHouseHandler : IRequestHandler<AddUserToHouse, Unit>
    {
        private readonly IUserRepository _userRepository;
        private readonly IStorageRepository _storageRepository;

        public AddUserToHouseHandler(IUserRepository userRepository, IStorageRepository storageRepository)
        {
            _userRepository = userRepository;
            _storageRepository = storageRepository;
        }

        public async Task<Unit> Handle(AddUserToHouse request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetUserByEmail(request.Email);

            var rooms = await _storageRepository.GetRoomsByHouseId(request.OwnerId, request.HouseId);
            var roomsIds = rooms.Select(r => r.Id).ToList();

            var subStoragesIds = new List<Guid>();
            foreach (var room in rooms)
            {
                var currentRoomSubStorages = await _storageRepository.GetSubStoragesByRoomId(request.OwnerId, room.Id);
                var ids = currentRoomSubStorages.Select(ss => ss.Id).ToList();
                subStoragesIds.AddRange(ids);
            }

            await _userRepository.AddUserToStorage(request.OwnerId, request.HouseId, roomsIds, subStoragesIds, user.Id);

            return Unit.Value;
        }
    }
}
