# JSON Hero ASP.NET Core Migration Feasibility Report

## Executive Summary

Migrating this repository from Remix on Cloudflare Workers to ASP.NET Core 8 is feasible, but the work divides into two very different parts:

1. Backend migration is medium effort. The server-side surface is small: document create/read/update/delete, URL ingest, URL preview, GitHub star count, theme/toast cookies, and one public create API.
2. Full frontend rewrite is large to extra-large effort. The JSON viewer experience is implemented as a rich React application with custom client-side state, keyboard navigation, CodeMirror integration, web-worker search, schema/type inference, virtualization, Radix popovers/dialogs, and Tailwind styling.

Recommended approach: migrate the backend to ASP.NET Core 8 first while keeping the React viewer. Treat Razor Pages, MVC views, or Blazor as later options only after the data and route compatibility layer is stable.

## 1. Current Architecture Summary

### Tech Stack

Runtime and framework:

- Remix 1.2.3 with file-based routes under `app/routes`.
- React 17 for all UI components and client state.
- Cloudflare Workers target via `@remix-run/cloudflare-workers`.
- Cloudflare KV binding named `DOCUMENTS` for JSON document persistence.
- Cloudflare Worker service-worker wrapper in `worker/index.js`.
- Static assets served from Cloudflare Workers Sites using `public`.
- Web Worker search bundle generated from `app/entry.worker.ts` into `public/entry.worker.js`.

Styling and UI:

- Tailwind CSS 3, configured in `tailwind.config.js`.
- Tailwind source `styles/tailwind.css`, built into `app/tailwind.css`.
- Radix UI primitives for popover, dialog, tabs, and toast.
- Heroicons and custom SVG icon components.
- Framer Motion for animated theme icons and tooltip behavior.

JSON-specific frontend logic:

- `@jsonhero/json-infer-types` for value/type/format inference.
- `@jsonhero/schema-infer` and `@jsonhero/json-schema-fns` for inferred JSON Schema.
- `@jsonhero/path` for JSON path addressing and path navigation.
- `@jsonhero/fuzzy-json-search` for client-side fuzzy search.
- `json-source-map` for mapping JSON editor positions to JSON pointer paths.
- CodeMirror 6 via `@uiw/react-codemirror`.

Server-side integrations:

- Cloudflare KV through global `DOCUMENTS` declared in `app/bindings.d.ts`.
- `SESSION_SECRET` for Remix cookie session signing.
- `APIHERO_PROJECT_KEY` for optional `@apihero/fetch` proxy in `app/services/apihero.server.ts`.
- OpenGraph Ninja through `app/services/uriPreview.server.ts`.
- GitHub REST API for star count in `app/services/github.server.ts`.
- Fathom analytics dependency exists, but `app/entry.client.tsx` currently comments it out.
- `graphJSON.server.ts` is currently a no-op; `GRAPH_JSON_API_KEY` and `GRAPH_JSON_COLLECTION` remain in bindings and Wrangler config but are not active in this checkout.

Build and deployment:

- `remix.config.js` sets `serverBuildTarget: "cloudflare-workers"`.
- `wrangler.toml` defines the Worker service, KV namespaces, variables, and production route.
- `package.json` scripts build CSS, Remix server/client assets, the Worker wrapper, and the search worker.
- GitHub Actions in `.github/workflows/main.yml` runs `npm ci`, `npm test`, `npm run build`, and deploys via `cloudflare/wrangler-action`.
- `Dockerfile` is a Node build image that still runs `npm start`; it is not a production ASP.NET or self-contained server image.

### Application Entry Points

| Current file | Responsibility | ASP.NET Core implication |
| --- | --- | --- |
| `app/root.tsx` | HTML shell, meta tags, stylesheet links, root loader for theme and GitHub star count, providers | Replace with `_Layout.cshtml` plus either React hydration root or Razor layout. Root loader becomes middleware/service calls. |
| `app/entry.server.tsx` | Remix SSR render using `renderToString(<RemixServer />)` | Replace with ASP.NET Core MVC/Razor rendering, or remove if React becomes a client SPA. |
| `app/entry.client.tsx` | Hydrates Remix browser app; analytics commented out | Replace with Vite/React entry or Blazor/Razor scripts. |
| `worker/index.js` | Cloudflare fetch event handler wrapping Remix build | Removed. Replaced by `Program.cs`, Kestrel, middleware pipeline, controllers/pages. |
| `app/entry.worker.ts` | Browser Web Worker for fuzzy JSON search | Keep as TypeScript asset in hybrid migration, or rewrite search in C#/WASM/server if leaving React. |

### Route Surface

Primary pages:

| Remix route file | URL shape | Current behavior |
| --- | --- | --- |
| `app/routes/index.tsx` | `/` | Marketing/home page with new-document form and toast flash message. |
| `app/routes/privacy.mdx` | `/privacy` | Static MDX privacy page using home header. |
| `app/routes/new.tsx` | `/new?url=...` or `/new?j=...` | Loader creates a document from a URL or base64 JSON and redirects to `/j/{id}`. Supports `ttl`, `readonly`, `title`, and misspelled `injest`. |
| `app/routes/j/$id.tsx` | `/j/{id}` shell | Parent loader retrieves document, fetches/parses JSON, provides layout and context providers, supports `path` and `minimal` query parameters, handles DELETE. |
| `app/routes/j/$id/index.tsx` | `/j/{id}` | Column view. |
| `app/routes/j/$id/tree.tsx` | `/j/{id}/tree` | Tree view. |
| `app/routes/j/$id/editor.tsx` | `/j/{id}/editor` | Read-only JSON editor view. |
| `app/routes/j/$id/terminal.tsx` | `/j/{id}/terminal` | Placeholder page. |
| `app/routes/j/$id[.json].ts` | `/j/{id}.json` | Returns raw JSON for document download/API use. |

Action/API routes:

| Remix route file | URL shape | Current behavior |
| --- | --- | --- |
| `app/routes/actions/createFromUrl.ts` | `/actions/createFromUrl` | POST or GET creates document from URL, raw JSON, or XML text, then redirects. |
| `app/routes/actions/createFromFile.ts` | `/actions/createFromFile` | POST creates raw document from uploaded form fields. |
| `app/routes/actions/$id/update.ts` | `/actions/{id}/update` | POST updates document title. |
| `app/routes/actions/setTheme.ts` | `/actions/setTheme` | POST persists theme cookie. |
| `app/routes/actions/getPreview.$url.ts` | `/actions/getPreview/{url}` | GET returns cached JSON preview metadata for URLs. |
| `app/routes/api/create[.json].ts` | `/api/create.json` | POST creates raw JSON document from JSON body. OPTIONS supports CORS preflight. |

