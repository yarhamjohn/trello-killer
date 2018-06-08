using aspnetreact.Server.DomainServices;
using MongoDB.Driver;

namespace aspnetreact.Server.Repositories
{
    public class TrelloKillerRepository : ITrelloKillerRepository
    {
        public readonly IMongoDatabase Database;

        public TrelloKillerRepository(IDatabaseConnection databaseConnection)
        {
            Database = databaseConnection.GetDatabase("TrelloKiller");
        }

        public void AddList(TrelloKillerList list)
        {
            var collection = Database.GetCollection<TrelloKillerList>("Lists");
            collection.InsertOneAsync(list);
        }
    }
}
