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
    public class ListCars
    {
        public class Query : IRequest<List<Car>> { }

        public class Handler : IRequestHandler<Query, List<Car>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Car>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Cars.ToListAsync(cancellationToken);
            }
        }
    }
}
