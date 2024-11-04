using HomeHub.App.Interfaces;
using MediatR;

namespace HomeHub.App.Items.Commands
{
    public record DeleteItem(Guid userId, string name) : IRequest<Unit>;

    public class DeleteItemHandler : IRequestHandler<DeleteItem, Unit>
    {
        private readonly IItemRepository _itemRepository;

        public DeleteItemHandler(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        public async Task<Unit> Handle(DeleteItem request, CancellationToken cancellationToken)
        {
            var itemToRemove = await _itemRepository.GetItemByName(request.userId, request.name);

            await _itemRepository.DeleteItemById(itemToRemove.Id);

            return Unit.Value;
        }
    }
}
