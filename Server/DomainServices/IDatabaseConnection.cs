using MongoDB.Driver;

namespace aspnetreact.Server.DomainServices
{
    public interface IDatabaseConnection
    {
        IMongoDatabase GetDatabase(string databaseName);
    }
}
