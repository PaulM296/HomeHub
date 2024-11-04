using AutoMapper;
using HomeHub.App.Dtos.ItemDtos;
using HomeHub.App.Interfaces;
using MediatR;

namespace HomeHub.App.Items.Commands
{
    public record UpdateItem(Guid userId, string name, UpdateItemDto updateItemRequestDto) : IRequest<ItemResponseDto>;

    public class UpdateItemHandler : IRequestHandler<UpdateItem, ItemResponseDto>
    {
        private readonly IItemRepository _itemRepository;
        private readonly IMapper _mapper;

        public UpdateItemHandler(IItemRepository itemRepository, IMapper mapper)
        {
            _itemRepository = itemRepository;
            _mapper = mapper;
        }

        public async Task<ItemResponseDto> Handle(UpdateItem request, CancellationToken cancellationToken)
        {
            var itemToUpdate = await _itemRepository.GetItemByName(request.userId, request.name);

            itemToUpdate.Name = request.updateItemRequestDto.Name;
            itemToUpdate.Description = request.updateItemRequestDto.Description;
            itemToUpdate.Count = request.updateItemRequestDto.Count;
            itemToUpdate.ExpirationDate = request.updateItemRequestDto.ExpirationDate;
            itemToUpdate.WarrantyDate = request.updateItemRequestDto.WarrantyDate;

            var updatedItem = await _itemRepository.UpdateItemById(itemToUpdate);

            return _mapper.Map<ItemResponseDto>(updatedItem);
        }
    }
}
