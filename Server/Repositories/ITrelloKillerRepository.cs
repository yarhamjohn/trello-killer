namespace aspnetreact.Server.Repositories
{
    public interface ITrelloKillerRepository
    {
        void AddList(TrelloKillerList trelloKillerList);
        void ModifyList(TrelloKillerList trelloKillerList);
        void RemoveList(string listId);
    }
}
