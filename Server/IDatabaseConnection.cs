using MongoDB.Driver;

namespace aspnetreact.Server
{
    public interface IDatabaseConnection
    {
        IMongoDatabase GetDatabase(string databaseName);
    }
}
