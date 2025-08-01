namespace team28HackathonAPI.Models
{
    public class MonitoredDestination
    {
        public int? Id { get; set; }
        public string Location { get; set; }
        public string RiskLevel { get; set; }
        public DateTime LastChecked { get; set; }
    }
}
