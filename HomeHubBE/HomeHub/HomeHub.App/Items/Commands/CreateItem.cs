using AutoMapper;
using HomeHub.App.Dtos.ItemDtos;
using HomeHub.App.Exceptions;
using HomeHub.App.Interfaces;
using HomeHub.Domain.Entities;
using MediatR;

namespace HomeHub.App.Items.Commands
{
    public record CreateItem(Guid userId, CreateItemDto createItemRequestDto) : IRequest<ItemResponseDto>;

    public class CreateItemHandler : IRequestHandler<CreateItem, ItemResponseDto>
    {
        private readonly IItemRepository _itemRepository;
        private readonly IStorageRepository _storageRepostiory;
        private readonly IMapper _mapper;

        public CreateItemHandler(IItemRepository itemRepository, IStorageRepository storageRepostiory, IMapper mapper)
        {
            _itemRepository = itemRepository;
            _storageRepostiory = storageRepostiory;
            _mapper = mapper;
        }
        public async Task<ItemResponseDto> Handle(CreateItem request, CancellationToken cancellationToken)
        {
            var getStorage = await _storageRepostiory.GetStorageByName(request.userId, request.createItemRequestDto.StorageName);

            if (getStorage == null)
            {
                throw new StorageNotFoundException(request.createItemRequestDto.StorageName);
            }

            var item = new Item()
            {
                Name = request.createItemRequestDto.Name,
                Count = request.createItemRequestDto.Count,
                Description = request.createItemRequestDto.Description,
                ExpirationDate = request.createItemRequestDto.ExpirationDate,
                WarrantyDate = request.createItemRequestDto.WarrantyDate,
                StorageId = getStorage.Id,
                Storage = getStorage
            };

            var createdItem = await _itemRepository.CreateItem(item);

            return _mapper.Map<ItemResponseDto>(createdItem);
        }
    }
}
