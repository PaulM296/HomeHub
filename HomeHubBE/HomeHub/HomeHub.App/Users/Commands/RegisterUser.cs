using MediatR;
using HomeHub.App.Dtos.UserDtos;
using HomeHub.App.Interfaces;
using HomeHub.App.Services;
using HomeHub.Domain.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace HomeHub.App.Users.Commands
{
    public record RegisterUser(RegisterUserDto registerUserDto) : IRequest<string>;

    public class RegisterUserHandler : IRequestHandler<RegisterUser, string>
    {
        private readonly IUserRepository _userRepository;
        private readonly IdentityService _identityService;

        public RegisterUserHandler(IUserRepository userRepository, IdentityService identityService)
        {
            _userRepository = userRepository;
            _identityService = identityService;
        }

        public async Task<string> Handle(RegisterUser request, CancellationToken cancellationToken)
        {
            var user = new User
            {
                UserName = request.registerUserDto.Email,
                Email = request.registerUserDto.Email,
                FirstName = request.registerUserDto.FirstName,
                LastName = request.registerUserDto.LastName
            };

            var createdUser = await _userRepository.RegisterUser(user, request.registerUserDto.Password);

            var claimsIdentity = new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, createdUser.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, createdUser.Email),
                new Claim("userId", createdUser.Id.ToString())
            });

            var token = _identityService.CreateSecurityToken(claimsIdentity);
            return _identityService.WriteToken(token);
        }
    }
}
