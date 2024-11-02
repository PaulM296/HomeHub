using HomeHub.API.Models;
using HomeHub.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
