using MediatR;
using HomeHub.App.Interfaces;

namespace HomeHub.App.Users.Commands
{
    public record DeleteUser(Guid id) : IRequest<Unit>;

    public class DeleteUserHandler : IRequestHandler<DeleteUser, Unit>
    {
        private readonly IUserRepository _userRepository;

        public DeleteUserHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<Unit> Handle(DeleteUser request, CancellationToken cancellationToken)
        {
            await _userRepository.DeleteUser(request.id);

            return Unit.Value;
        }
    }
}
