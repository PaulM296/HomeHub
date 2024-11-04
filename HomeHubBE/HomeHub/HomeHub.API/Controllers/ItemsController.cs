using HomeHub.API.Extensions;
using HomeHub.App.Dtos.ItemDtos;
using HomeHub.App.Items.Commands;
using HomeHub.App.Items.Queries;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HomeHub.API.Controllers
{
    [ApiController]
    [Route("api/items")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ItemsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ItemsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem(CreateItemDto createItemDto)
        {
            var userId = HttpContext.GetUserIdClaimValue();

            var command = new CreateItem(userId, createItemDto);
            var response = await _mediator.Send(command);

            return Ok(response);
        }

        [HttpDelete("{itemName}")]
        public async Task<IActionResult> DeleteItem(string itemName)
        {
            var userId = HttpContext.GetUserIdClaimValue();

            var command = new DeleteItem(userId, itemName);
            await _mediator.Send(command);

            return NoContent();
        }

        [HttpGet("{itemName}")]
        public async Task<IActionResult> GetItemsContainingName(string itemName)
        {
            var userId = HttpContext.GetUserIdClaimValue();

            var command = new GetItemsContainingName(userId, itemName);
            var response = await _mediator.Send(command);

            return Ok(response);
        }

        [HttpPut("{name}")]
        public async Task<IActionResult> UpdateItem(string name, UpdateItemDto updateItemDto)
        {
            var userId = HttpContext.GetUserIdClaimValue();

            var command = new UpdateItem(userId, name, updateItemDto);
            var response = await _mediator.Send(command);

            return Ok(response);
        }

    }
}
