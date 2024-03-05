namespace ApiProject.Model
{
    public class RegistarationUserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Surname { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; }
        public string? Phone { get; set; }
        public string? Location { get; set; }
        public string? Namenursery { get; set; }
    }
}