### Component Tree

At the highest level:

- `app/root.tsx`
  - `ThemeProvider`
  - `PreferencesProvider`
  - `StarCountProvider`
  - route outlet

Home page:

- `app/routes/index.tsx`
  - `HomeHeader`
  - `HomeHeroSection`
  - `HomeInfoBoxSection`
  - `HomeEdgeCasesSection`
  - `HomeSearchSection`
  - `HomeCollaborateSection`
  - `HomeFeatureGridSection`
  - `HomeFooter`
  - `ToastPopover` if a flash message exists

Document viewer page:

- `app/routes/j/$id.tsx`
  - `JsonDocProvider`
  - `JsonProvider`
  - `JsonSchemaProvider`
  - `JsonColumnViewProvider`
  - `JsonSearchProvider`
  - `JsonTreeViewProvider`
  - `Header`
    - `Logo`
    - `DocumentTitle`
    - delete form
    - `NewDocument`
    - `Share`
    - GitHub/social links
  - `SideBar`
    - links to column/editor/tree/download
  - `JsonView`
    - `PathHistoryControls`
    - `PathBar`
    - `SearchBar`
    - child view outlet:
      - `JsonColumnView`
      - `JsonTreeView`
      - `JsonEditor`
      - `TerminalViewPage`
  - `Resizable`
    - `InfoPanel`
      - `InfoHeader`
      - `PreviewValue`
      - `PropertiesValue`
      - `ContainerInfo`
      - `RelatedValues`
  - `Footer`
    - keyboard hints
    - `ThemeModeToggle`
    - `IndentPreference`
    - `GithubStarSmall`

Major client state providers:

- `JsonDocProvider` stores document metadata, initial path, and minimal mode.
- `JsonProvider` stores stabilized parsed JSON.
- `JsonColumnViewProvider` stores selected/highlighted JSON path and column navigation state.
- `JsonSchemaProvider` derives JSON Schema from current JSON.
- `JsonSearchProvider` owns a Web Worker and exposes async search state.
- `JsonTreeViewProvider` derives virtual tree state.
- `ThemeProvider` owns dark/light mode and persists via `/actions/setTheme`.
- `PreferencesProvider` stores formatting preferences in `localStorage`.
- `StarCountProvider` supplies the GitHub star count fetched on root loader.

### Data Flow

Document creation:

1. User submits a URL/raw JSON from `UrlForm`, drops a file through `DragAndDropForm`, calls `/new`, or posts to `/api/create.json`.
2. Route action/loader calls `createFromUrl`, `createFromUrlOrRawJson`, or `createFromRawJson` in `app/jsonDoc.server.ts`.
3. `jsonDoc.server.ts` validates raw JSON with `JSON.parse`, optionally converts XML through `utilities/xml`, generates a 12-character ID with `nanoid`, and stores serialized `JSONDocument` in Cloudflare KV.
4. Browser is redirected to `/j/{id}` or receives `{ id, title, location }`.

Document viewing:

1. `/j/{id}` parent loader calls `getDocument(id)`.
2. If the stored document is `type: "raw"`, loader parses `doc.contents`.
3. If the stored document is `type: "url"`, loader fetches `doc.url` using `safeFetch` and random user agent, then parses response JSON.
4. Loader returns `{ doc, json, path, minimal }`.
5. React providers derive column/tree/search/schema state entirely client-side.

Document updates/deletes:

- `DocumentTitle` posts title changes to `/actions/{id}/update`; server calls `updateDocument`.
- Header delete form submits DELETE to parent `/j/{id}` action; server calls `deleteDocument` unless `readOnly`.
- `readOnly` prevents title editing and deletion, but does not restrict raw JSON download.

Preview flow:

1. `PreviewUri` detects string URLs and calls `/actions/getPreview/{encodedUri}` with Remix `useFetcher`.
2. `uriPreview.server.ts` rewrites `ipfs:` and `git:` URLs.
3. Server performs HEAD/GET detection.
4. Image URLs return image preview metadata.
5. JSON URLs are fetched and returned as JSON preview.
6. Other URLs go through OpenGraph Ninja via `fetchProxy`, which is either `@apihero/fetch` or direct `fetch`.

Search flow:

1. `JsonSearchProvider` starts `new Worker("/entry.worker.js")`.
2. Worker builds `JSONHeroSearch` index from the parsed JSON.
3. `SearchPalette` sends queries and receives matches.
4. Search result navigation feeds selected paths back into `JsonColumnViewProvider`.

### External Dependencies and Replacement Notes

| Current dependency | Current use | ASP.NET Core replacement or strategy |
| --- | --- | --- |
| `@remix-run/*`, `remix` | SSR, routing, forms, loaders/actions, sessions | ASP.NET Core MVC/Razor Pages/controllers, endpoint routing, `TempData`, cookies, model binding. |
| Cloudflare Workers runtime | Edge runtime and fetch event handler | Kestrel + ASP.NET Core middleware. |
| Cloudflare KV `DOCUMENTS` | Document key/value persistence with TTL metadata | EF Core repository over PostgreSQL/SQL Server/SQLite plus `ExpiresAtUtc`; optional Redis for cache. |
| `@apihero/fetch` | Optional outbound fetch proxy for OpenGraph Ninja | `IHttpClientFactory` typed clients, proxy handler, or external API client abstraction. |
| `fathom-client` | Dependency present, client import commented out | ASP.NET Core analytics middleware/server-side event collector, Plausible/Fathom script in layout, or remove. |
| `react-use-intercom` | Dependency present; no active usage found | Remove or replace with script in layout if needed. |
| `@jsonhero/*` packages | Core JSON viewer behavior | Keep if retaining React. Rewrite or wrap if moving to Razor/Blazor. |
| `@uiw/react-codemirror`, CodeMirror | JSON/editor previews | Keep in React. Blazor/Razor would still use JS interop or a JS editor. |
| `react-virtual` | Large tree rendering | Keep in React. Blazor equivalent requires virtualization rewrite. |
| `react-hotkeys-hook` | Keyboard navigation | Keep in React. Razor/Blazor rewrite needs custom JS or Blazor event handling. |
| `react-dropzone` | File drop form | Keep in React or replace with HTML file input/drop JS. |
| Radix UI | Dialog/popover/tabs/toast primitives | Keep in React or replace with Bootstrap, custom Razor components, or Blazor components. |
| `@xmldom/xmldom` | XML-to-JSON conversion on server | `System.Xml.Linq`, `XmlReader`, or `XmlDocument` in C#. |
| `nanoid` | 12-character document ID | `Nanoid` NuGet package, custom random ID generator, or `Guid`/ULID with compatibility alias. |
| `jwt-decode` | Installed; no active usage found in scanned files | Remove unless future JWT preview depends on it; in C# use `System.IdentityModel.Tokens.Jwt`. |
| `lodash-es`, `ts-pattern`, `clsx`, `color` | Client utilities | Keep in React; rewrite helpers in C# only if moving logic server-side. |

