using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using team28HackathonAPI.DBContext;
using team28HackathonAPI.Models.Repositories.CRUDRepository;
using team28HackathonAPI.Models.ViewModels;

namespace team28HackathonAPI.Models.Repositories.AuthRepo
{
    public class AuthRepository : IAuthRepository
    {
        private readonly IRepository _repository;
        private readonly IConfiguration configuration;
        public AuthRepository(IRepository repository, IConfiguration configuration)
        {
            _repository = repository;
            this.configuration = configuration;
        }

        public async Task<string> Login(string email, string password)
        {
            var user = _repository.GetEntityByCondition<AppUser>(x => x.Email == email && x.Password == password).FirstOrDefault();

            if (user == null)
            {
                return "invalid";
            }

            return GenerateAccessToken(email);
        }
        public async Task<bool> SignUp(UserView user)
        {
            var validate = _repository.GetEntityByCondition<AppUser>(x => x.Email == user.Email);

            if (validate == null)
            {
                return false;
            }

            var newUser = new AppUser { Email = user.Email , Password = user.Password, Name = user.Name};

            await _repository.Add(newUser);
            await _repository.SaveChangesAsync();

            return true;
        }
        private string GenerateAccessToken(string email)
        {
            // Create user claims
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, email)
            };

            // Create a JWT
            var token = new JwtSecurityToken(
                issuer: configuration["Tokens:Issuer"],
                audience: configuration["Tokens:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1), // Token expiration time
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Tokens:Key"])),
                    SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
