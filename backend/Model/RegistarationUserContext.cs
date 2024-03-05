using Microsoft.EntityFrameworkCore;

namespace ApiProject.Model
{
    public class RegistarationUserContext : DbContext
    {
        public RegistarationUserContext(DbContextOptions<RegistarationUserContext> options) :
            base(options)
        {

        }
        public DbSet<RegistarationUser> users { get; set; }
    }
}
