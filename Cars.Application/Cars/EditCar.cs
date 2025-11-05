using Cars.Domain.Models;
using Cars.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cars.Application.Cars
{
    public class EditCar
    {
        public sealed class UpdateCarCommand : IRequest<Car>
        {
            public Guid Id { get; set; }
            public string Brand { get; set; } = default!;
            public string Model { get; set; } = default!;
            public int DoorsNumber { get; set; }
            public int LuggageCapacity { get; set; }
            public int EngineCapacity { get; set; }
            public FuelType FuelType { get; set; }
            public DateTime ProductionDate { get; set; }
            public double CarFuelConsumption { get; set; }
            public BodyType BodyType { get; set; }
        }

        public sealed class UpdateCarHandler : IRequestHandler<UpdateCarCommand, Car>
        {
            private readonly DataContext _context;
            public UpdateCarHandler(DataContext context) => _context = context;

            public async Task<Car> Handle(UpdateCarCommand request, CancellationToken ct)
            {
                var car = await _context.Cars.FirstOrDefaultAsync(c => c.Id == request.Id, ct);
                if (car is null)
                    throw new KeyNotFoundException($"Car {request.Id} not found");

                car.Brand = request.Brand;
                car.Model = request.Model;
                car.DoorsNumber = request.DoorsNumber;
                car.LuggageCapacity = request.LuggageCapacity;
                car.EngineCapacity = request.EngineCapacity;
                car.FuelType = request.FuelType;
                car.ProductionDate = request.ProductionDate;
                car.CarFuelConsumption = request.CarFuelConsumption;
                car.BodyType = request.BodyType;

                await _context.SaveChangesAsync(ct);
                return car;
            }
        }
    }
}
