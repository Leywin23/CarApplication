using Cars.Application.Cars;
using Cars.Domain.Models;
using Cars.Infrastructure.Data;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Cars.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : BaseApiController
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCarById(Guid id, CancellationToken ct)
        {
            var car = await Mediator.Send(new DetailsCars.Query { Id = id }, ct);

            if (car is null)
                return NotFound();

            return Ok(car);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCars()
        {
            var cars = await Mediator.Send(new ListCars.Query());
            return Ok(cars);
        }
        [HttpPost]
        public async Task<IActionResult> CreateCar([FromBody] CreateCar.Command command)
        {
            var car = await Mediator.Send(command);
            return Ok(car);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(Guid id)
        {
            var car = await Mediator.Send(new DeleteCar.Command { Id = id });
            return Ok(car);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateCar(EditCar.UpdateCarCommand command)
        {
            var car = await Mediator.Send(command);
            return Ok(car);
        }
    }
}