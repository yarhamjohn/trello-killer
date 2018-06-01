using aspnetreact.Server;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace aspnetreact.Controllers
{
    [Route("api/[controller]")]
    public class BoardController : Controller
    {
        public readonly IMongoDatabase Database;

        public BoardController(IDatabaseConnection databaseConnection)
        {
            Database = databaseConnection.GetDatabase("TrelloKiller");
        }

        [HttpPost("[action]")]
        public void AddList([FromBody] TrelloKillerList list)
        {
            var collection = Database.GetCollection<TrelloKillerList>("Lists");
            collection.InsertOneAsync(list);
        }        

        [HttpPost("[action]")]
        public void AddCard([FromBody] TrelloKillerCard card)
        {
            var collection = Database.GetCollection<TrelloKillerCard>("Cards");
            collection.InsertOneAsync(card);
        }
    }
}
