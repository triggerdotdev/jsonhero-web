using System.Net;
using System.Net.Http.Json;
using JsonDocument = System.Text.Json.JsonDocument;
using JsonHero.Api.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace JsonHero.Api.Tests.Controllers;

public class DocumentsControllerTests
{
    [Fact]
    public async Task CreateFromGet_CreatesDocumentFromJson()
    {
        using var factory = new DocumentsApiFactory();
        using var client = factory.CreateClient();

        using var response = await client.GetAsync("/api/create.json?j=%7B%22name%22%3A%22Ada%22%7D&title=From%20GET");

        response.EnsureSuccessStatusCode();
        using var json = await ReadJsonAsync(response);
        var root = json.RootElement;
        Assert.Equal("From GET", root.GetProperty("title").GetString());
        Assert.Equal("raw", root.GetProperty("type").GetString());
        Assert.Equal("""{"name":"Ada"}""", root.GetProperty("contents").GetString());
        Assert.Equal($"/j/{root.GetProperty("id").GetString()}.json", root.GetProperty("jsonUrl").GetString());
    }

    [Fact]
    public async Task CreateFromPost_CreatesDocumentFromJson()
    {
        using var factory = new DocumentsApiFactory();
        using var client = factory.CreateClient();

        using var response = await client.PostAsJsonAsync("/api/create.json", new
        {
            json = """{"name":"Grace"}""",
            title = "From POST"
        });

        response.EnsureSuccessStatusCode();
        using var json = await ReadJsonAsync(response);
        var root = json.RootElement;
        Assert.Equal("From POST", root.GetProperty("title").GetString());
        Assert.Equal("""{"name":"Grace"}""", root.GetProperty("contents").GetString());
    }

    [Fact]
    public async Task GetDocument_ReturnsExistingDocument()
    {
        using var factory = new DocumentsApiFactory();
        using var client = factory.CreateClient();
        var document = await CreateDocumentAsync(client);

        using var response = await client.GetAsync($"/api/documents/{document.Id}");

        response.EnsureSuccessStatusCode();
        using var json = await ReadJsonAsync(response);
        Assert.Equal(document.Id, json.RootElement.GetProperty("id").GetString());
        Assert.Equal(document.Title, json.RootElement.GetProperty("title").GetString());
    }

    [Fact]
    public async Task GetDocument_ReturnsNotFoundForMissingDocument()
    {
        using var factory = new DocumentsApiFactory();
        using var client = factory.CreateClient();

        using var response = await client.GetAsync("/api/documents/missing");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task UpdateDocument_UpdatesTitle()
    {
        using var factory = new DocumentsApiFactory();
        using var client = factory.CreateClient();
        var document = await CreateDocumentAsync(client);

        using var response = await client.PutAsJsonAsync($"/api/documents/{document.Id}", new
        {
            title = "Updated title"
        });

        response.EnsureSuccessStatusCode();
        using var json = await ReadJsonAsync(response);
        Assert.Equal("Updated title", json.RootElement.GetProperty("title").GetString());
    }

    [Fact]
    public async Task DeleteDocument_DeletesDocument()
    {
        using var factory = new DocumentsApiFactory();
        using var client = factory.CreateClient();
        var document = await CreateDocumentAsync(client);

        using var deleteResponse = await client.DeleteAsync($"/api/documents/{document.Id}");
        using var getResponse = await client.GetAsync($"/api/documents/{document.Id}");

        Assert.Equal(HttpStatusCode.NoContent, deleteResponse.StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, getResponse.StatusCode);
    }

    [Fact]
    public async Task GetPreview_ReturnsPreview()
    {
        using var factory = new DocumentsApiFactory();
        using var client = factory.CreateClient();

        using var response = await client.GetAsync("/api/preview?url=https%3A%2F%2Fwww.theonion.com%2Flatest");

        response.EnsureSuccessStatusCode();
        using var json = await ReadJsonAsync(response);
        Assert.Equal("The Onion", json.RootElement.GetProperty("title").GetString());
    }

    [Fact]
    public async Task GetDocumentJson_ReturnsContents()
    {
        using var factory = new DocumentsApiFactory();
        using var client = factory.CreateClient();
        var document = await CreateDocumentAsync(client, """{"json":true}""");

        using var response = await client.GetAsync($"/j/{document.Id}.json");

        response.EnsureSuccessStatusCode();
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);
        Assert.Equal("""{"json":true}""", await response.Content.ReadAsStringAsync());
    }

    private static async Task<CreatedDocument> CreateDocumentAsync(
        HttpClient client,
        string contents = """{"ok":true}""",
        string title = "Created")
    {
        using var response = await client.PostAsJsonAsync("/api/create.json", new
        {
            json = contents,
            title
        });

        response.EnsureSuccessStatusCode();
        using var json = await ReadJsonAsync(response);

        return new CreatedDocument(
            json.RootElement.GetProperty("id").GetString()!,
            json.RootElement.GetProperty("title").GetString()!);
    }

    private static async Task<JsonDocument> ReadJsonAsync(HttpResponseMessage response)
    {
        var content = await response.Content.ReadAsStringAsync();
        return JsonDocument.Parse(content);
    }

    private sealed record CreatedDocument(string Id, string Title);

    private sealed class DocumentsApiFactory : WebApplicationFactory<Program>
    {
        private readonly SqliteConnection _connection = new("Data Source=:memory:");

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            _connection.Open();

            builder.UseEnvironment("Development");
            builder.ConfigureServices(services =>
            {
                services.RemoveAll<DbContextOptions<AppDbContext>>();
                services.RemoveAll<IHttpClientFactory>();

                services.AddDbContext<AppDbContext>(options => options.UseSqlite(_connection));
                services.AddSingleton<IHttpClientFactory>(new FakeHttpClientFactory());
            });
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);

            if (disposing)
            {
                _connection.Dispose();
            }
        }
    }

    private sealed class FakeHttpClientFactory : IHttpClientFactory
    {
        public HttpClient CreateClient(string name)
        {
            return new HttpClient(new FakeHttpMessageHandler());
        }
    }

    private sealed class FakeHttpMessageHandler : HttpMessageHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            return Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("""{"remote":true}""")
            });
        }
    }
}
