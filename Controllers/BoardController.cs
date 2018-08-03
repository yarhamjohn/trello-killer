using aspnetreact.Server;
using aspnetreact.Server.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace aspnetreact.Controllers
{
    [Route("api/[controller]")]
    public class BoardController : Controller
    {
        private readonly ITrelloKillerRepository _repository;

        public BoardController(ITrelloKillerRepository trelloKillerRepository)
        {
            _repository = trelloKillerRepository;
        }

        [HttpPost("[action]")]
        public void SaveList([FromBody] TrelloKillerList list)
        {
            _repository.SaveList(list);
        }

        [HttpPost("[action]")]
        public void RemoveList([FromBody] string listId)
        {
            _repository.RemoveList(listId);
        }
    }
}
