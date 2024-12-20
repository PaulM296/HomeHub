using HomeHub.API.Extensions;
using HomeHub.API.Middleware;
using HomeHub.API.Models;
using HomeHub.App.Options;
using HomeHub.App.Services;
using HomeHub.Domain.Entities;
using HomeHub.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Register authentication configurations
builder.RegisterAuthentication();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwagger();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "http://ec2-51-20-42-116.eu-north-1.compute.amazonaws.com") // Angular app's URL
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});


// Database
var config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .Build();

using StreamReader r = new(config.GetValue<string>("SecretsFile"));
string json = r.ReadToEnd();
var secrets = JsonConvert.DeserializeObject<SecretsModel>(json);
if (secrets == null)
{
    return;
}
builder.Services.AddSingleton(secrets);
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(string.Format(
     config.GetConnectionString("Database"),
     secrets.DatabaseHost,
     secrets.DatabaseName,
     secrets.DatabaseUsername,
     secrets.DatabasePassword
    )));

// ASP.NET Identity
builder.Services.AddIdentity<User, IdentityRole<Guid>>()
    .AddEntityFrameworkStores<AppDbContext>();

// JWT settings and custom Identity Service
builder.Services.Configure<JwtSettings>(config.GetSection("JwtSettings"));
builder.Services.AddSingleton<IdentityService>();

// MediatR
builder.Services.AddMediatR();

// AutoMapper
builder.Services.AddAutoMapper();

// Repositories
builder.Services.AddRepositories();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Custom Exception middleware
app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseCors("AllowAngularApp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
