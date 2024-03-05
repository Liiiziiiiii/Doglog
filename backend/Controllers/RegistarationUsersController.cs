using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiProject.Model;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistarationUsersController : ControllerBase
    {
        private readonly RegistarationUserContext _context;
        public static RegistarationUser user = new RegistarationUser();
        private readonly IConfiguration _configuration;


        public RegistarationUsersController(RegistarationUserContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/RegistarationUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegistarationUser>>> GetUsers()
        {
            return await _context.users.ToListAsync();
        }

        // GET: api/RegistarationUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RegistarationUser>> GetRegistarationUser(int id)
        {
            var registarationUser = await _context.users.FindAsync(id);

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



        [HttpPost("register")]
        public async Task<ActionResult<RegistarationUser>> Register(RegistarationUserDto request)
        {
            try
            {
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.PasswordHash);

                var user = new RegistarationUser
                {
                    Name = request.Name,
                    Surname = request.Surname,
                    Email = request.Email,
                    Password = passwordHash,
                    Phone = request.Phone,
                    Location = request.Location,
                    Namenursery = request.Namenursery
                };

                _context.users.Add(user);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetRegistarationUser), new { id = user.Id }, user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/RegistarationUsers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegistarationUser(int id)
        {
            var registarationUser = await _context.users.FindAsync(id);
            if (registarationUser == null)
            {
                return NotFound();
            }

            _context.users.Remove(registarationUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        [HttpPost("login")]
        public ActionResult<RegistarationUser> Login(LoginUser request)
        {
            var user = _context.users.FirstOrDefault(u => u.Name == request.Name);

            if (user == null)
            {
                return BadRequest("User not found.");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return BadRequest("Wrong password.");
            }

            string token = CreateToken(user);


            return Ok(token);
        }

        private string CreateToken(RegistarationUser user)
        {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Name, user.Name),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        [HttpOptions("register")]
        public IActionResult RegisterOptions()
        {
            Response.Headers.Add("Allow", "POST");
            return Ok();
        }


        private bool RegistarationUserExists(int id)
        {
            return _context.users.Any(e => e.Id == id);
        }
    }
}
