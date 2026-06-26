using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JsonHero.Api.Data;

[Table("Documents")]
public class JsonDocument
{
    [Key]
    public string Id { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public string Type { get; set; } = "raw";

    public string? Url { get; set; }

    public string Contents { get; set; } = string.Empty;

    public bool ReadOnly { get; set; }

    public DateTime? Ttl { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}