## 2. ASP.NET Core Target Architecture

### Recommended Target: ASP.NET Core 8 Hybrid React Application

The lowest-risk target is ASP.NET Core 8 for server-side routes and persistence, with the existing React viewer rebuilt as a client bundle. This preserves the most valuable and complex code: column view, tree view, editor view, previews, keyboard shortcuts, local storage, search worker, and JSON inference.

Proposed solution structure:

```text
src/
  JsonHero.Web/
    Program.cs
    appsettings.json
    Controllers/
      DocumentsController.cs
      ActionsController.cs
      ApiCreateController.cs
      PreviewController.cs
      HomeController.cs
    Pages/ or Views/
      Shared/_Layout.cshtml
      Home/Index.cshtml
      Privacy.cshtml
      Json/Viewer.cshtml
    ClientApp/
      package.json
      src/
        main.tsx
        viewer/
        components/
        hooks/
        utilities/
      public/
    wwwroot/
      assets/
      fonts/
      preview-fixtures/
  JsonHero.Application/
    Documents/
    Preview/
    Analytics/
  JsonHero.Infrastructure/
    Data/
    External/
    Storage/
  JsonHero.Tests/
```

ASP.NET Core components:

- MVC controllers or minimal APIs for the current Remix action/API endpoints.
- Razor Pages or MVC views for SSR shells: home page, privacy page, viewer host page.
- EF Core 8 for document metadata and JSON payload persistence.
- `IHttpClientFactory` typed clients for GitHub, OpenGraph Ninja, JSON URL ingest, and preview HEAD/GET requests.
- `IDocumentRepository` abstraction replacing direct `DOCUMENTS` usage.
- `IBackgroundTaskQueue` or hosted service replacing Cloudflare `context.waitUntil` for analytics/events.
- `IMemoryCache` or `IDistributedCache` for GitHub star count and preview result caching.
- Cookie authentication/session services for theme and toast-like flash messages.
- Static file middleware for `wwwroot`, generated React assets, fonts, preview fixtures, and video assets.
- CORS policy for `/api/create.json`.

SignalR:

- Not required for parity. The current app has no real-time collaboration, no live document updates, and no server push.
- Use SignalR only if adding future collaborative editing, shared cursors, document change notifications, or long-running URL ingest progress.

### Alternative Target: Full ASP.NET Core MVC/Razor Pages Rewrite

This is feasible for simple pages and form flows, but not recommended as the first migration. The JSON viewer is interaction-heavy and would require rewriting most of the product in C# views plus JavaScript islands.

Best fit:

- Home page, privacy page, create forms, static layouts.
- Server-rendered document metadata and initial JSON payload.

Poor fit:

- Column navigation state machine.
- Virtualized tree.
- CodeMirror editor integration.
- Fuzzy search worker.
- Path-aware selection synchronization.
- Rich previews and keyboard shortcuts.

### Alternative Target: Blazor

Blazor Server or Blazor WebAssembly could replace React, but the migration cost is high:

- Blazor Server introduces persistent SignalR connections for every active viewer and can be expensive for large public traffic.
- Blazor WebAssembly increases download size and still needs JS interop for CodeMirror, clipboard, media, drag/drop, and possibly web workers.
- Existing `@jsonhero/*` packages would need C# equivalents or JS interop wrappers.

Blazor is only recommended if the long-term product direction explicitly wants a .NET frontend and accepts a larger rewrite.

### Proposed ASP.NET Core Domain Model

```csharp
public sealed class JsonDocument
{
    public string Id { get; set; } = default!;
    public string Title { get; set; } = default!;
    public JsonDocumentType Type { get; set; }
    public bool ReadOnly { get; set; }
    public string? Contents { get; set; }
    public string? Url { get; set; }
    public DateTimeOffset CreatedAtUtc { get; set; }
    public DateTimeOffset UpdatedAtUtc { get; set; }
    public DateTimeOffset? ExpiresAtUtc { get; set; }
    public string? MetadataJson { get; set; }
}

public enum JsonDocumentType
{
    Raw = 0,
    Url = 1
}
```

Core services:

- `IDocumentService`
  - `CreateFromRawJsonAsync`
  - `CreateFromUrlAsync`
  - `CreateFromUrlOrRawJsonAsync`
  - `GetAsync`
  - `UpdateTitleAsync`
  - `DeleteAsync`
  - `ResolveJsonAsync`
- `IDocumentRepository`
  - EF-backed persistence and TTL filtering.
- `IUrlPreviewService`
  - Equivalent to `uriPreview.server.ts`.
- `IExternalJsonFetchService`
  - Equivalent to `safeFetch`.
- `IGitHubService`
  - Equivalent to `github.server.ts`.
- `IEventSink`
  - Replacement for `sendEvent`, initially no-op.
- `IXmlJsonConverter`
  - Equivalent to `utilities/xml`.

## 3. Component Mapping

### Route and Server Module Mapping

