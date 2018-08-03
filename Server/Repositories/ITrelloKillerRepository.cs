namespace aspnetreact.Server.Repositories
{
    public interface ITrelloKillerRepository
    {
        void SaveList(TrelloKillerList trelloKillerList);
        void RemoveList(string listId);
    }
}
