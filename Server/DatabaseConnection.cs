using MongoDB.Driver;

namespace aspnetreact.Server
{
    public class DatabaseConnection : IDatabaseConnection
    {
        public IMongoDatabase GetDatabase(string databaseName)
        {
            // Server must be run before this works.
            // navigate to the folder: C:\Program Files\MongoDB\Server\3.6\bin
            // run the command: mongod --dbpath "d:\mongodb\data"
            var connectionString = "mongodb://localhost:27017";
            var client = new MongoClient(connectionString);
            return client.GetDatabase(databaseName);
        }
    }
}
