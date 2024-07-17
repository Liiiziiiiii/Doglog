using ApiProject.Context;
using ApiProject.Model;
using ApiProject.Model.DogModel;
using ApiProject.Model.UserModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DogDetailsController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public DogDetailsController(ApiDbContext context)
        {
            _context = context;
        }

        [HttpGet("with-children/{id}")]
        public async Task<ActionResult<DogSortInfo>> GetDogWithChildren(int id)
        {
            var dogWithChildren = await _context.Dogs
                .Where(d => d.Id == id)
                .Select(dog => new DogSortInfo
                {
                    Name = dog.Name,
                    Puppies = _context.Dogs
                        .Where(child => child.Mother_Id == dog.Id || child.Father_Id == dog.Id)
                        .Select(child => new DogSortInfo
                        {
                            Id = child.Id,
                            Photo = child.Photo,
                            Name = child.Name,
                            Sex = child.Sex,
                            Wool = child.Wool,
                            Breed = child.Breed,
                            Age = child.Age
                        }).ToList()
                })
                .FirstOrDefaultAsync();

            if (dogWithChildren == null)
            {
                return NotFound();
            }

            return Ok(dogWithChildren);
        }


        [HttpGet("album-dog/{id}")]
        public async Task<ActionResult<DogSortInfo>> GetDogWithPhoto(int id)
        {
            var dogWithPhoto = await _context.Dogs
                .Where(d => d.Id == id)
                .Select(dog => new DogSortInfo
                {
                    Name = dog.Name,
                    Photos = _context.DogPhotos
                .Where(photo => photo.DogId == dog.Id)
                .Select(photo => new DogPhoto
                {
                    Id = photo.Id,
                    Photo = photo.Photo,
                    DogId = photo.DogId
                }).ToList()
                })
                .FirstOrDefaultAsync();

            if (dogWithPhoto == null)
            {
                return NotFound();
            }

            return Ok(dogWithPhoto);
        }

        [HttpGet("users-with-dogs/{id}")]
        public async Task<ActionResult<DogSortInfo>> GetUserWithDogs(int id)
        {
            var userWithDogs = await _context.Users
                .Where(u => u.Id == id)
                .Select(user => new UserDTO
                {
                    Name = user.Name,
                    Surname = user.Surname,
                    Email = user.Email,
                    Phone = user.Phone,
                    Location = user.Location,
                    Namenursery = user.Namenursery,
                    Photo = user.Photo,

                    Dogs = _context.Dogs
                        .Where(d => d.UserId == user.Id)
                        .Select(dog => new DogSortInfo
                        {
                            Id = dog.Id,
                            Photo = dog.Photo,
                            Name = dog.Name,
                            Sex = dog.Sex,
                            Wool = dog.Wool,
                            Breed = dog.Breed,
                            Age = dog.Age
                        }).ToList()
                })
                .FirstOrDefaultAsync();

            if (userWithDogs == null)
            {
                return NotFound();
            }

            return Ok(userWithDogs);
        }

        [HttpGet("dog-with-parents/{id}")]
        public async Task<ActionResult<Dog>> GetDogWithParents(int id)
        {
            var dogWithParents = await _context.Dogs
                .Where(d => d.Id == id)
                .Select(dog => new Dog
                {
                    Id = dog.Id,
                    Name = dog.Name,
                    Breed = dog.Breed,
                    Wool = dog.Wool,
                    Age = dog.Age,
                    Sex = dog.Sex,
                    Photo = dog.Photo,
                    UserId = dog.UserId,
                    Mother_Id = dog.Mother_Id,
                    Father_Id = dog.Father_Id,
                    Mother = _context.Dogs
                        .Where(m => m.Id == dog.Mother_Id)
                        .Select(m => new Dog
                        {
                            Id = m.Id,
                            Name = m.Name,
                            Breed = m.Breed,
                            Wool = m.Wool,
                            Age = m.Age,
                            Sex = m.Sex,
                            Photo = m.Photo
                        })
                        .FirstOrDefault(),
                    Father = _context.Dogs
                        .Where(f => f.Id == dog.Father_Id)
                        .Select(f => new Dog
                        {
                            Id = f.Id,
                            Name = f.Name,
                            Breed = f.Breed,
                            Wool = f.Wool,
                            Age = f.Age,
                            Sex = f.Sex,
                            Photo = f.Photo
                        })
                        .FirstOrDefault()
                })
                .FirstOrDefaultAsync();

            if (dogWithParents == null)
            {
                return NotFound();
            }

            return Ok(dogWithParents);
        }



        [HttpGet("dog-user/{id}")]
        public async Task<ActionResult<DogSortInfo>> GetDogWithUser(int id)
        {
            var dogWithOwner = await _context.Dogs
                .Where(d => d.Id == id)
                .Select(dog => new DogSortInfo
                {
                    Name = dog.Name,
                    Photo = dog.Photo,
                    Owner = _context.Users
                        .Where(u => u.Id == dog.UserId)
                        .Select(user => new UserDTO
                        {
                            Name = user.Name,
                            Surname = user.Surname,
                            Email = user.Email,
                            Phone = user.Phone,
                            Location = user.Location,
                            Namenursery = user.Namenursery,
                            Photo = user.Photo,
                            Dogs = _context.Dogs
                                .Where(d => d.UserId == user.Id)
                                .Select(d => new DogSortInfo
                                {
                                    Id = d.Id,
                                    Photo = d.Photo,
                                    Name = d.Name,
                                    Sex = d.Sex,
                                    Wool = d.Wool,
                                    Breed = d.Breed,
                                    Age = d.Age
                                })
                                .ToList()
                        })
                        .FirstOrDefault()
                })
                .FirstOrDefaultAsync();

            if (dogWithOwner == null)
            {
                return NotFound();
            }

            return Ok(dogWithOwner);
        }



    }
}

