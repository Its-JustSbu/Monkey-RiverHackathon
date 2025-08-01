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
    public class DiagnosticController : ControllerBase
    {
        private readonly IRepository _repository;

        public DiagnosticController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("UserId")))
                return Unauthorized("You must be logged in.");

            var tests = _repository.GetAll<DiagnosticTest>();

            return Ok(tests);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("UserId")))
                return Unauthorized("You must be logged in.");

            var test = _repository.GetEntityByCondition<DiagnosticTest>(x => x.Id == id);

            if (test == null)
                return NotFound();

            return Ok(test);
        }

        [HttpPost]
        public async Task<IActionResult> Add(DiagnosticTest test)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("UserId")))
                return Unauthorized("You must be logged in.");

            test.Date = DateTime.UtcNow;

            await _repository.Add(test);
            await _repository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = test.Id }, test);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, DiagnosticTest updatedTest)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("UserId")))
                return Unauthorized("You must be logged in.");

            if (id != updatedTest.Id)
                return BadRequest("ID mismatch");

            var test = _repository.GetEntityByCondition<DiagnosticTest>(x => x.Id == id);

            if (test == null)
                return NotFound();

            await _repository.Update(updatedTest);
            await _repository.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("UserId")))
                return Unauthorized("You must be logged in.");

            var test = _repository.GetEntityByCondition<DiagnosticTest>(x => x.Id == id);

            if (test == null)
                return NotFound();

            _repository.Delete(test);
            await _repository.SaveChangesAsync();

            return NoContent();
        }
    }
}
