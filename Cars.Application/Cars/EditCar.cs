using Cars.Domain.Models;
using Cars.Infrastructure.Data;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Cars.Application.Cars
{
    public class EditCar
    {
        public sealed class UpdateCarCommand : IRequest<Result<Car>>
        {
            public Car Car { get; set; } = default!;
        }

        public sealed class UpdateCarHandler : IRequestHandler<UpdateCarCommand, Result<Car>>
        {
            private readonly DataContext _context;
            public UpdateCarHandler(DataContext context) => _context = context;

            public async Task<Result<Car>> Handle(UpdateCarCommand request, CancellationToken ct)
            {
                var existing = await _context.Cars.FirstOrDefaultAsync(c => c.Id == request.Car.Id, ct);
                if (existing is null)
                    throw new KeyNotFoundException($"Car {request.Car.Id} not found");

                var src = request.Car;

                existing.Brand = src.Brand;
                existing.Model = src.Model;
                existing.DoorsNumber = src.DoorsNumber;
                existing.LuggageCapacity = src.LuggageCapacity;
                existing.EngineCapacity = src.EngineCapacity;
                existing.FuelType = src.FuelType;
                existing.ProductionDate = src.ProductionDate;
                existing.CarFuelConsumption = src.CarFuelConsumption;
                existing.BodyType = src.BodyType;

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Car>.Failure("Failed to update car.");

                return Result<Car>.Success(existing);
            }
        }

        public class CommandValidator : AbstractValidator<UpdateCarCommand>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Car).SetValidator(new CarValidator());
            }
        }

    }
}
