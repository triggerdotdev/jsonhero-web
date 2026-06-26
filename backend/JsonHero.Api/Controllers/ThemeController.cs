using Microsoft.AspNetCore.Mvc;

namespace JsonHero.Api.Controllers;

[ApiController]
public class ThemeController : ControllerBase
{
    [HttpPost("api/theme")]
    public IActionResult SetTheme([FromBody] ThemeRequest request)
    {
        if (request.Theme is not ("dark" or "light"))
        {
            return BadRequest(new { error = "Theme must be dark or light." });
        }

        Response.Cookies.Append(
            "theme",
            request.Theme,
            new CookieOptions
            {
                HttpOnly = false,
                IsEssential = true,
                SameSite = SameSiteMode.Lax,
                Expires = DateTimeOffset.UtcNow.AddYears(1)
            });

        return NoContent();
    }
}

public class ThemeRequest
{
    public string Theme { get; set; } = "light";
}
