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
        public class Command : IRequest<Car>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Car>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Car> Handle(Command request, CancellationToken cancellationToken)
            {
                var car = await _context.Cars.FindAsync(request.Id);
                _context.Cars.Remove(car);
                await _context.SaveChangesAsync();
                return car;
            }
        }
    }
}
