using System.Security.Authentication;
using MongoDB.Driver;

namespace aspnetreact.Server.DomainServices
{
    public class DatabaseConnection : IDatabaseConnection
    {
        public IMongoDatabase GetDatabase(string databaseName)
        {
            var connectionString = @"mongodb://trellokiller:qi5otoGBi8mA4fhiyO2l8UFUnfPCU78H0T3hFOaaCFv3PtAIXX5QLFmQFjZUDxMbsTj4UQN8v2qze56ZEOGA1A==@trellokiller.documents.azure.com:10255/?ssl=true&replicaSet=globaldb";

            var settings = MongoClientSettings.FromUrl(new MongoUrl(connectionString));
            settings.SslSettings =
                new SslSettings() { EnabledSslProtocols = SslProtocols.Tls12 };

            var client = new MongoClient(settings);
            return client.GetDatabase(databaseName);
        }
    }
}