| Current file | ASP.NET Core equivalent | Breaking changes and notes | Effort |
| --- | --- | --- | --- |
| `app/root.tsx` | `_Layout.cshtml`, `HomeController`, root view model, static asset manifest helper | Remix root loader disappears. Theme/star count must be loaded by controller/view component or client API. Meta generation needs MVC/Razor equivalents. | M |
| `app/entry.server.tsx` | MVC/Razor rendering or removed in SPA mode | Remix SSR is not portable to ASP.NET without a Node SSR sidecar. Hybrid SPA should drop Remix SSR. | M |
| `app/entry.client.tsx` | `ClientApp/src/main.tsx` rendered into a Razor host element | `RemixBrowser` and Remix data APIs are removed. Need React Router or plain route props from host page. | M |
| `worker/index.js` | `Program.cs` | Cloudflare `fetch` event and `getLoadContext.waitUntil` replaced by middleware, DI, hosted services. | S |
| `app/jsonDoc.server.ts` | `DocumentService.cs`, `DocumentRepository.cs`, EF entity | KV operations become EF queries. TTL becomes `ExpiresAtUtc` plus cleanup. URL ingest typo `injest` should either be preserved for compatibility or aliased to `ingest`. | M |
| `app/theme.server.ts` | `ThemeCookieService.cs` or controller helper | Remix cookie session format changes; existing cookies will not decode unless compatibility is implemented. | S |
| `app/services/toast.server.ts` | ASP.NET Core `TempData`, signed cookie, or session | Remix flash cookie format changes. Existing pending toast messages are disposable. | S |
| `app/graphJSON.server.ts` | `IEventSink` no-op or analytics provider | Current implementation returns immediately. If production had older Graph JSON behavior, recreate with background queue and EF/event table. | S-M |
| `app/services/apihero.server.ts` | `IHttpClientFactory` typed client or delegating handler | `@apihero/fetch` is Cloudflare/JS-specific. Need direct `HttpClient` or proxy provider. | S |
| `app/services/uriPreview.server.ts` | `UrlPreviewService.cs` and `PreviewController.cs` | HEAD/GET redirect logic, IPFS/git rewrites, OpenGraph Ninja response mapping need porting. Cache headers become ResponseCache/headers. | M |
| `app/services/github.server.ts` | `GitHubClient.cs` using `HttpClient` and cache | Cloudflare `cf.cacheEverything` option removed. Use `IMemoryCache`/Redis and User-Agent header. | S |
| `app/routes/index.tsx` | `HomeController.Index` + Razor host or React route | If keeping React, home components can stay. If Razor rewrite, all home components and video/asset imports need conversion. | M-L |
| `app/routes/privacy.mdx` | `Pages/Privacy.cshtml`, Markdown pipeline, or static HTML | MDX is not native to ASP.NET. Convert to Razor/HTML/Markdown at build time. | S-M |
| `app/routes/new.tsx` | `DocumentsController.New` GET endpoint | Must preserve query contract: `url`, `j`, `ttl`, `readonly`, `title`, `injest`. `atob` replaced by `Convert.FromBase64String`. | S-M |
| `app/routes/j/$id.tsx` | `DocumentsController.Viewer(id)` + `Viewer.cshtml` or React route | Parent loader data must become JSON embedded in host page or fetched via `/api/documents/{id}`. Error boundary becomes ASP.NET exception/status handling. | M |
| `app/routes/j/$id/index.tsx` | React Router child route or MVC route `/j/{id}` | If React kept, component mostly unchanged. If Razor/Blazor, rewrite. | S in hybrid, L in rewrite |
| `app/routes/j/$id/tree.tsx` | React Router child route or MVC route `/j/{id}/tree` | Same as above. | S/L |
| `app/routes/j/$id/editor.tsx` | React Router child route or MVC route `/j/{id}/editor` | CodeMirror integration stays only in React/JS. | S/XL |
| `app/routes/j/$id/terminal.tsx` | Placeholder view/component | Low risk. | S |
| `app/routes/j/$id[.json].ts` | `GET /j/{id}.json` endpoint | Return resolved JSON with `application/json`; for URL docs fetch upstream. Need request timeout/size limits. | S |
| `app/routes/actions/createFromUrl.ts` | `POST /actions/createFromUrl`, `GET /actions/createFromUrl` | Model binding replaces Remix form parsing. Redirect behavior preserved. | S-M |
| `app/routes/actions/createFromFile.ts` | `POST /actions/createFromFile` | Current form posts hidden `filename` and `rawJson`, not multipart file. Preserve or improve to `IFormFile`. | S-M |
| `app/routes/actions/$id/update.ts` | `POST /actions/{id}/update` | Return JSON document DTO. Must reject updates to read-only docs if stricter parity desired; current code does not check read-only here, but UI hides editing. | S |
| `app/routes/actions/setTheme.ts` | `POST /actions/setTheme` | Return JSON `{ success: true }` and set signed cookie. | S |
| `app/routes/actions/getPreview.$url.ts` | `GET /actions/getPreview/{*url}` or query endpoint | ASP.NET route constraints need catch-all or use `?url=` to avoid encoded slash issues. Preserve fixture short-circuits. | M |
| `app/routes/api/create[.json].ts` | `POST /api/create.json`, `OPTIONS /api/create.json` | CORS policy, JSON model validation, TTL validation. Preserve response shape. | S |

### React Component Mapping in Hybrid Mode

In hybrid mode, most components move mechanically from `app/components` to `ClientApp/src/components` and are adjusted to remove Remix imports.

| Current group | Keep/rewrite strategy | Required changes |
| --- | --- | --- |
| `app/components/Home/*` | Keep React or convert later to Razor | Replace Remix `Link` with React Router `Link` or anchor. Replace asset imports with Vite/static asset imports. |
| `Header`, `Footer`, `SideBar`, `Share` | Keep React | Replace `Form`, `Link`, `useNavigate`, `useLocation` imports from `remix` with React Router equivalents or native forms. |
| `NewDocument`, `NewFile`, `UrlForm`, `DragAndDropForm`, `SampleUrls` | Keep React | Replace Remix `Form`, `useSubmit`, `useTransition` with native form submit, `fetch`, or React Router form APIs. |
| `DocumentTitle` | Keep React | Replace Remix `useFetcher` with `fetch("/actions/{id}/update")` or React Query mutation. |
| `JsonView`, `JsonColumnView`, `Columns`, `Column`, `ColumnItem`, `BlankColumn` | Keep React | No server dependency. Mostly import-path changes. |
| `JsonTreeView`, `useVirtualTree` | Keep React | No server dependency. Keep `react-virtual`, or upgrade to `@tanstack/react-virtual` during modernization. |
| `JsonEditor`, `CodeEditor`, `CodeViewer`, `JsonPreview` | Keep React | CodeMirror stays in JS. Asset/bundle changes only. |
| `InfoPanel`, `InfoHeader`, `Properties/*`, `Preview/*`, `RelatedValues`, `ContainerInfo` | Keep React | `PreviewUri` must replace Remix `useFetcher` with `fetch` or query library. |
| `SearchBar`, `SearchPalette`, `entry.worker.ts` | Keep React/worker | Build worker with Vite worker support; path likely changes from `/entry.worker.js` to an emitted asset URL. |
| `UI/*` Radix wrappers | Keep React | No server dependency. Tailwind content paths must include new location. |
| `ThemeProvider`, `ThemeModeToggle` | Keep React | Replace Remix `useFetcher.submit` with `fetch("/actions/setTheme")`; keep cookie behavior. |
| `PreferencesProvider`, `IndentPreference` | Keep React | Uses `localStorage`; no server change. |
| `Primitives/*`, `Icons/*`, `ValueIcon` | Keep React | Import-path changes only. |

### Hooks and Utility Mapping

