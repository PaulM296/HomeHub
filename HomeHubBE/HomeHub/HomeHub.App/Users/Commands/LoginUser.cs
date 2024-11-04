using MediatR;
using HomeHub.App.Dtos.UserDtos;
using HomeHub.App.Interfaces;
using HomeHub.App.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace HomeHub.App.Users.Commands
{
    public record LoginUser(LoginUserDto loginUserDto) : IRequest<string>;

    public class LoginUserHandler : IRequestHandler<LoginUser, string>
    {
        private readonly IUserRepository _userRepository;
        private readonly IdentityService _identityService;

        public LoginUserHandler(IUserRepository userRepository, IdentityService identityService)
        {
            _userRepository = userRepository;
            _identityService = identityService;
        }

        public async Task<string> Handle(LoginUser request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.LoginUser(request.loginUserDto.Email, request.loginUserDto.Password);

            var claimsIdentity = new ClaimsIdentity(new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("userId", user.Id.ToString())
            });

            var token = _identityService.CreateSecurityToken(claimsIdentity);
            return _identityService.WriteToken(token);
        }
    }
}
