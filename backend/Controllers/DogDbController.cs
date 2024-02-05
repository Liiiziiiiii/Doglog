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
    public class DogDbController : ControllerBase
    {
        private readonly DogDbContext _context;

        public DogDbController(DogDbContext context)
        {
            _context = context;
        }

        // GET: api/DogDb
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DogDb>>> Getdogs()
        {
            return await _context.dogs.ToListAsync();
        }

        // GET: api/DogDb/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DogDb>> GetDogDb(int id)
        {
            var dogDb = await _context.dogs.FindAsync(id);

            if (dogDb == null)
            {
                return NotFound();
            }

            return dogDb;
        }

        // PUT: api/DogDb/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDogDb(int id, DogDb dogDb)
        {
            //if (id != dogDb.Dog_Id)
            //{
            //    return BadRequest();
            //}

            dogDb.Dog_Id = id;

            _context.Entry(dogDb).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DogDbExists(id))
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

        // POST: api/DogDb
        [HttpPost]
        public async Task<ActionResult<DogDb>> PostDogDb(DogDb dogDb)
        {
            dogDb.Mother = null;
            dogDb.Father = null;

            _context.dogs.Add(dogDb);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDogDb", new { id = dogDb.Dog_Id }, dogDb);
        }


        // DELETE: api/DogDb/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDogDb(int id)
        {
            var dogDb = await _context.dogs.FindAsync(id);
            if (dogDb == null)
            {
                return NotFound();
            }

            _context.dogs.Remove(dogDb);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DogDbExists(int id)
        {
            return _context.dogs.Any(e => e.Dog_Id == id);
        }
    }
}