| Current file/group | ASP.NET Core equivalent | Breaking changes |
| --- | --- | --- |
| `app/hooks/useJsonDoc.tsx` | React context in hybrid; DTO from ASP.NET | `JSONDocument` type should move to shared TS client model. |
| `app/hooks/useJson.tsx` | React context in hybrid | None if React stays. |
| `app/hooks/useJsonColumnView.tsx` and `app/useColumnView/index.ts` | React state machine in hybrid | Full Razor/Blazor rewrite would be high risk due to navigation semantics. |
| `app/hooks/useJsonSearch.tsx` | React context plus Web Worker | Worker build and URL change. Server-side search is not needed for parity. |
| `app/hooks/useJsonTree.tsx`, `useVirtualTree.ts` | React state and virtualization | Keep in React; Blazor rewrite requires different virtualization model. |
| `app/hooks/useJsonSchema.tsx` | Keep in React or rewrite with NJsonSchema/JsonSchema.Net | If rewritten server-side, schema output may differ from `@jsonhero/schema-infer`. |
| `app/hooks/useSelectedInfo.tsx`, `useRelatedPaths.ts` | Keep in React | Depends on `@jsonhero/path` and inference packages. |
| `app/utilities/jsonColumnView.ts`, `relatedValues.ts`, `search.ts`, `stableJson.ts`, `formatter.ts`, `inferredTemporal.ts` | Keep in React for hybrid | Existing Jest tests cover some of this logic. C# rewrite risks behavior drift. |
| `app/utilities/xml/*` | C# `XmlJsonConverter` if server handles XML | XML serialization shape must match current `$attributes`/`$values` convention. |
| `app/utilities/safeFetch.ts` | `HttpClient` with default User-Agent | Cloudflare `fetch` behavior changes; need timeout and max response size. |
| `app/utilities/getRandomUserAgent.ts` | C# service/helper or remove | Only used when resolving URL-backed documents. |

### Breaking Changes to Plan For

- Remix loader/action data model goes away. React components that depend on `useLoaderData`, `useFetcher`, `useSubmit`, `useTransition`, `Form`, `Link`, `useNavigate`, or `useLocation` need adaptation.
- Existing Remix cookie session values for theme and toast will not be readable by ASP.NET Core unless a compatibility decoder is implemented.
- Cloudflare KV TTL is automatic. SQL TTL requires `ExpiresAtUtc` filters and cleanup job.
- Cloudflare KV metadata is not retrieved by current `getDocument`, but create APIs accept metadata. Decide whether to persist it in SQL for future compatibility.
- Cloudflare Workers `context.waitUntil` does not exist. Background analytics/event tasks need queues or hosted services.
- Cloudflare `cf.cacheEverything` fetch options do not exist. Use ASP.NET caching.
- Worker deployment had edge latency. Linux/Azure deployment centralizes traffic unless CDN is added.
- Route matching for `/actions/getPreview/{encodedUrl}` may break if encoded slashes are decoded by the server/proxy. Prefer `GET /actions/getPreview?url=...` while keeping the old path via catch-all.
- URL-backed documents are currently fetched on every view. In server deployment this can increase origin latency and expose SSRF risk; add allow/block rules, timeouts, and response-size limits.
- Current file upload limit in `DragAndDropForm` is 1 MB. ASP.NET request limits must match or intentionally change.
- The API route currently allows `Access-Control-Allow-Origin: *`. Recreate intentionally, not accidentally.

## 4. Storage Migration

### Current Storage Model

Cloudflare KV stores one serialized document per generated ID:

```json
{
  "id": "YKKduNySH7Ub",
  "type": "raw",
  "contents": "{\"foo\":\"bar\"}",
  "title": "test 123",
  "readOnly": false
}
```

or:

```json
{
  "id": "PjHo1o5MVeH4",
  "type": "url",
  "url": "https://api.github.com/...",
  "title": "https://api.github.com/...",
  "readOnly": false
}
```

Creation supports:

- `expirationTtl` for KV-level TTL.
- `metadata` passed to KV, although the current read path does not retrieve KV metadata.

### SQL Target Schema

Recommended relational table:

```sql
CREATE TABLE json_documents (
  id varchar(32) PRIMARY KEY,
  title text NOT NULL,
  document_type varchar(16) NOT NULL,
  read_only boolean NOT NULL DEFAULT false,
  contents text NULL,
  source_url text NULL,
  metadata_json text NULL,
  created_at_utc timestamptz NOT NULL,
  updated_at_utc timestamptz NOT NULL,
  expires_at_utc timestamptz NULL
);

CREATE INDEX ix_json_documents_expires_at_utc
  ON json_documents (expires_at_utc)
  WHERE expires_at_utc IS NOT NULL;
```

Provider-specific notes:

- PostgreSQL: best default. Use `text` for exact stored JSON string or `jsonb` if querying inside JSON becomes a requirement. For parity, `text` is safest because the app preserves formatting only indirectly and stores raw string content.
- SQL Server: use `nvarchar(max)` plus `ISJSON` check constraints where appropriate. SQL Server has JSON functions but not a native JSON column type equivalent to `jsonb`.
- SQLite: good for self-hosted/single-node installs. Store JSON in `TEXT`; use `ExpiresAtUtc` cleanup. Avoid for high-traffic shared production unless operational simplicity matters more than scale.

EF Core mapping:

- `JsonDocument.Id`: string key, generated by application service.
- `JsonDocument.Type`: enum converted to string or int.
- `JsonDocument.Contents`: raw JSON string for `raw` docs.
- `JsonDocument.Url`: source URL for `url` docs.
- `ExpiresAtUtc`: computed as `CreatedAtUtc + ttl`.
- Global query filter can exclude expired docs, but be careful with admin/export jobs.

TTL behavior:

- On create: `ExpiresAtUtc = ttl == null ? null : now + ttl`.
- On read/update/delete: treat expired documents as missing.
- Background cleanup: hosted service deletes expired rows every N minutes.
- For API compatibility, preserve the minimum TTL of 60 seconds.

### Cloudflare KV Export and Import

Migration options:

1. One-time export script using Wrangler KV APIs:
   - List keys from the `DOCUMENTS` namespace.
   - Fetch each value and metadata.
   - Write newline-delimited JSON.
   - Import into SQL through a .NET migration utility.
2. Dual-write during transition:
   - Keep Worker app writing KV and add ASP.NET write path only after cutover is ready.
   - Harder because the current app writes directly to global `DOCUMENTS`.
3. Cold cutover:
   - Put site in read-only/maintenance.
   - Export KV.
   - Import SQL.
   - Deploy ASP.NET.
   - Validate sample IDs.

Recommended: cold cutover for this codebase unless strict zero-downtime migration is required. Documents appear anonymous/shareable and the persistence model is simple.

