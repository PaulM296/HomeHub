using AutoMapper;
using HomeHub.App.Dtos.StorageDtos;
using HomeHub.App.Interfaces;
using MediatR;

namespace HomeHub.App.Storages.Queries
{
    public record GetSubStoragesByRoomId(Guid userId, Guid parentId) : IRequest<ICollection<StorageResponseDto>>;

    public class GetSubStoragesByRoomIdhandler : IRequestHandler<GetSubStoragesByRoomId, ICollection<StorageResponseDto>>
    {
        private readonly IStorageRepository _storageRepository;
        private readonly IMapper _mapper;

        public GetSubStoragesByRoomIdhandler(IStorageRepository storageRepository, IMapper mapper)
        {
            _storageRepository = storageRepository;
            _mapper = mapper;
        }

        public async Task<ICollection<StorageResponseDto>> Handle(GetSubStoragesByRoomId request, CancellationToken cancellationToken)
        {
            var storages = await _storageRepository.GetSubStoragesByRoomId(request.userId, request.parentId);

            return _mapper.Map<ICollection<StorageResponseDto>>(storages);
        }
    }
}
