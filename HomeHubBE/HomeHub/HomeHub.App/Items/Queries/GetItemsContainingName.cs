using AutoMapper;
using HomeHub.App.Dtos.ItemDtos;
using HomeHub.App.Interfaces;
using MediatR;

namespace HomeHub.App.Items.Queries
{
    public record GetItemsContainingName(Guid userId, string itemName) : IRequest<ICollection<ItemResponseDto>>;

    public class GetItemsByNameHandler : IRequestHandler<GetItemsContainingName, ICollection<ItemResponseDto>>
    {
        private readonly IItemRepository _itemRepository;
        private readonly IMapper _mapper;

        public GetItemsByNameHandler(IItemRepository itemRepository, IMapper mapper)
        {
            _itemRepository = itemRepository;
            _mapper = mapper;
        }

        public async Task<ICollection<ItemResponseDto>> Handle(GetItemsContainingName request, CancellationToken cancellationToken)
        {
            var items = await _itemRepository.GetAllItemsContainingName(request.userId, request.itemName);

            return _mapper.Map<ICollection<ItemResponseDto>>(items);
        }
    }
}
