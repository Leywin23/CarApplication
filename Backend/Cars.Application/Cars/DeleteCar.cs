using Cars.Domain.Models;
using Cars.Infrastructure.Data;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cars.Application.Cars
{
    public class DeleteCar
    {
        public class Command : IRequest<Result<Car>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Car>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Car>> Handle(Command request, CancellationToken cancellationToken)
            {
                var car = await _context.Cars.FindAsync(request.Id);
                _context.Cars.Remove(car);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result)
                    return Result<Car>.Failure("Failed to delete the car");
                return Result<Car>.Success(car);
            }

        }
    }
}
