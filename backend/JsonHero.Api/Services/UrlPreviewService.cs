using System.Text.Json;

namespace JsonHero.Api.Services;

public class UrlPreviewService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public UrlPreviewService(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    public async Task<object> GetPreviewAsync(string url)
    {
        var rewrittenUrl = RewriteIpfsUrl(url);

        if (rewrittenUrl.Contains("theonion.com", StringComparison.OrdinalIgnoreCase))
        {
            return new
            {
                title = "The Onion",
                description = "America's Finest News Source",
                url = rewrittenUrl,
                image = (string?)null
            };
        }

        if (TryGetYouTubeId(rewrittenUrl, out var videoId))
        {
            return new
            {
                title = "YouTube",
                description = "YouTube video",
                url = rewrittenUrl,
                image = $"https://i.ytimg.com/vi/{videoId}/hqdefault.jpg"
            };
        }

        var apiKey = _configuration["OPENGRAPH_NINJA_API_KEY"]
            ?? _configuration["OpenGraphNinja:ApiKey"];

        var requestUrl = "https://opengraph.ninja/api/v1?url=" + Uri.EscapeDataString(rewrittenUrl);
        using var request = new HttpRequestMessage(HttpMethod.Get, requestUrl);

        if (!string.IsNullOrWhiteSpace(apiKey))
        {
            request.Headers.Add("X-Api-Key", apiKey);
        }

        using var client = _httpClientFactory.CreateClient();
        using var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        using var document = JsonDocument.Parse(json);

        return JsonSerializer.Deserialize<object>(document.RootElement.GetRawText())
            ?? new { url = rewrittenUrl };
    }

    private static string RewriteIpfsUrl(string url)
    {
        if (url.StartsWith("ipfs://", StringComparison.OrdinalIgnoreCase))
        {
            return "https://ipfs.io/ipfs/" + url["ipfs://".Length..];
        }

        return url;
    }

    private static bool TryGetYouTubeId(string url, out string videoId)
    {
        videoId = string.Empty;

        if (!Uri.TryCreate(url, UriKind.Absolute, out var uri))
        {
            return false;
        }

        if (uri.Host.Equals("youtu.be", StringComparison.OrdinalIgnoreCase))
        {
            videoId = uri.AbsolutePath.Trim('/');
            return !string.IsNullOrWhiteSpace(videoId);
        }

        if (!uri.Host.Contains("youtube.com", StringComparison.OrdinalIgnoreCase))
        {
            return false;
        }

        var query = Microsoft.AspNetCore.WebUtilities.QueryHelpers.ParseQuery(uri.Query);
        if (query.TryGetValue("v", out var values) && !string.IsNullOrWhiteSpace(values.FirstOrDefault()))
        {
            videoId = values.First()!;
            return true;
        }

        return false;
    }
}
