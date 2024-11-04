using HomeHub.API.Extensions;
using HomeHub.App.Dtos.StorageDtos;
using HomeHub.App.Items.Queries;
using HomeHub.App.Storages.Commands;
using HomeHub.App.Storages.Queries;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HomeHub.API.Controllers
{
    [ApiController]
    [Route("api/storages")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class StoragesController : ControllerBase
    {
        private readonly IMediator _mediator;


        public StoragesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateStorage(CreateStorageDto createStorageDto)
        {
            var userId = HttpContext.GetUserIdClaimValue();

            var command = new CreateStorage(userId, createStorageDto);
            var response = await _mediator.Send(command);

            return Ok(response);
        }

        [HttpDelete("{name}")]
        public async Task<IActionResult> DeleteStorage(string name, Guid? parentStorageId)
        {
            var userId = HttpContext.GetUserIdClaimValue();

            var command = new DeleteStorage(userId, name, parentStorageId);
            await _mediator.Send(command);

            return NoContent();
        }

        [HttpGet("houses/{houseId}/users")]
        public async Task<IActionResult> GetUsersByHouseId(Guid houseId)
        {
            var ownerId = HttpContext.GetUserIdClaimValue();

            var command = new GetUsersByHouseId(ownerId, houseId);
            var response = await _mediator.Send(command);

            return Ok(response);
        }

        [HttpPost("houses/{houseId}/users/{email}")]
        public async Task<IActionResult> AddUserToHouse(Guid houseId, string email)
        {
            var ownerId = HttpContext.GetUserIdClaimValue();

            var command = new AddUserToHouse(ownerId, houseId, email);
            await _mediator.Send(command);

            return NoContent();
        }

        [HttpGet("houses")]
        public async Task<IActionResult> GetHousesByUserId()
        {
            var userId = HttpContext.GetUserIdClaimValue();

            var command = new GetHousesByUserId(userId);
            var response = await _mediator.Send(command);

            return Ok(response);
        }

        [HttpGet("{houseId}/rooms")]
        public async Task<IActionResult> GetRoomsByHouseId(Guid houseId)
        {
            var userId = HttpContext.GetUserIdClaimValue();

            var command = new GetRoomsByHouseId(userId, houseId);
            var response = await _mediator.Send(command);

            return Ok(response);
        }

        [HttpGet("{roomId}/substorages")]
        public async Task<IActionResult> GetSubStoragesByRoomId(Guid roomId)
        {
            var userId = HttpContext.GetUserIdClaimValue();

            var command = new GetSubStoragesByRoomId(userId, roomId);
            var response = await _mediator.Send(command);

            return Ok(response);
        }

        [HttpGet("{storageName}/items")]
        public async Task<IActionResult> GetItemsByStorageName(string storageName)
        {
            var userId = HttpContext.GetUserIdClaimValue();

            var command = new GetItemsByStorageName(userId, storageName);
            var response = await _mediator.Send(command);

            return Ok(response);
        }

        [HttpPut("{name}")]
        public async Task<IActionResult> UpdateStorage(String name, UpdateStorageDto updateStorageDto)
        {
            var userId = HttpContext.GetUserIdClaimValue();

            var command = new UpdateStorage(userId, name, updateStorageDto);
            var response = await _mediator.Send(command);

            return Ok(response);
        }
    }
}
