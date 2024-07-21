using ApiProject.Context;
using ApiProject.Model.UserModel;
using ApiProject.Model;
using ApiProject.Services;
using Microsoft.EntityFrameworkCore;

public class UserService : IUserService
{
    private readonly ApiDbContext _context;
    private readonly TokenContext _db;

    public UserService(ApiDbContext context, TokenContext db)
    {
        _context = context;
        _db = db;
    }

    public async Task<User> GetByName(string name) =>
        await _context.Users.FirstOrDefaultAsync(a => a.Name == name);

    public UserRefreshTokens AddUserRefreshTokens(UserRefreshTokens user)
    {
        var existingToken = _db.UserRefreshToken.FirstOrDefault(x => x.UserName == user.UserName);
        if (existingToken != null)
        {
            existingToken.RefreshToken = user.RefreshToken;
            existingToken.IsActive = user.IsActive;
            _db.UserRefreshToken.Update(existingToken);
        }
        else
        {
            _db.UserRefreshToken.Add(user);
        }
        _db.SaveChanges();
        return user;
    }

    public void DeleteUserRefreshTokens(int id, string username, string refreshToken)
    {
        var item = _db.UserRefreshToken.FirstOrDefault(x => x.UserName == username && x.RefreshToken == refreshToken && x.Id == id);
        if (item != null)
        {
            _db.UserRefreshToken.Remove(item);
            _db.SaveChanges();
        }
    }

    public UserRefreshTokens GetSavedRefreshTokens(int id, string username, string refreshToken)
    {
        return _db.UserRefreshToken.FirstOrDefault(x => x.UserName == username && x.RefreshToken == refreshToken && x.IsActive == true && x.Id == id);
    }

    public async Task<bool> IsValidUserAsync(LoginUser users)
    {
        var u = _context.Users.FirstOrDefault(o => o.Name == users.Name && o.Password == users.Password);
        return u != null;
    }
}
