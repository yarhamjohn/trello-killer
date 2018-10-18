using System.Security.Authentication;
using MongoDB.Driver;

namespace aspnetreact.Server.DomainServices
{
    public class DatabaseConnection : IDatabaseConnection
    {
        public IMongoDatabase GetDatabase(string databaseName)
        {
            var connectionString = @"mongodb://trellokiller:kbU9GPHFKsrTwZPHmJW734HTICkqHfmkK9aMoutzbwlXYjRmXEA9cVzDbBZxRWS5xDWzlLwet9qw0p4nOb6ZHQ==@trellokiller.documents.azure.com:10255/?ssl=true&replicaSet=globaldb";

            var settings = MongoClientSettings.FromUrl(new MongoUrl(connectionString));
            settings.SslSettings =
                new SslSettings() { EnabledSslProtocols = SslProtocols.Tls12 };

            var client = new MongoClient(settings);
            return client.GetDatabase(databaseName);
        }
    }
}
