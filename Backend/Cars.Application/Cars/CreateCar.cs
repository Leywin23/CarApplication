using Cars.Domain.Models;
using Cars.Infrastructure.Data;
using FluentValidation;
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
        public class Command: IRequest<Result<Car>>
        {
            public Car Car { get; set; } = default!;
        }

        public class Handler : IRequestHandler<Command, Result<Car>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Car>> Handle(Command request, CancellationToken ct)
            {
                _context.Cars.Add(request.Car);
                var success = await _context.SaveChangesAsync(ct) > 0;

                if (!success)
                    return Result<Car>.Failure("Nie udało sie zapisać samochodu do bazy danych");

                return Result<Car>.Success(request.Car);
            }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() 
            {
                RuleFor(x => x.Car).SetValidator(new CarValidator());
            }
        }

    }
}