### FaunaDB to EF Core

No active FaunaDB client or dependency is present in this checkout. `GRAPH_JSON_API_KEY` and `GRAPH_JSON_COLLECTION` exist in `app/bindings.d.ts` and Wrangler variables, but `app/graphJSON.server.ts` is currently a no-op.

If an older production deployment still writes Graph JSON/FaunaDB events, migrate that separately:

- Create `analytics_events` table with `Id`, `Type`, `DocumentId`, `PayloadJson`, `CreatedAtUtc`, `Source`, and optional `UserAgent`/`IpHash`.
- Replace `sendEvent(...)` with `IEventSink.EnqueueAsync(...)`.
- Implement a hosted background queue so request latency does not depend on analytics writes.
- If FaunaDB stored document records in a legacy branch, map each collection document to `JsonDocument` rows and preserve old IDs.

### File Storage Options

The current application does not persist uploaded files as files. It reads the dropped JSON file client-side, posts `filename` and `rawJson`, and stores the JSON string in KV.

ASP.NET options:

- Keep current behavior: store JSON content in database. Best parity and simplest.
- Object storage for large documents: store raw JSON in S3/Azure Blob/Cloudflare R2, store metadata and object key in SQL.
- Local filesystem: acceptable for single-node self-hosting, but not recommended for multi-node production.
- Hybrid: database for documents under 1-5 MB, object storage for larger payloads.

Recommended for parity:

- Database-only at first.
- Enforce the current 1 MB upload limit unless product requirements change.
- Add explicit server-side request size limits and JSON parsing limits.

## 5. Frontend Strategy

### Option A: Keep React, ASP.NET Core as Backend and Host

This is the recommended path.

How it works:

- Move React app into `ClientApp`.
- Build with Vite or equivalent.
- ASP.NET Core serves Razor host pages and static React bundles.
- Replace Remix routing/data APIs with:
  - React Router for client-side document subroutes.
  - `fetch`/React Query/SWR for actions and preview calls.
  - Server-embedded initial data for `/j/{id}` or an API call to `/api/documents/{id}`.
- Keep Tailwind, Radix, CodeMirror, JSONHero packages, and web worker search.

Advantages:

- Preserves most product behavior.
- Lowest behavioral regression risk.
- Allows backend migration to be tested independently.
- Existing TS utilities and tests can remain valuable.

Disadvantages:

- Not a pure .NET frontend.
- Need a modern frontend build pipeline inside ASP.NET deployment.
- Need to replace Remix conveniences manually.

Key frontend changes:

- `remix` imports:
  - `Link` to `react-router-dom` `Link` or `<a>`.
  - `Form` to native form or React Router form.
  - `useFetcher` to `fetch` helper or query/mutation library.
  - `useTransition` to local pending state.
  - `useSubmit` to `form.requestSubmit()` or `fetch`.
  - `useLoaderData` to host-injected data or query.
  - `Outlet` to React Router `Outlet`.
- Worker:
  - Replace `new Worker("/entry.worker.js")` with Vite worker asset import or stable public path.
- CSS:
  - Update `tailwind.config.js` `content` from `./app/**/*` to `./ClientApp/src/**/*` and Razor files if using Tailwind classes in views.
- Assets:
  - Move `app/assets` imports into `ClientApp/src/assets` or `wwwroot/assets`.

Estimated effort: L for full parity, because all Remix-specific data plumbing must be removed, but core UI behavior stays.

### Option B: Razor Pages/MVC Rewrite

How it works:

- Render home, privacy, and viewer pages with Razor.
- Implement document actions with forms/controllers.
- Add JavaScript modules for interactive viewer behavior.

Advantages:

- Simplifies server deployment to pure ASP.NET Core.
- Excellent for static/home/form pages.
- Strong server-side model binding and validation.

Disadvantages:

- High rewrite cost for viewer.
- CodeMirror, search, virtualization, keyboard shortcuts, drag/drop, and previews still need substantial JavaScript.
- Existing React component tree cannot be reused.
- Risk of losing polished interaction behavior.

Estimated effort: XL for full product parity.

### Option C: Blazor Rewrite

How it works:

- Rebuild component tree in Blazor Server or Blazor WebAssembly.
- Use C# services for document state and JSON model traversal.
- Use JS interop for CodeMirror, clipboard, media previews, drag/drop, and maybe web workers.

Advantages:

- Strong .NET component model.
- Shared C# DTOs and validation.
- SignalR can support future collaboration in Blazor Server.

Disadvantages:

- Rewrites almost every React component and hook.
- Existing `@jsonhero/*` behavior needs C# ports or JS interop.
- Blazor Server has connection/state scaling concerns for public anonymous usage.
- Blazor WASM payload may be heavy for a viewer app.

Estimated effort: XL.

### Practical Recommendation

Use Option A for migration. Consider Razor/MVC only for home/privacy pages after the backend is stable. Avoid rewriting the viewer until there is a product reason beyond "move to .NET."

## 6. Deployment

### Current Deployment

Current production model:

- Cloudflare Worker edge deployment using Wrangler.
- KV namespace bound to `DOCUMENTS`.
- Static assets served by Cloudflare Workers Sites from `public`.
- Production route `jsonhero.io/*` in `wrangler.toml`.
- Secrets set with Wrangler, including `SESSION_SECRET` and optional API keys.

### ASP.NET Core Deployment Options

#### Linux Server with Kestrel and nginx

Architecture:

- ASP.NET Core app runs under systemd using Kestrel on localhost.
- nginx terminates TLS, serves static files if desired, and proxies dynamic requests.
- PostgreSQL or SQL Server hosted separately or on same private network.
- Optional Redis for distributed cache/session if multiple app nodes.

Pros:

- Portable and low cost.
- Full control over request size, timeouts, caching, and logging.

Cons:

- Operational burden for patching, backups, monitoring, and scaling.

#### Docker

Architecture:

- Multi-stage Dockerfile:
  - Node stage builds React assets.
  - .NET SDK stage publishes ASP.NET app.
  - ASP.NET runtime image runs final app.
- Compose or Kubernetes includes app plus PostgreSQL/SQL Server/Redis.

Pros:

- Reproducible deployment.
- Works across VPS, Kubernetes, Azure Container Apps, AWS ECS, etc.

Cons:

- Need container registry, secrets management, persistent database backups.

#### Azure App Service

Architecture:

- ASP.NET Core 8 deployed to Azure App Service.
- Azure Database for PostgreSQL or Azure SQL.
- Azure Blob Storage if object storage is introduced.
- Azure Front Door/CDN for global edge caching.
- Application Insights for logs/tracing.

