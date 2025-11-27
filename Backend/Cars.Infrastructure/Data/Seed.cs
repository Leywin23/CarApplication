using Cars.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cars.Infrastructure.Data
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Cars.Any()) return;

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
