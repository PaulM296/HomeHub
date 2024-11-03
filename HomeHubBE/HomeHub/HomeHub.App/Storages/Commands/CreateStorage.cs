using AutoMapper;
using HomeHub.App.Dtos.StorageDtos;
using HomeHub.App.Interfaces;
using HomeHub.Domain.Entities;
using MediatR;

namespace HomeHub.App.Storages.Commands
{
    public record CreateStorage(Guid userId, CreateStorageDto createStorageRequestDto) : IRequest<StorageResponseDto>;

    public class CreateStorageHandler : IRequestHandler<CreateStorage, StorageResponseDto>
    {
        private readonly IStorageRepository _storageRepository;
        private readonly IMapper _mapper;

        public CreateStorageHandler(IStorageRepository storageRepository, IMapper mapper)
        {
            _storageRepository = storageRepository;
            _mapper = mapper;
        }

        public async Task<StorageResponseDto> Handle(CreateStorage request, CancellationToken cancellationToken)
        {
            var storage = new Storage
            {
                Name = request.createStorageRequestDto.Name,
                Type = request.createStorageRequestDto.Type,
                Description = request.createStorageRequestDto.Description
            };

            var storageParent = await _storageRepository.GetStorageByName(request.userId, request.createStorageRequestDto.ParentStorageName);
            if (storageParent != null)
            {
                storage.ParentStorageId = storageParent.Id;

            }

            var newStorage = await _storageRepository.CreateStorage(storage, request.userId);

            if (storageParent != null)
            {
                await _storageRepository.AddUsersFromParentStorage(storageParent.Id, newStorage.Id);
            }

            return _mapper.Map<StorageResponseDto>(storage);
        }
    }
}
