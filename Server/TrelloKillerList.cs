using MongoDB.Bson;

namespace aspnetreact.Server
{
    public class TrelloKillerList
    {
        public ObjectId _id { get; set; }
        public string ListId { get; set; }
        public string Name { get; set; }
        public TrelloKillerCard[] Cards { get; set; }
    }
}