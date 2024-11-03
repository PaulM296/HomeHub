using AutoMapper;
using HomeHub.App.Dtos.StorageDtos;
using HomeHub.App.Interfaces;
using MediatR;

namespace HomeHub.App.Storages.Queries
{
    public record GetRoomsByHouseId(Guid userId, Guid parentId) : IRequest<ICollection<StorageResponseDto>>;

    public class GetStoragesByParentIdHandler : IRequestHandler<GetRoomsByHouseId, ICollection<StorageResponseDto>>
    {
        private readonly IStorageRepository _storageRepository;
        private readonly IMapper _mapper;

        public GetStoragesByParentIdHandler(IStorageRepository storageRepository, IMapper mapper)
        {
            _storageRepository = storageRepository;
            _mapper = mapper;
        }

        public async Task<ICollection<StorageResponseDto>> Handle(GetRoomsByHouseId request, CancellationToken cancellationToken)
        {
            var storages = await _storageRepository.GetRoomsByHouseId(request.userId, request.parentId);

            return _mapper.Map<ICollection<StorageResponseDto>>(storages);

        }
    }
}
