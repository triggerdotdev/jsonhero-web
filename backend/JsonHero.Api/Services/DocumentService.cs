using JsonHero.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace JsonHero.Api.Services;

public class DocumentService
{
    private readonly AppDbContext _dbContext;
    private readonly IHttpClientFactory _httpClientFactory;

    public DocumentService(AppDbContext dbContext, IHttpClientFactory httpClientFactory)
    {
        _dbContext = dbContext;
        _httpClientFactory = httpClientFactory;
    }

    public async Task<JsonDocument> CreateFromRawJsonAsync(string json, string? title, DateTime? ttl, bool readOnly)
    {
        var now = DateTime.UtcNow;
        var document = new JsonDocument
        {
            Id = await GenerateIdAsync(),
            Title = string.IsNullOrWhiteSpace(title) ? "Untitled" : title.Trim(),
            Type = "raw",
            Contents = json,
            ReadOnly = readOnly,
            Ttl = ttl,
            CreatedAt = now,
            UpdatedAt = now
        };

        _dbContext.Documents.Add(document);
        await _dbContext.SaveChangesAsync();

        return document;
    }

    public async Task<JsonDocument> CreateFromUrlAsync(string url, string? title, DateTime? ttl, bool readOnly)
    {
        using var client = _httpClientFactory.CreateClient();
        var contents = await client.GetStringAsync(url);
        var now = DateTime.UtcNow;
        var document = new JsonDocument
        {
            Id = await GenerateIdAsync(),
            Title = string.IsNullOrWhiteSpace(title) ? url : title.Trim(),
            Type = "url",
            Url = url,
            Contents = contents,
            ReadOnly = readOnly,
            Ttl = ttl,
            CreatedAt = now,
            UpdatedAt = now
        };

        _dbContext.Documents.Add(document);
        await _dbContext.SaveChangesAsync();

        return document;
    }

    public async Task<JsonDocument?> GetDocumentAsync(string id)
    {
        return await _dbContext
            .GetActiveDocuments()
            .FirstOrDefaultAsync(document => document.Id == id);
    }

    public async Task<JsonDocument?> UpdateDocumentAsync(string id, string? title)
    {
        var document = await GetDocumentAsync(id);
        if (document == null || document.ReadOnly)
        {
            return null;
        }

        document.Title = string.IsNullOrWhiteSpace(title) ? document.Title : title.Trim();
        document.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();

        return document;
    }

    public async Task<bool> DeleteDocumentAsync(string id)
    {
        var document = await GetDocumentAsync(id);
        if (document == null || document.ReadOnly)
        {
            return false;
        }

        _dbContext.Documents.Remove(document);
        await _dbContext.SaveChangesAsync();

        return true;
    }

    private async Task<string> GenerateIdAsync()
    {
        string id;

        do
        {
            id = Guid.NewGuid().ToString("N")[..12];
        }
        while (await _dbContext.Documents.AnyAsync(document => document.Id == id));

        return id;
    }
}
