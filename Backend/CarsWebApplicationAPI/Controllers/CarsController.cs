using Cars.Application.Cars;
using Cars.Domain.Models;
using Cars.Infrastructure.Data;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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
            var result= await Mediator.Send(new DetailsCars.Query { Id = id }, ct);

            if(result == null || result.Value ==null)
                return NotFound();

            if (result.IsSuccess)
                return Ok(result.Value);

            return BadRequest(result.Error);
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllCars()
        {
            var result = await Mediator.Send(new ListCars.Query());

            if (result == null || result.Value == null)
                return NotFound();

            if (result.IsSuccess)
                return Ok(result.Value);

            return BadRequest(result.Error);
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateCar([FromBody] CreateCar.Command command)
        {
            var result = await Mediator.Send(command);

            if (result == null || result.Value == null)
                return NotFound();

            if (result.IsSuccess)
                return Ok(result.Value);

            return BadRequest(result.Error);
        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(Guid id)
        {
            var result = await Mediator.Send(new DeleteCar.Command { Id = id });

            if (result == null || result.Value == null)
                return NotFound();

            if (result.IsSuccess)
                return Ok(result.Value);

            return BadRequest(result.Error);
        }
        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateCar([FromBody] EditCar.UpdateCarCommand command, CancellationToken ct)
        {
            var result = await Mediator.Send(command);

            if (result == null || result.Value == null)
                return NotFound();

            if (result.IsSuccess)
                return Ok(result.Value);

            return BadRequest(result.Error);
        }
    }
}