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
        public JsonResult RetrieveLists()
        {
            return Json(_repository.RetrieveLists());
        }

        [HttpPost("[action]")]
        public void AddList([FromBody] TrelloKillerList list)
        {
            _repository.AddList(list);
        }

        [HttpPost("[action]")]
        public void ModifyList([FromBody] TrelloKillerList list)
        {
            _repository.ModifyList(list);
        }

        [HttpPost("[action]")]
        public void RemoveList([FromBody] string listId)
        {
            _repository.RemoveList(listId);
        }

        [HttpPost("[action]")]
        public void RemoveCard([FromBody] RemovedCard card)
        {
            _repository.RemoveCard(card.CardId, card.SourceListId);
        }

        [HttpPost("[action]")]
        public void AddCard([FromBody] AddedCard card)
        {
            _repository.AddCard(card.Card, card.TargetListId);
        }
    }
}
