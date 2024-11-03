using AutoMapper;
using HomeHub.App.Dtos.UserDtos;
using HomeHub.App.Interfaces;
using MediatR;

namespace HomeHub.App.Storages.Queries
{
    public record GetUsersByHouseId(Guid OwnerId, Guid HouseId) : IRequest<ICollection<UserResponseDto>>;

    public class GetUsersByHouseIdHandler : IRequestHandler<GetUsersByHouseId, ICollection<UserResponseDto>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public GetUsersByHouseIdHandler(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<ICollection<UserResponseDto>> Handle(GetUsersByHouseId request, CancellationToken cancellationToken)
        {
            var users = await _userRepository.GetUsersByHouseId(request.OwnerId, request.HouseId);

            return _mapper.Map<ICollection<UserResponseDto>>(users);
        }
    }
}