Pros:

- Easiest managed .NET path.
- Integrated deployment slots, managed certificates, logging, scaling.

Cons:

- Higher platform coupling and potential cost.
- Edge behavior differs from Cloudflare Workers unless paired with CDN/Front Door.

### CDN and Edge Considerations

Leaving Cloudflare Workers removes edge execution for document fetch/render routes. To recover global performance:

- Keep Cloudflare as DNS/CDN in front of ASP.NET origin.
- Cache immutable static assets aggressively.
- Cache preview fixtures and home assets.
- Do not cache private/dynamic document pages unless explicit cache keys and TTL rules are designed.
- Cache GitHub star count and preview responses server-side.

### Configuration Mapping

| Current config | ASP.NET Core config |
| --- | --- |
| `SESSION_SECRET` Wrangler secret | `DataProtection` key ring and app secret in environment/Key Vault |
| `DOCUMENTS` KV namespace | `ConnectionStrings:Default` plus provider config |
| `GRAPH_JSON_COLLECTION` | Optional analytics config |
| `GRAPH_JSON_API_KEY` | Optional analytics secret |
| `APIHERO_PROJECT_KEY` | Optional outbound proxy/API key |
| `wrangler.toml` route | nginx/Cloudflare DNS/Azure routing |
| `[site] bucket = "./public"` | `wwwroot` and static file middleware |

### CI/CD Changes

Replace current CI with:

- `dotnet restore`
- `dotnet test`
- `npm ci` in `ClientApp`
- `npm run test` for retained TS tests
- `npm run build` for client assets
- `dotnet publish`
- Container build/push or App Service deploy
- EF migration bundle or controlled migration step

## 7. Risk Assessment

### What Breaks or Requires Rework

High-risk areas:

- Replacing Remix data APIs across React components.
- Recreating `/j/{id}` parent loader behavior and initial hydration data.
- Preserving exact route URLs used by shared links, VS Code extensions, Raycast, and API consumers.
- Search worker build/output path.
- URL preview route with encoded arbitrary URLs.
- Cookie/session compatibility.
- KV TTL semantics.
- Cloudflare-specific fetch/cache behavior.
- SSRF and resource-exhaustion exposure when fetching arbitrary URL documents from a traditional server.

Medium-risk areas:

- Converting XML-to-JSON behavior exactly.
- Preserving JSON path escaping semantics for dotted keys.
- Replacing Cloudflare `waitUntil` with background processing.
- Keeping static asset URLs stable enough for OG images, preview fixtures, and home videos.
- Maintaining CORS behavior for `/api/create.json`.

Low-risk areas:

- CRUD document repository.
- GitHub star count fetch.
- Theme cookie endpoint.
- Toast/flash messages.
- Placeholder terminal route.
- Privacy page conversion.

### What Gets Harder

- Global low-latency execution without Worker edge runtime.
- Automatic KV TTL deletion.
- Cloudflare-specific caching of upstream GitHub requests.
- Operational management of database backups, migrations, logs, and server scaling.
- Securing arbitrary outbound URL fetches in a long-lived server environment.
- Maintaining Node/React build inside a .NET deployment if hybrid architecture is used.

### What Gets Easier

- Strong relational persistence and backup/restore.
- Local debugging with standard ASP.NET Core tooling.
- Structured logging, health checks, OpenTelemetry, Application Insights.
- Richer server-side validation and request limits.
- Future authenticated/admin features.
- SQL reporting and data cleanup jobs.
- Integration with enterprise hosting environments.

### Effort Estimates

| Work item | Effort | Notes |
| --- | --- | --- |
| ASP.NET Core project scaffold, routing, static files | S-M | Straightforward. |
| EF Core document storage and migrations | M | Includes TTL and import tooling. |
| Port `jsonDoc.server.ts` service behavior | M | Raw/url docs, base64, XML, read-only, TTL. |
| Port action/API routes | M | Preserve redirects and response shapes. |
| Port preview and external fetch services | M | Needs security hardening. |
| Keep React but remove Remix dependencies | L | Most time-consuming part of recommended path. |
| Preserve viewer behavior with React | M-L | Mostly build/plumbing if components remain. |
| Rewrite viewer in Razor Pages/MVC | XL | Full product rewrite. |
| Rewrite viewer in Blazor | XL | Full product rewrite plus JS interop. |
| KV export/import tooling | M | Depends on production namespace size and metadata needs. |
| Deployment automation | M | Docker/Azure/nginx choice affects scope. |
| End-to-end tests for route compatibility | M | Needed before cutover. |

Overall recommended migration effort: L.

Overall full .NET frontend rewrite effort: XL.

## 8. Recommendation and Phased Migration Approach

### Recommendation

Migrate in phases and keep React for the viewer. The current backend is compact and maps well to ASP.NET Core 8, while the frontend is the majority of product complexity and already works as a mature React experience.

Do not start with a Razor Pages or Blazor rewrite of the JSON viewer. That would turn a platform migration into a product rewrite.

### Phase 0: Inventory and Compatibility Contract

Milestones:

- Freeze the public route contract:
  - `/`
  - `/privacy`
  - `/new`
  - `/j/{id}`
  - `/j/{id}/tree`
  - `/j/{id}/editor`
  - `/j/{id}/terminal`
  - `/j/{id}.json`
  - `/actions/createFromUrl`
  - `/actions/createFromFile`
  - `/actions/{id}/update`
  - `/actions/setTheme`
  - `/actions/getPreview/{url}`
  - `/api/create.json`
- Define DTOs for `JSONDocument`, create API request/response, preview response, and errors.
- Decide whether to preserve the `injest` query typo, add `ingest`, or support both. Recommended: support both.
- Decide maximum JSON size and URL fetch limits.
- Capture golden responses from current production/staging for representative routes.

Exit criteria:

- Compatibility checklist approved.
- Route-level tests planned.

### Phase 1: ASP.NET Core Backend Skeleton

Milestones:

- Create ASP.NET Core 8 project.
- Add controllers/minimal APIs matching current routes.
- Add health check endpoint.
- Add static file serving.
- Add typed `HttpClient` clients for GitHub, URL fetch, OpenGraph Ninja.
- Add no-op `IEventSink`.
- Add theme and toast/flash cookie services.

Exit criteria:

- App runs locally and returns placeholder-compatible responses.
- Static assets and React host page can be served.

### Phase 2: EF Core Storage

Milestones:

- Add `JsonDocument` entity and EF Core migrations.
- Implement `IDocumentRepository`.
- Implement TTL filtering and cleanup hosted service.
- Implement `DocumentService` parity with `jsonDoc.server.ts`.
- Add SQLite provider for local/self-hosted development.
- Add PostgreSQL or SQL Server provider for production.

