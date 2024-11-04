using HomeHub.App.Options;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HomeHub.App.Services
{
    public class IdentityService
    {
        private readonly JwtSettings? _settings;
        private readonly byte[] _key;

        public IdentityService(IOptions<JwtSettings> jwtOptions)
        {
            _settings = jwtOptions.Value;
            ArgumentNullException.ThrowIfNull(_settings);
            ArgumentNullException.ThrowIfNull(_settings.SigningKey);
            ArgumentNullException.ThrowIfNull(_settings.Audiences);
            ArgumentNullException.ThrowIfNull(_settings.Audiences[0]);
            ArgumentNullException.ThrowIfNull(_settings.Issuer);
            _key = Encoding.ASCII.GetBytes(_settings?.SigningKey!);
        }

        public JwtSecurityTokenHandler TokenHandler = new JwtSecurityTokenHandler();

        public SecurityToken CreateSecurityToken(ClaimsIdentity identity)
        {
            var tokenDescription = GetTokenDescriptor(identity);
            return TokenHandler.CreateToken(tokenDescription);
        }

        public string WriteToken(SecurityToken token)
        {
            return TokenHandler.WriteToken(token);
        }

        private SecurityTokenDescriptor GetTokenDescriptor(ClaimsIdentity identity)
        {
            return new SecurityTokenDescriptor()
            {
                Subject = identity,
                Expires = DateTime.Now.AddHours(10),
                Audience = _settings!.Audiences?[0]!,
                Issuer = _settings.Issuer,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(_key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
        }
    }
}
