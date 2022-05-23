namespace TodoApi.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Keyword { get; set; }
        public bool IsComplete { get; set; }
    }
}