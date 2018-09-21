namespace aspnetreact.Server
{
    public class RemovedCard
    {
        public string CardId { get; set; }
        public string SourceListId { get; set; }
    }

    public class AddedCard
    {
        public TrelloKillerCard Card { get; set; }
        public string TargetListId { get; set; }
    }
}
