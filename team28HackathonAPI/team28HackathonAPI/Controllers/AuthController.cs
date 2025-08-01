using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

using team28HackathonAPI.DBContext;
using team28HackathonAPI.Models;
using team28HackathonAPI.Models.Repositories.AuthRepo;
using team28HackathonAPI.Models.ViewModels;

namespace team28HackathonAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {

        private readonly IAuthRepository authRepository;

        public AuthController(IAuthRepository authRepository)
        {
            this.authRepository = authRepository;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserView user)
        {
            var validate = await authRepository.Login(user.Email, user.Password);

            if (validate != "invalid" && validate != null)
            {
                return Ok(new { token = validate });
            }

            return Unauthorized("Invalid credentials");
        }
        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp(UserView user)
        {
            var validate = await authRepository.SignUp(user);

            if (validate) return Ok(new { message = "Successfully registered!" });

            return BadRequest(new { message = "Account Already Exists!"});
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok(new { Message = "Logged out" });
        }
    }
}

