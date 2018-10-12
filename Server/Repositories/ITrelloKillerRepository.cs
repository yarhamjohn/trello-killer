using System.Collections.Generic;

namespace aspnetreact.Server.Repositories
{
    public interface ITrelloKillerRepository
    {
        List<TrelloKillerList> RetrieveLists();
        void AddList(TrelloKillerList trelloKillerList);
        void ModifyList(TrelloKillerList trelloKillerList);
        void RemoveList(string listId);
        void AddCard(TrelloKillerCard card, string targetListId);
        void RemoveCard(string cardId, string sourceListId);
    }
}
