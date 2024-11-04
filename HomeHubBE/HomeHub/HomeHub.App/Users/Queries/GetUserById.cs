using AutoMapper;
using MediatR;
using HomeHub.App.Dtos.UserDtos;
using HomeHub.App.Interfaces;

namespace HomeHub.App.Users.Queries
{
    public record GetUserById(Guid id) : IRequest<UserResponseDto>;

    public class GetUserByIdHandler : IRequestHandler<GetUserById, UserResponseDto>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public GetUserByIdHandler(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<UserResponseDto> Handle(GetUserById request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetUserById(request.id);

            return _mapper.Map<UserResponseDto>(user);
        }
    }
}
