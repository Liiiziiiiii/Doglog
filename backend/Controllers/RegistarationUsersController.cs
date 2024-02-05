using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiProject.Model;

namespace ApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistarationUsersController : ControllerBase
    {
        private readonly RegistarationUserContext _context;

        public RegistarationUsersController(RegistarationUserContext context)
        {
            _context = context;
        }

        // GET: api/RegistarationUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegistarationUser>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/RegistarationUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RegistarationUser>> GetRegistarationUser(int id)
        {
            var registarationUser = await _context.Users.FindAsync(id);

            if (registarationUser == null)
            {
                return NotFound();
            }

            return registarationUser;
        }

        // PUT: api/RegistarationUsers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegistarationUser(int id, RegistarationUser registarationUser)
        {
            if (id != registarationUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(registarationUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegistarationUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RegistarationUsers
        [HttpPost]
        public async Task<ActionResult<RegistarationUser>> PostRegistarationUser(RegistarationUser registarationUser)
        {
            _context.Users.Add(registarationUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRegistarationUser", new { id = registarationUser.Id }, registarationUser);
        }

        // DELETE: api/RegistarationUsers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegistarationUser(int id)
        {
            var registarationUser = await _context.Users.FindAsync(id);
            if (registarationUser == null)
            {
                return NotFound();
            }

            _context.Users.Remove(registarationUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/RegistarationUsers/Login
        [HttpPost("Login")]
        public async Task<ActionResult<RegistarationUser>> Login(LoginUser loginUser)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Name == loginUser.Name && u.Password == loginUser.Password);

            if (user == null)
            {
                Console.WriteLine($"User with Name '{loginUser.Name}' has NOT logged in."); 
                return Unauthorized(); 
            }

            Console.WriteLine($"User with Name '{loginUser.Name}' has logged in."); 

            return Ok(user);
        }



        private bool RegistarationUserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
