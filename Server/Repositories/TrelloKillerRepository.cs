using System.Collections.Generic;
using aspnetreact.Server.DomainServices;
using MongoDB.Driver;

namespace aspnetreact.Server.Repositories
{
    public class TrelloKillerRepository : ITrelloKillerRepository
    {
        public readonly IMongoDatabase Database;
        public IMongoCollection<TrelloKillerList> TrelloKillerCollection;
        public FilterDefinitionBuilder<TrelloKillerList> FilterBuilder;
        public UpdateDefinitionBuilder<TrelloKillerList> UpdateBuilder;

        public TrelloKillerRepository(IDatabaseConnection databaseConnection)
        {
            Database = databaseConnection.GetDatabase("TrelloKiller");
            TrelloKillerCollection = Database.GetCollection<TrelloKillerList>("Lists");
            FilterBuilder = Builders<TrelloKillerList>.Filter;
            UpdateBuilder = Builders<TrelloKillerList>.Update;
        }

        public List<TrelloKillerList> RetrieveLists()
        {
            return TrelloKillerCollection.Find(FilterDefinition<TrelloKillerList>.Empty).ToList();
        }

        public void AddList(TrelloKillerList list)
        {
            TrelloKillerCollection.InsertOneAsync(list);
        }

        public void ModifyList(TrelloKillerList trelloKillerList)
        {
            var filter = FilterBuilder.Eq(list => list.ListId, trelloKillerList.ListId);
            var update = UpdateBuilder.Set(list => list.Name, trelloKillerList.Name).Set(list => list.Cards, trelloKillerList.Cards);
            TrelloKillerCollection.UpdateOneAsync(filter, update);
        }

        public void RemoveList(string listId)
        {
            var filter = FilterBuilder.Eq(list => list.ListId, listId);
            TrelloKillerCollection.DeleteOneAsync(filter);
        }

        public void MoveCard(MovedCard movedCard)
        {
            RemoveCard(movedCard.Card.CardId, movedCard.SourceListId);
            AddCard(movedCard.Card, movedCard.TargetListId);
        }

        private void RemoveCard(string cardId, string sourceListId)
        {
            var filter = FilterBuilder.Eq(list => list.ListId, sourceListId);
            var update = UpdateBuilder.PullFilter(list => list.Cards, card => card.CardId == cardId);
            TrelloKillerCollection.UpdateOneAsync(filter, update);
        }

        private void AddCard(TrelloKillerCard card, string targetListId)
        {
            var filter = FilterBuilder.Eq(list => list.ListId, targetListId);
            var update = UpdateBuilder.Push(list => list.Cards, card);
            TrelloKillerCollection.UpdateOneAsync(filter, update);
        }
    }
}