Exit criteria:

- Unit tests cover create/read/update/delete, TTL, read-only, raw docs, URL docs, base64, and XML conversion.
- `/api/create.json` can create documents and `/j/{id}.json` can return them.

### Phase 3: Route Parity

Milestones:

- Implement all action/API routes.
- Implement `/new` redirect behavior.
- Implement `/j/{id}` viewer host and JSON resolution.
- Implement `/j/{id}.json` download.
- Implement URL preview service with fixture short-circuits.
- Preserve CORS for `/api/create.json`.
- Add request limits, outbound fetch timeout, max response size, and SSRF protections.

Exit criteria:

- Existing API examples from `README.md` work.
- Shared sample document links resolve.
- Route compatibility tests pass.

### Phase 4: React Extraction from Remix

Milestones:

- Move React code into `ClientApp`.
- Replace Remix APIs:
  - loaders with host-injected JSON or fetch calls.
  - actions with `fetch`/forms.
  - `Link`/`Outlet`/navigation with React Router or plain anchors.
  - `useFetcher` with mutations/queries.
- Configure Tailwind against new paths.
- Configure Vite build and web worker output.
- Move or reference assets from `wwwroot`/client assets.
- Keep existing Jest tests or migrate to Vitest.

Exit criteria:

- Viewer parity for column, tree, editor, search, previews, path bar, sharing, theme, and preferences.
- Build emits static assets consumed by ASP.NET Core.

### Phase 5: Data Migration

Milestones:

- Build KV export tool.
- Build SQL import tool.
- Run dry-run export/import from dev namespace.
- Validate row counts, sample documents, TTL expiration, and raw/url document behavior.
- Decide retention and rollback plan.

Exit criteria:

- Production migration runbook tested.
- Backup/export artifact validated.

### Phase 6: Deployment and Cutover

Milestones:

- Choose hosting:
  - Docker + Linux/nginx,
  - Azure App Service,
  - or another ASP.NET-capable platform.
- Add production database and backups.
- Configure secrets.
- Configure Cloudflare/CDN in front of origin.
- Add logging, metrics, health checks, and alerts.
- Run shadow/staging environment.
- Cut over DNS/route.

Exit criteria:

- New deployment serves production traffic.
- Old Worker/KV remains available during rollback window.
- Error rates, latency, and document creation are monitored.

### Phase 7: Optional .NET Frontend Modernization

Only after backend cutover:

- Convert home/privacy pages to Razor if desired.
- Evaluate whether viewer should remain React permanently.
- Consider Blazor or Razor components only for new features where .NET adds clear value.
- Add SignalR only for future collaboration or live document workflows.

## File-by-File Migration Checklist

### Server and Config

| File | Action |
| --- | --- |
| `package.json` | Keep only for `ClientApp` build if hybrid. Remove Remix/Cloudflare deps after extraction. |
| `remix.config.js` | Remove after migration. |
| `wrangler.toml`, `wrangler.toml.dev` | Replace with ASP.NET appsettings/deployment config. Keep temporarily for KV export. |
| `worker/index.js` | Remove. |
| `Dockerfile` | Replace with multi-stage Node + .NET Dockerfile. |
| `.github/workflows/main.yml` | Replace Wrangler deploy with .NET/client build/test/deploy. |
| `app/bindings.d.ts` | Remove; replace with typed options classes. |
| `app/jsonDoc.server.ts` | Port to C# `DocumentService`. |
| `app/theme.server.ts` | Port to C# cookie service. |
| `app/graphJSON.server.ts` | Port to no-op `IEventSink` or analytics provider. |
| `app/services/*` | Port server services to C# except client-only concerns. |

### Routes

| File | Action |
| --- | --- |
| `app/routes/index.tsx` | Keep as React route or convert to Razor home page. |
| `app/routes/privacy.mdx` | Convert to Razor/HTML/Markdown-rendered page. |
| `app/routes/new.tsx` | Port loader to `GET /new`. |
| `app/routes/j/$id.tsx` | Replace Remix shell with ASP.NET viewer host plus React root. |
| `app/routes/j/$id/index.tsx` | Keep React component under client router. |
| `app/routes/j/$id/tree.tsx` | Keep React component under client router. |
| `app/routes/j/$id/editor.tsx` | Keep React component under client router. |
| `app/routes/j/$id/terminal.tsx` | Keep or convert placeholder. |
| `app/routes/j/$id[.json].ts` | Port to `GET /j/{id}.json`. |
| `app/routes/actions/*` | Port to MVC/minimal API endpoints. |
| `app/routes/api/create[.json].ts` | Port to `POST/OPTIONS /api/create.json`. |

### Client Components

| File/group | Action |
| --- | --- |
| `app/components/Home/*` | Move to `ClientApp` or convert to Razor. |
| `app/components/Json*`, `Columns`, `Column*`, `InfoPanel`, `SideBar`, `Header`, `Footer` | Move to `ClientApp`, remove Remix dependencies. |
| `app/components/Preview/*` | Move to `ClientApp`; replace preview fetcher. |
| `app/components/UI/*` | Move to `ClientApp`; keep Radix in hybrid. |
| `app/components/Primitives/*`, `Icons/*` | Move to `ClientApp`. |
| `app/hooks/*` | Move to `ClientApp`; keep behavior. |
| `app/useColumnView/index.ts` | Move to `ClientApp`; keep behavior. |
| `app/utilities/*` | Split server utilities (`safeFetch`, XML) from client utilities. Keep most JSON UI utilities in `ClientApp`. |
| `app/entry.worker.ts` | Move to `ClientApp` worker build. |

### Tests

Existing Jest tests cover:

- `formatStarCount`
- `jsonColumnView`
- `relatedValues`
- `search`
- `stableJson`
- XML utilities

Recommended test migration:

- Keep these as TypeScript tests if React is retained.
- Add .NET unit tests for `DocumentService`, `UrlPreviewService`, XML conversion, TTL, and route model validation.
- Add integration tests using `WebApplicationFactory` for route parity.
- Add Playwright tests for document creation, viewer rendering, navigation, search, preview, title update, delete, and JSON download.

## Final Feasibility Rating

Backend migration to ASP.NET Core 8: feasible, medium risk, medium effort.

Hybrid React plus ASP.NET Core migration: feasible, medium risk, large effort.

Full Razor Pages/MVC or Blazor rewrite: feasible, high risk, extra-large effort.

Best path: port persistence and routes first, preserve React viewer, then decide whether any frontend pages are worth rewriting after production parity is achieved.
