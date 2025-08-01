using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using team28HackathonAPI.DBContext;
using team28HackathonAPI.Models;
using team28HackathonAPI.Models.Repositories.CRUDRepository;

namespace team28HackathonAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AlertsController : ControllerBase
    {
        private readonly IRepository _repository;
        public AlertsController(IRepository repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public IActionResult GetAlerts()
        {
            var alerts = _repository.GetAll<Alerts>();

            return Ok(alerts);
        }
    }
}
