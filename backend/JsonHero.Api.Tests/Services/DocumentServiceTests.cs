using System.Net;
using JsonHero.Api.Data;
using JsonHero.Api.Services;
using Microsoft.EntityFrameworkCore;

namespace JsonHero.Api.Tests.Services;

public class DocumentServiceTests
{
    [Fact]
    public async Task CreateFromRawJsonAsync_CreatesDocument()
    {
        await using var dbContext = CreateDbContext();
        var service = CreateService(dbContext);

        var document = await service.CreateFromRawJsonAsync("""{"name":"Ada"}""", " Test title ", null, false);

        Assert.Equal("Test title", document.Title);
        Assert.Equal("raw", document.Type);
        Assert.Equal("""{"name":"Ada"}""", document.Contents);
        Assert.False(document.ReadOnly);
        Assert.Null(document.Url);
        Assert.NotEmpty(document.Id);
        Assert.NotEqual(default, document.CreatedAt);
        Assert.NotEqual(default, document.UpdatedAt);
        Assert.Same(document, await dbContext.Documents.SingleAsync());
    }

    [Fact]
    public async Task CreateFromUrlAsync_FetchesContentsAndCreatesDocument()
    {
        await using var dbContext = CreateDbContext();
        var service = CreateService(dbContext, """{"from":"url"}""");

        var document = await service.CreateFromUrlAsync("https://example.com/data.json", null, null, false);

        Assert.Equal("https://example.com/data.json", document.Title);
        Assert.Equal("url", document.Type);
        Assert.Equal("https://example.com/data.json", document.Url);
        Assert.Equal("""{"from":"url"}""", document.Contents);
        Assert.Same(document, await dbContext.Documents.SingleAsync());
    }

    [Fact]
    public async Task GetDocumentAsync_ReturnsExistingDocument()
    {
        await using var dbContext = CreateDbContext();
        var document = AddDocument(dbContext, id: "existing");
        var service = CreateService(dbContext);

        var result = await service.GetDocumentAsync("existing");

        Assert.Same(document, result);
    }

    [Fact]
    public async Task GetDocumentAsync_ReturnsNullForMissingDocument()
    {
        await using var dbContext = CreateDbContext();
        var service = CreateService(dbContext);

        var result = await service.GetDocumentAsync("missing");

        Assert.Null(result);
    }

    [Fact]
    public async Task UpdateDocumentAsync_UpdatesExistingDocument()
    {
        await using var dbContext = CreateDbContext();
        var document = AddDocument(dbContext, title: "Before");
        var service = CreateService(dbContext);

        var result = await service.UpdateDocumentAsync(document.Id, " After ");

        Assert.Same(document, result);
        Assert.Equal("After", document.Title);
        Assert.True(document.UpdatedAt >= document.CreatedAt);
    }

    [Fact]
    public async Task UpdateDocumentAsync_ReturnsNullForReadOnlyDocument()
    {
        await using var dbContext = CreateDbContext();
        var document = AddDocument(dbContext, title: "Before", readOnly: true);
        var service = CreateService(dbContext);

        var result = await service.UpdateDocumentAsync(document.Id, "After");

        Assert.Null(result);
        Assert.Equal("Before", document.Title);
    }

    [Fact]
    public async Task DeleteDocumentAsync_DeletesExistingDocument()
    {
        await using var dbContext = CreateDbContext();
        var document = AddDocument(dbContext);
        var service = CreateService(dbContext);

        var result = await service.DeleteDocumentAsync(document.Id);

        Assert.True(result);
        Assert.Empty(await dbContext.Documents.ToListAsync());
    }

    [Fact]
    public async Task DeleteDocumentAsync_ReturnsFalseForReadOnlyDocument()
    {
        await using var dbContext = CreateDbContext();
        var document = AddDocument(dbContext, readOnly: true);
        var service = CreateService(dbContext);

        var result = await service.DeleteDocumentAsync(document.Id);

        Assert.False(result);
        Assert.Same(document, await dbContext.Documents.SingleAsync());
    }

    private static AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }

    private static DocumentService CreateService(AppDbContext dbContext, string responseContent = """{"ok":true}""")
    {
        return new DocumentService(dbContext, new FakeHttpClientFactory(responseContent));
    }

    private static JsonDocument AddDocument(
        AppDbContext dbContext,
        string id = "doc-id",
        string title = "Document",
        bool readOnly = false)
    {
        var now = DateTime.UtcNow;
        var document = new JsonDocument
        {
            Id = id,
            Title = title,
            Type = "raw",
            Contents = """{"ok":true}""",
            ReadOnly = readOnly,
            CreatedAt = now,
            UpdatedAt = now
        };

        dbContext.Documents.Add(document);
        dbContext.SaveChanges();

        return document;
    }

    private sealed class FakeHttpClientFactory : IHttpClientFactory
    {
        private readonly string _responseContent;

        public FakeHttpClientFactory(string responseContent)
        {
            _responseContent = responseContent;
        }

        public HttpClient CreateClient(string name)
        {
            return new HttpClient(new FakeHttpMessageHandler(_responseContent));
        }
    }

    private sealed class FakeHttpMessageHandler : HttpMessageHandler
    {
        private readonly string _responseContent;

        public FakeHttpMessageHandler(string responseContent)
        {
            _responseContent = responseContent;
        }

        protected override Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            return Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(_responseContent)
            });
        }
    }
}
