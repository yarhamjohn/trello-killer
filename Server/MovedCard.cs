namespace aspnetreact.Server
{
    public class MovedCard
    {
        public TrelloKillerCard Card { get; set; }
        public string SourceListId { get; set; }
        public string TargetListId { get; set; }
    }
}
