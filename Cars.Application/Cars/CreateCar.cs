using Cars.Domain.Models;
using Cars.Infrastructure.Data;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Cars.Application.Cars
{
    public class CreateCar
    {
        public class Command: IRequest<Car>
        {
            public string Brand { get; set; }
            public string Model { get; set; }
            public int DoorsNumber { get; set; }
            public int LuggageCapacity { get; set; }
            public int EngineCapacity { get; set; }
            public FuelType FuelType { get; set; }
            public DateTime ProductionDate { get; set; }
            public double CarFuelConsumption { get; set; }
            public BodyType BodyType { get; set; }
        }

        public class Handler : IRequestHandler<Command, Car>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Car> Handle(Command request, CancellationToken ct)
            {
                var car = new Car
                {
                    Id = Guid.NewGuid(),
                    Brand = request.Brand,
                    Model = request.Model,
                    DoorsNumber = request.DoorsNumber,
                    LuggageCapacity = request.LuggageCapacity,
                    EngineCapacity = request.EngineCapacity,
                    FuelType = request.FuelType,
                    ProductionDate = request.ProductionDate,
                    CarFuelConsumption = request.CarFuelConsumption,
                    BodyType = request.BodyType
                };

                _context.Cars.Add(car);
                await _context.SaveChangesAsync(ct);

                return car; 
            }
        }
    }
}
