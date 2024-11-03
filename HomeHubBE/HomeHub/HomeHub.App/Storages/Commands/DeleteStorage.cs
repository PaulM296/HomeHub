using HomeHub.App.Exceptions;
using HomeHub.App.Interfaces;
using HomeHub.Domain.Enums;
using MediatR;

namespace HomeHub.App.Storages.Commands
{
    public record DeleteStorage(Guid userId, string storageName, Guid? parentStorageId) : IRequest<Unit>;

    public class DeleteStorageHandler : IRequestHandler<DeleteStorage, Unit>
    {
        private readonly IStorageRepository _storageRepository;

        public DeleteStorageHandler(IStorageRepository storageRepository)
        {
            _storageRepository = storageRepository;
        }

        public async Task<Unit> Handle(DeleteStorage request, CancellationToken cancellationToken)
        {
            var storageToRemove = await _storageRepository.GetStorageByName(request.userId, request.storageName);

            if (storageToRemove == null)
            {
                throw new StorageNotFoundException(request.storageName);
            }

            if (storageToRemove.Type == StorageType.House)
            {
                var subStorages = await _storageRepository.GetRoomsByHouseId(request.userId, storageToRemove.Id);

                foreach (var subStorage in subStorages)
                {
                    var subSubStorages = await _storageRepository.GetSubStoragesByRoomId(request.userId, subStorage.Id);

                    foreach (var subSubStorage in subSubStorages)
                    {
                        await _storageRepository.DeleteStorageById(subSubStorage.Id);
                    }

                    await _storageRepository.DeleteStorageById(subStorage.Id);
                }
            }

            if (storageToRemove.Type == StorageType.Room)
            {
                var subStorages = await _storageRepository.GetSubStoragesByRoomId(request.userId, storageToRemove.Id);

                foreach (var subStorage in subStorages)
                {
                    await _storageRepository.DeleteStorageById(subStorage.Id);
                }
            }

            await _storageRepository.DeleteStorageById(storageToRemove.Id);

            return Unit.Value;
        }
    }
}
