using AutoMapper;
using HomeHub.App.Dtos.StorageDtos;
using HomeHub.App.Exceptions;
using HomeHub.App.Interfaces;
using MediatR;

namespace HomeHub.App.Storages
{
    public record UpdateStorage(Guid userId, string name, UpdateStorageDto updateStorageDto) : IRequest<StorageResponseDto>;

    public class UpdateStorageHandler : IRequestHandler<UpdateStorage, StorageResponseDto>
    {
        private readonly IStorageRepository _storageRepository;
        private readonly IMapper _mapper;

        public UpdateStorageHandler(IStorageRepository storageRepository, IMapper mapper)
        {
            _storageRepository = storageRepository;
            _mapper = mapper;
        }

        public async Task<StorageResponseDto> Handle(UpdateStorage request, CancellationToken cancellationToken)
        {
            var storageToUpdate = await _storageRepository.GetStorageByName(request.userId, request.name);

            if (storageToUpdate == null)
            {
                throw new StorageNotFoundException(request.name);
            }

            storageToUpdate.Name = request.updateStorageDto.Name;
            storageToUpdate.Description = request.updateStorageDto.Description;

            var updatedStorage = await _storageRepository.UpdateStorage(storageToUpdate);

            return _mapper.Map<StorageResponseDto>(updatedStorage); ;
        }
    }
}
