using team28HackathonAPI.Models.ViewModels;

namespace team28HackathonAPI.Models.Repositories.AuthRepo
{
    public interface IAuthRepository
    {
        Task<string> Login(string email, string password);
        Task<bool> SignUp(UserView user);
    }
}
