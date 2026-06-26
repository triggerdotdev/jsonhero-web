using Microsoft.EntityFrameworkCore;

namespace JsonHero.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<JsonDocument> Documents => Set<JsonDocument>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<JsonDocument>(entity =>
        {
            entity.HasKey(document => document.Id);
            entity.Property(document => document.Id).HasMaxLength(12);
            entity.Property(document => document.Title).IsRequired();
            entity.Property(document => document.Type).IsRequired();
            entity.Property(document => document.Contents).IsRequired();
        });
    }

    public IQueryable<JsonDocument> GetActiveDocuments()
    {
        var now = DateTime.UtcNow;
        return Documents.Where(document => document.Ttl == null || document.Ttl > now);
    }
}
