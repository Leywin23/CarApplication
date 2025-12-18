using Cars.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Cars.Infrastructure.Data
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!await userManager.Users.AnyAsync())
            {
                var users = new List<AppUser>
                {
                    new AppUser { DisplayName = "franek", UserName = "Franco123", Email = "franek@test.com", EmailConfirmed = true },
                    new AppUser { DisplayName = "asia",   UserName = "Asia123",   Email = "asia@test.com",   EmailConfirmed = true },
                    new AppUser { DisplayName = "darek",  UserName = "Dario123",  Email = "darek@test.com",  EmailConfirmed = true },
                    new AppUser { DisplayName = "michal", UserName = "Szef123",   Email = "michal@test.com", EmailConfirmed = true }
                };

                foreach (var user in users)
                {
                    var result = await userManager.CreateAsync(user, "Haslo!0123");

                    if (!result.Succeeded)
                    {
                        var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                        throw new Exception($"Nie udało się utworzyć użytkownika {user.Email}: {errors}");
                    }
                }
            }

            if (!await context.Cars.AnyAsync())
            {
                var cars = new List<Car>
                {
                    new Car
                    {
                        Brand = "Mazda",
                        Model = "CX60",
                        DoorsNumber = 5,
                        LuggageCapacity = 570,
                        EngineCapacity = 2488,
                        FuelType = FuelType.Hybrid,
                        ProductionDate = DateTime.UtcNow.AddMonths(-1),
                        CarFuelConsumption = 18.1,
                        BodyType = BodyType.SUV
                    },
                    new Car
                    {
                        Brand = "Renault",
                        Model = "Clio II",
                        DoorsNumber = 5,
                        LuggageCapacity = 300,
                        EngineCapacity = 1149,
                        FuelType = FuelType.Petrol,
                        ProductionDate = DateTime.UtcNow.AddYears(-18),
                        CarFuelConsumption = 7.2
                    }
                };

                await context.Cars.AddRangeAsync(cars);
                await context.SaveChangesAsync();
            }
        }
    }
}
