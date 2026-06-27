using System.Net;
using System.Text.Json;
using JsonHero.Api.Services;
using Microsoft.Extensions.Configuration;

namespace JsonHero.Api.Tests.Services;

public class UrlPreviewServiceTests
{
    [Fact]
    public async Task GetPreviewAsync_ReturnsTheOnionFixture()
    {
        var service = CreateService();

        var preview = await service.GetPreviewAsync("https://www.theonion.com/latest");

        using var json = ToJsonDocument(preview);
        var root = json.RootElement;
        Assert.Equal("The Onion", root.GetProperty("title").GetString());
        Assert.Equal("America's Finest News Source", root.GetProperty("description").GetString());
        Assert.Equal("https://www.theonion.com/latest", root.GetProperty("url").GetString());
        Assert.Equal(JsonValueKind.Null, root.GetProperty("image").ValueKind);
    }

    [Fact]
    public async Task GetPreviewAsync_ReturnsYouTubeFixture()
    {
        var service = CreateService();

        var preview = await service.GetPreviewAsync("https://www.youtube.com/watch?v=dQw4w9WgXcQ");

        using var json = ToJsonDocument(preview);
        var root = json.RootElement;
        Assert.Equal("YouTube", root.GetProperty("title").GetString());
        Assert.Equal("YouTube video", root.GetProperty("description").GetString());
        Assert.Equal("https://www.youtube.com/watch?v=dQw4w9WgXcQ", root.GetProperty("url").GetString());
        Assert.Equal("https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg", root.GetProperty("image").GetString());
    }

    [Fact]
    public async Task GetPreviewAsync_RewritesIpfsUrlBeforeOpenGraphRequest()
    {
        var handler = new CapturingHttpMessageHandler("""{"title":"IPFS"}""");
        var service = CreateService(handler);

        var preview = await service.GetPreviewAsync("ipfs://bafybeigdyrzt");

        Assert.NotNull(handler.RequestUri);
        var query = Microsoft.AspNetCore.WebUtilities.QueryHelpers.ParseQuery(handler.RequestUri!.Query);
        Assert.Equal("https://ipfs.io/ipfs/bafybeigdyrzt", query["url"]);

        using var json = ToJsonDocument(preview);
        Assert.Equal("IPFS", json.RootElement.GetProperty("title").GetString());
    }

    private static UrlPreviewService CreateService(HttpMessageHandler? handler = null)
    {
        var configuration = new ConfigurationBuilder().Build();
        return new UrlPreviewService(new FakeHttpClientFactory(handler ?? new CapturingHttpMessageHandler("{}")), configuration);
    }

    private static JsonDocument ToJsonDocument(object value)
    {
        return JsonDocument.Parse(JsonSerializer.Serialize(value));
    }

    private sealed class FakeHttpClientFactory : IHttpClientFactory
    {
        private readonly HttpMessageHandler _handler;

        public FakeHttpClientFactory(HttpMessageHandler handler)
        {
            _handler = handler;
        }

        public HttpClient CreateClient(string name)
        {
            return new HttpClient(_handler);
        }
    }

    private sealed class CapturingHttpMessageHandler : HttpMessageHandler
    {
        private readonly string _responseContent;

        public CapturingHttpMessageHandler(string responseContent)
        {
            _responseContent = responseContent;
        }

        public Uri? RequestUri { get; private set; }

        protected override Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            RequestUri = request.RequestUri;

            return Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(_responseContent)
            });
        }
    }
}
