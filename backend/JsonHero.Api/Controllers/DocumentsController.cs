using JsonHero.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace JsonHero.Api.Controllers;

[ApiController]
[Route("api")]
public class DocumentsController : ControllerBase
{
    private readonly DocumentService _documentService;
    private readonly UrlPreviewService _urlPreviewService;

    public DocumentsController(DocumentService documentService, UrlPreviewService urlPreviewService)
    {
        _documentService = documentService;
        _urlPreviewService = urlPreviewService;
    }

    [HttpGet("create.json")]
    public async Task<IActionResult> CreateFromGet(
        [FromQuery] string? url,
        [FromQuery(Name = "j")] string? json,
        [FromQuery] string? title,
        [FromQuery] DateTime? ttl,
        [FromQuery] bool readOnly = false)
    {
        if (!string.IsNullOrWhiteSpace(url))
        {
            var documentFromUrl = await _documentService.CreateFromUrlAsync(url, title, ttl, readOnly);
            return Ok(ToResponse(documentFromUrl));
        }

        if (!string.IsNullOrWhiteSpace(json))
        {
            var documentFromJson = await _documentService.CreateFromRawJsonAsync(json, title, ttl, readOnly);
            return Ok(ToResponse(documentFromJson));
        }

        return BadRequest(new { error = "Provide either url or j." });
    }

    [HttpPost("create.json")]
    public async Task<IActionResult> CreateFromPost([FromBody] CreateDocumentRequest request)
    {
        if (!string.IsNullOrWhiteSpace(request.Url))
        {
            var documentFromUrl = await _documentService.CreateFromUrlAsync(
                request.Url,
                request.Title,
                request.Ttl,
                request.ReadOnly);

            return Ok(ToResponse(documentFromUrl));
        }

        if (!string.IsNullOrWhiteSpace(request.Json))
        {
            var documentFromJson = await _documentService.CreateFromRawJsonAsync(
                request.Json,
                request.Title,
                request.Ttl,
                request.ReadOnly);

            return Ok(ToResponse(documentFromJson));
        }

        return BadRequest(new { error = "Provide either url or json." });
    }

    [HttpGet("documents/{id}")]
    public async Task<IActionResult> GetDocument(string id)
    {
        var document = await _documentService.GetDocumentAsync(id);
        return document == null ? NotFound() : Ok(ToResponse(document));
    }

    [HttpPut("documents/{id}")]
    public async Task<IActionResult> UpdateDocument(string id, [FromBody] UpdateDocumentRequest request)
    {
        var document = await _documentService.UpdateDocumentAsync(id, request.Title);
        return document == null ? NotFound() : Ok(ToResponse(document));
    }

    [HttpDelete("documents/{id}")]
    public async Task<IActionResult> DeleteDocument(string id)
    {
        var deleted = await _documentService.DeleteDocumentAsync(id);
        return deleted ? NoContent() : NotFound();
    }

    [HttpGet("preview")]
    public async Task<IActionResult> GetPreview([FromQuery] string url)
    {
        if (string.IsNullOrWhiteSpace(url))
        {
            return BadRequest(new { error = "url is required." });
        }

        var preview = await _urlPreviewService.GetPreviewAsync(url);
        return Ok(preview);
    }

    [HttpGet("/j/{id}.json")]
    public async Task<IActionResult> GetDocumentJson(string id)
    {
        var document = await _documentService.GetDocumentAsync(id);
        if (document == null)
        {
            return NotFound();
        }

        return Content(document.Contents, "application/json");
    }

    private static object ToResponse(Data.JsonDocument document)
    {
        return new
        {
            document.Id,
            document.Title,
            document.Type,
            document.Url,
            document.Contents,
            document.ReadOnly,
            document.Ttl,
            document.CreatedAt,
            document.UpdatedAt,
            JsonUrl = $"/j/{document.Id}.json"
        };
    }
}

public class CreateDocumentRequest
{
    public string? Json { get; set; }

    public string? Url { get; set; }

    public string? Title { get; set; }

    public DateTime? Ttl { get; set; }

    public bool ReadOnly { get; set; }
}

public class UpdateDocumentRequest
{
    public string? Title { get; set; }
}
