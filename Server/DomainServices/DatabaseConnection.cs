using MongoDB.Driver;

namespace aspnetreact.Server.DomainServices
{
    public class DatabaseConnection : IDatabaseConnection
    {
        public IMongoDatabase GetDatabase(string databaseName)
        {
            var connectionString = "mongodb://localhost:27017";
            var client = new MongoClient(connectionString);
            return client.GetDatabase(databaseName);
        }
    }
}
