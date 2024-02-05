using ApiProject.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Configuration;
using Microsoft.Extensions.DependencyInjection;
//using Microsoft.OpenApi.Models;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DogDbContext>
    (options => options.UseNpgsql
    (builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddDbContext<RegistarationUserContext>(options =>
        options.UseNpgsql
    (builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
