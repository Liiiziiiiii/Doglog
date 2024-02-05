using Microsoft.EntityFrameworkCore;

namespace ApiProject.Model
{
    public class DogDbContext:DbContext
    {
        public DogDbContext(DbContextOptions<DogDbContext> options):
            base(options)
        {
        }

        public DbSet<DogDb> dogs { get; set; }
    }
}
