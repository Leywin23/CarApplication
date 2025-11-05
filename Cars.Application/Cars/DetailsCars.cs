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
    public class DetailsCars
    {
        public class Query : IRequest<Car>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query,Car> {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Car> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Cars.FindAsync(request.Id);
            }
        }
    }
}
