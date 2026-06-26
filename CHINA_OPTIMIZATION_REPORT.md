# China Optimization Report

Generated on 2026-06-27 for `/tmp/jsonhero-web`.

This report covers runtime external resources and API calls in the JSON Hero web app that are likely to be slow, unreliable, or blocked for users in mainland China. It separates fixed third-party dependencies from user-supplied URLs, because user-supplied preview/document URLs cannot be fully optimized without proxying or caching.

## Executive Summary

High-priority blockers:

- Google Fonts are loaded from `fonts.googleapis.com` and then `fonts.gstatic.com`. Google domains are commonly blocked or unreliable in mainland China, so first paint and typography can stall.
- Fathom analytics injects `https://cdn.usefathom.com/script.js` and posts events back to the same host. This is a third-party analytics host outside mainland China and can be slow or blocked by network policy.
- URL previews depend on `opengraph.ninja`, optional `proxy.apihero.run`, arbitrary destination URLs, and `ipfs.io`. Preview results will be inconsistent from mainland China.
- The server fetches GitHub API data on every root loader request path, with short Cloudflare caching. GitHub API access from mainland China is often slow or unreliable.
- The homepage sample preview includes media from `media.giphy.com` and hard-coded YouTube/OpenGraph fixture URLs. YouTube is blocked in mainland China; Giphy/CDN access is unreliable.
- Several navigation links point to GitHub, Discord, Twitter/X, VS Code Marketplace, API Hero, and Trigger.dev. These are click-only resources, not render-blocking, but many will not open reliably in mainland China.

Recommended baseline:

- Remove the Google Fonts `@import` and self-host `Source Sans Pro` and `Roboto Mono` under `public/fonts`, or replace them with system fonts.
- Add a China-aware analytics option: self-host Fathom's script on the app domain or disable analytics for China traffic.
- Move URL preview fetching behind a China-region proxy/cache and replace `ipfs.io` with a configurable gateway.
- Cache the GitHub star count in KV for hours or replace it with a build-time/static value.
- Self-host homepage sample media and preview fixture images.

## Frontend Static Resources

### Google Fonts stylesheet and font files

- URL/host: `https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700;900&family=Roboto+Mono&display=swap`
- Follow-on host: `https://fonts.gstatic.com/...` font binaries returned by the Google Fonts CSS.
- File and line: `styles/tailwind.css:1`
- Usage: imported before Tailwind layers; `tailwind.config.js:29-32` maps `font-sans` to `Source Sans Pro` and `font-mono` to `Roboto Mono`.
- China problem: Google domains are commonly blocked or degraded in mainland China. A blocked CSS import can delay font loading and cause slow first render, fallback font flashes, or long stalled requests.
- Specific fix:
  - Best fix: self-host only the needed weights and formats. Download `Source Sans Pro` weights `400`, `700`, `900` and `Roboto Mono` weight `400` as `.woff2`, place them under `public/fonts/source-sans-pro/` and `public/fonts/roboto-mono/`, then replace the import with local `@font-face` rules:

    ```css
    @font-face {
      font-family: "Source Sans Pro";
      src: url("/fonts/source-sans-pro/source-sans-pro-400.woff2") format("woff2");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    ```

  - China CDN mirror option: replace `fonts.googleapis.com` with a mainland-accessible mirror such as `https://fonts.font.im/css2?family=Source+Sans+Pro:wght@400;700;900&family=Roboto+Mono&display=swap` or `https://fonts.loli.net/css2?family=Source+Sans+Pro:wght@400;700;900&family=Roboto+Mono&display=swap`. Verify mirror availability and legal/compliance posture before production use.
  - Conservative alternative: change `tailwind.config.js:30-31` to system font stacks and remove the external import.

### Fathom analytics script

- URL/host: `https://cdn.usefathom.com/script.js`
- Event endpoint: default Fathom script uses `https://cdn.usefathom.com/` as the tracking endpoint.
- File and line: `app/entry.client.tsx:3` imports `load` from `fathom-client`; `app/entry.client.tsx:7-11` calls `load("ROBFNTET", ...)`.
- Indirect package source: `package.json:54` depends on `fathom-client`; `fathom-client@3.4.1` defaults `tracker.src` to `https://cdn.usefathom.com/script.js`.
- China problem: `cdn.usefathom.com` is a third-party analytics CDN outside mainland China. Analytics hosts are commonly blocked by privacy tooling and enterprise networks, and cross-border latency is high. It is not render-blocking because the script is async, but it creates failed/stalled client requests and missing analytics.
- Specific fix:
  - Self-host/proxy the Fathom script under the app domain, for example `/vendor/fathom/script.js`, and call:

    ```ts
    load("ROBFNTET", {
      url: "/vendor/fathom/script.js",
      spa: "history",
      excludedDomains: ["localhost"],
      includedDomains: ["jsonhero.io"],
    });
    ```

  - If using Fathom's custom domain feature, configure an analytics subdomain close to the deployment domain, then pass that script URL via `opts.url`.
  - For a mainland China deployment, prefer a region-local analytics product or disable analytics for China traffic to avoid slow third-party requests.

### Homepage sample GIF from Giphy

- URL/host: `https://media.giphy.com/media/13CoXDiaCcCoyk/giphy-downsized.gif`
- File and line: `app/components/Home/HomeInfoBoxSection.tsx:15`
- Runtime path: this value is part of sample JSON. When the "Images" sample is selected, `PreviewString` renders it as an image via `app/components/Preview/Types/PreviewString.tsx:35-40` and `app/components/Preview/Types/PreviewImageUri.tsx:17`.
- China problem: Giphy/media CDN access from mainland China is unreliable and may be blocked or slow. The homepage sample image can fail, leaving the preview incomplete.
- Specific fix:
  - Download and optimize the GIF/WebP/MP4 into `app/assets/home/` or `public/home/`.
  - Replace the sample JSON value with a local path, for example `thumbnail: "/home/sample-preview.webp"`.
  - If CDN is required, upload the asset to a China-friendly CDN such as Alibaba Cloud CDN, Tencent Cloud CDN, or Qiniu CDN with ICP-compliant domain setup.

### Hard-coded Peekalink preview images returned by the homepage preview fixture

- URL/host: `https://cdn.peekalink.io/public/images/...`
- File and lines:
  - `app/routes/actions/getPreview.$url.ts:60`
  - `app/routes/actions/getPreview.$url.ts:65`
  - `app/routes/actions/getPreview.$url.ts:94`
  - `app/routes/actions/getPreview.$url.ts:99`
- Runtime path: the homepage sample JSON contains `https://www.theonion.com/` and `https://www.youtube.com/watch?v=dQw4w9WgXcQ` at `app/components/Home/HomeInfoBoxSection.tsx:18-19`. `PreviewUri` requests `/actions/getPreview/:url`; the loader short-circuits these two URLs and returns the hard-coded image/icon URLs. The images are rendered in `app/components/Preview/Types/PreviewHtml.tsx:17` and `app/components/Preview/Types/PreviewHtml.tsx:26`.
- China problem: `cdn.peekalink.io` is an external CDN with no guarantee of mainland China availability. The YouTube fixture is also for a blocked service, and its returned preview images are on a third-party host.
- Specific fix:
  - Save these fixture images locally, for example under `public/preview-fixtures/theonion.jpg`, `public/preview-fixtures/youtube-icon.jpg`, and `public/preview-fixtures/youtube-image.jpg`.
  - Replace the hard-coded `cdn.peekalink.io` values with same-origin paths.
  - For a China-specific homepage, replace the YouTube sample URL with a China-accessible video/page example and local fixture image.

### YouTube sample URL and consent URL in preview fixture

- URL/host:
  - `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
  - `https://consent.youtube.com/m?...`
  - `https://www.youtube.com/watch?ucbcb=1&v=dQw4w9WgXcQ`
- File and lines:
  - `app/components/Home/HomeInfoBoxSection.tsx:19`
  - `app/routes/actions/getPreview.$url.ts:72`
  - `app/routes/actions/getPreview.$url.ts:74`
  - `app/routes/actions/getPreview.$url.ts:82`
  - `app/routes/actions/getPreview.$url.ts:85-86`
- China problem: YouTube is blocked in mainland China. These values are mostly metadata returned by the preview fixture, but users clicking the preview or opening the URL will hit blocked domains.
- Specific fix:
  - Replace the sample with a China-accessible video URL such as a Bilibili demo page, or avoid third-party video URLs and use a same-origin sample media page.
  - Keep any thumbnail/icon assets self-hosted.
  - If the app must preview YouTube links for global users, gate the sample data by locale/region and use a China-safe sample for mainland China.

### The Onion sample URL

- URL/host: `https://www.theonion.com/`
- File and lines:
  - `app/components/Home/HomeInfoBoxSection.tsx:18`
  - `app/routes/actions/getPreview.$url.ts:44`
  - `app/routes/actions/getPreview.$url.ts:46`
- China problem: this is a US media site with no China availability guarantee. It is not a render-blocking asset by itself, but the preview card opens this URL on click through `PreviewBox` (`app/components/Preview/PreviewBox.tsx:11-14`).
- Specific fix:
  - Replace with a self-hosted static example page or a China-accessible example site.
  - For the homepage demo, keep all preview metadata and images local so the demo does not depend on the live external page.

### Runtime preview images from arbitrary OpenGraph metadata

- URL/host: dynamic values in `info.icon.url` and `info.image.url`.
- File and lines:
  - `app/components/Preview/Types/PreviewHtml.tsx:17`
  - `app/components/Preview/Types/PreviewHtml.tsx:26`
- Source: `app/services/uriPreview.server.ts:20` fetches OpenGraph data, and `app/services/uriPreview.server.ts:30-33` returns remote favicon/image URLs from the OpenGraph response.
- China problem: preview images are loaded directly by the browser from the original third-party host. For mainland China users, many global hosts are blocked or slow; even if the server can fetch metadata, the browser may not be able to fetch the image.
- Specific fix:
  - Add an image proxy/cache endpoint, for example `/api/preview-image?url=...`, backed by KV/R2/object storage and a China-friendly CDN.
  - Rewrite `icon.url` and `image.url` in `getOpenGraphNinja` to same-origin cached URLs before sending them to the browser.
  - Add host allowlists, size limits, content-type validation, and cache TTLs to avoid abuse.

### Runtime direct image preview URLs from JSON values

- URL/host: arbitrary user/document URL values detected as image content.
- File and lines:
  - `app/components/Preview/Types/PreviewString.tsx:35-40`
  - `app/components/Preview/Types/PreviewImageUri.tsx:17`
  - `app/components/Preview/Types/PreviewImage.tsx:21-25`
- China problem: these URLs are loaded directly by the user's browser. If the JSON contains Google, GitHub raw, S3, Giphy, IPFS, Twitter/X, or other global media URLs, previews may be blocked or slow in mainland China.
- Specific fix:
  - Add a configurable preview asset proxy for images and route rendered `src` values through it.
  - Cache frequently used images on same-origin storage/CDN.
  - Provide a per-deployment option to disable direct external media previewing for China deployments.

### Runtime direct audio/video preview URLs from JSON values

- URL/host: arbitrary user/document URL values detected as `video/mp4`, `video/webm`, `video/ogg`, `audio/mpeg`, `audio/ogg`, or `audio/wav`.
- File and lines:
  - `app/components/Preview/Types/PreviewString.tsx:42-63`
  - `app/components/Preview/Types/PreviewAudioUri.tsx:35`
  - `app/components/Preview/Types/PreviewVideoUri.tsx:35-36`
- China problem: media is streamed directly from the original host in the browser. Cross-border media loads are often slow, and many common media hosts are blocked.
- Specific fix:
  - Proxy/cache small media previews through same-origin storage/CDN with strict size and MIME limits.
  - For large media, show metadata and an outbound link instead of embedding direct playback for China users.
  - Add a deployment flag to disable direct external audio/video rendering.

### IPFS image gateway in frontend previews

- URL/host: `https://ipfs.io/ipfs/...`
- File and lines: `app/components/Preview/Types/PreviewIPFSImage.tsx:12-14`
- Runtime path: selected JSON string with `ipfs:` URL and image content type is rewritten to `ipfs.io` at `app/components/Preview/Types/PreviewString.tsx:30-33`.
- China problem: `ipfs.io` gateway access is commonly unreliable in mainland China and may be blocked or very slow. IPFS itself also adds variable latency.
- Specific fix:
  - Make the IPFS gateway configurable, for example `IPFS_GATEWAY_BASE_URL`.
  - Use a China-accessible gateway or self-operated gateway behind a China-friendly CDN: `https://<your-domain>/ipfs/`.
  - Cache resolved IPFS content in object storage for stable previews.

### Click-only external links in the app shell and homepage

These are not loaded automatically as scripts/styles/images, but they are user-facing navigation targets that will be slow or blocked for mainland China users.

#### GitHub repository links

- URL/host: `https://github.com/triggerdotdev/jsonhero-web`
- File and lines:
  - `app/components/UI/GithubStar.tsx:15`
  - `app/components/UI/GithubStarSmall.tsx:15`
  - `app/components/Home/HomeFooter.tsx:28`
- China problem: GitHub can be slow or intermittently unreachable in mainland China.
- Specific fix:
  - Add a China mirror link, for example Gitee or GitCode, and render it for China deployments.
  - Keep GitHub as the canonical global link but avoid relying on GitHub for core UX.

#### Discord invite links

- URL/host: `https://discord.gg/JtBAxBr2m3`
- File and lines:
  - `app/components/Header.tsx:87`
  - `app/components/Home/HomeHeader.tsx:56`
  - `app/components/Home/HomeFooter.tsx:40`
- China problem: Discord is blocked in mainland China.
- Specific fix:
  - Add China-accessible community channels such as WeChat group QR, QQ group, Feishu, or DingTalk.
  - Hide or de-prioritize Discord for China deployments.

#### Twitter/X links

- URL/host: `https://twitter.com/triggerdotdev`
- File and lines:
  - `app/components/Home/HomeHeader.tsx:61`
  - `app/components/Home/HomeFooter.tsx:45`
- China problem: Twitter/X is blocked in mainland China.
- Specific fix:
  - Add China-accessible social links such as WeChat Official Account, Bilibili, Zhihu, Juejin, or Weibo.
  - Render Twitter/X only for non-China locales.

#### VS Code Marketplace link

- URL/host: `https://marketplace.visualstudio.com/items?itemName=JSONHero.jsonhero-vscode`
- File and line: `app/components/Home/HomeFeatureGridSection.tsx:71`
- China problem: Microsoft global services are usually more reachable than Google/Twitter/Discord, but cross-border marketplace access can still be slow or unreliable.
- Specific fix:
  - Provide a direct `.vsix` download from the app's own CDN or a China-friendly CDN.
  - Optionally mirror extension installation docs in Chinese.

#### API Hero marketing links

- URL/host: `https://apihero.run`
- File and lines:
  - `app/components/Home/HomeApiHeroBanner.tsx:16`
  - `app/components/Home/HomeApiHeroBanner.tsx:24`
- China problem: external SaaS/product site with no mainland China performance guarantee.
- Specific fix:
  - Use a region-local landing page or remove this banner for China deployments.
  - If the link remains, route through a localized domain/CDN.
- Note: `HomeApiHeroBanner` is not currently rendered by `app/routes/index.tsx`, but it is part of the codebase and can become runtime if reintroduced.

#### Trigger.dev logo link

- URL/host: `https://trigger.dev/`
- File and line: `app/components/Icons/LogoTriggerdotdev.tsx:9`
- China problem: external SaaS/product site with no mainland China performance guarantee.
- Specific fix:
  - Link to a localized mirror or static information page on the JSON Hero domain for China deployments.

#### Privacy policy outbound legal/opt-out links

- URL/host:
  - `https://jsonhero.io`
  - `https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm`
  - `https://www.edoeb.admin.ch/edoeb/en/home.html`
  - `http://www.aboutads.info/choices/`
- File and lines:
  - `app/routes/privacy.mdx:21`
  - `app/routes/privacy.mdx:230`
  - `app/routes/privacy.mdx:234`
  - `app/routes/privacy.mdx:246`
- China problem: these links are not loaded automatically, but they are visible runtime links on `/privacy`. EU/Swiss government and ad-industry opt-out sites are cross-border destinations and may be slow from mainland China. `aboutads.info` is also an ad-tech related destination that may be blocked by network policy or browser privacy tooling.
- Specific fix:
  - Keep legal references, but add a same-origin Chinese-language privacy/contact page with the essential information.
  - Use `https://` for the AboutAds link if retained.
  - For mainland China deployments, add region-relevant privacy/contact links instead of relying only on EU/Swiss/US opt-out pages.

## Server-Side API Calls and External Fetches

### GitHub repository API for star count

- URL/host: `https://api.github.com/repos/triggerdotdev/jsonhero-web`
- File and line: `app/services/github.server.ts:3-4`
- Called from: `app/root.tsx:45` imports `getStarCount`; `app/root.tsx:59-62` calls it in the root loader.
- China problem: GitHub API can be slow or unreliable from mainland China. In this deployment the call is server-side, so user impact depends on where the worker runs. If deployed on Cloudflare outside mainland China, the fetch may succeed but still adds cross-region latency. If deployed inside/near mainland China, GitHub API can be degraded. The result also controls a visible header/footer counter.
- Specific fix:
  - Store star count in KV with a longer TTL, for example 6-24 hours, and refresh asynchronously via scheduled job.
  - For China deployments, use a static build-time value or mirror repository stats from Gitee/GitCode.
  - Avoid blocking the root loader on this call; return the page first and update the count client-side only where acceptable.

### OpenGraph Ninja preview API

- URL/host: `https://opengraph.ninja/api/v1?url=...`
- File and line: `app/services/uriPreview.server.ts:20`
- Called from: `app/routes/actions/getPreview.$url.ts:22` through `getUriPreview`.
- China problem: OpenGraph Ninja is hosted behind global infrastructure (`server: Vercel` observed from a response). Mainland China users or China-hosted server deployments may see high latency or failed access. It is also a required fallback for HTML URL previews.
- Specific fix:
  - Replace with an internal OpenGraph fetcher/parser deployed in the same region as the app.
  - Cache preview data in KV/R2 by normalized URL with TTL.
  - For mainland China, use a China-region function/server to fetch metadata, with outbound allowlists and timeout limits.
  - If keeping OpenGraph Ninja, route through a China-accessible backend proxy and fail fast with cached/stale data.

### API Hero fetch proxy

- URL/host: `https://proxy.apihero.run` when `APIHERO_PROJECT_KEY` is configured.
- File and lines:
  - `app/services/apihero.server.ts:1`
  - `app/services/apihero.server.ts:3-8`
  - `app/bindings.d.ts:8`
  - `wrangler.toml:36-39`
- Indirect package behavior: `@apihero/fetch@0.1.0` defaults the proxy URL to `https://proxy.apihero.run`.
- Used by: `app/services/uriPreview.server.ts:20` via `fetchProxy(...)`.
- China problem: `proxy.apihero.run` is a global third-party proxy with no mainland China availability guarantee. If enabled, every OpenGraph Ninja preview request is routed through this additional external host, increasing latency and adding another possible block point.
- Specific fix:
  - Disable `APIHERO_PROJECT_KEY` for China deployments unless the proxy has a China-optimized endpoint.
  - Add an explicit `url` option to `createFetchProxy` pointing to a China-region proxy you control.
  - Prefer an internal preview service over a third-party proxy for mainland China.

### User-supplied URL HEAD/GET requests for preview detection

- URL/host: arbitrary `uri` after `rewriteUrl`.
- File and lines:
  - `app/services/uriPreview.server.ts:49`
  - `app/services/uriPreview.server.ts:89-100`
  - `app/services/uriPreview.server.ts:106-114`
  - `app/services/uriPreview.server.ts:65-69`
- Called from: `app/routes/actions/getPreview.$url.ts:22`.
- China problem: preview detection performs server-side `HEAD` and sometimes `GET` to arbitrary external URLs. URLs hosted outside mainland China, Google/Twitter/YouTube/GitHub raw domains, IPFS gateways, and private/intranet hosts can be slow, blocked, or dangerous. This can make preview loading hang or fail.
- Specific fix:
  - Add strict fetch timeouts, maximum redirect count, and maximum response size.
  - Add SSRF protection: block private IP ranges, localhost, metadata IPs, and unsupported protocols after DNS resolution.
  - Cache preview `HEAD` results by URL.
  - Route preview fetching through a China-region egress service for China deployments.
  - Provide a setting to disable external URL previewing and show only the raw URL.

### IPFS gateway rewrite in server preview service

- URL/host: `https://ipfs.io/ipfs/...`
- File and lines:
  - `app/services/uriPreview.server.ts:153-154`
  - `app/services/uriPreview.server.ts:159-173`
- China problem: `ipfs.io` is unreliable from mainland China and may fail frequently. Server-side preview checks against this gateway can time out or return inconsistent results.
- Specific fix:
  - Make gateway configurable with `IPFS_GATEWAY_BASE_URL`.
  - Use a self-operated gateway or China-accessible gateway behind Alibaba Cloud CDN/Tencent Cloud CDN/Qiniu.
  - Cache IPFS preview metadata and assets after first successful retrieval.

### User-supplied document URL fetch in document viewer

- URL/host: arbitrary stored `doc.url`.
- File and lines:
  - `app/routes/j/$id.tsx:55-62`
  - `app/routes/j/$id.tsx:64-74`
- China problem: when a document is stored as type `url`, viewing it requires the server to fetch that external JSON URL. Mainland China users will see failures or slow loads for blocked/global hosts. This also means the document can become unavailable if the upstream URL is slow or blocked.
- Specific fix:
  - Prefer ingestion: fetch the URL once on creation and store raw JSON in KV/R2, rather than re-fetching on every view.
  - Enable `injest=true` by default for China deployments in `app/routes/new.tsx:37-46` and `app/jsonDoc.server.ts:55-62`.
  - Add timeouts, SSRF protection, content-type/size limits, and a cached fallback for URL documents.

### User-supplied document URL fetch in `.json` endpoint

- URL/host: arbitrary stored `doc.url`.
- File and line: `app/routes/j/$id[.json].ts:16-18`
- China problem: exporting/viewing the `.json` endpoint for URL-backed documents re-fetches the upstream URL directly. It has the same cross-border availability and SSRF/performance risks as the main viewer, but without the `safeFetch` user-agent wrapper.
- Specific fix:
  - Use the same ingestion/cache path as the main viewer.
  - Replace raw `fetch(doc.url)` with `safeFetch` plus timeout, SSRF checks, and size limits.
  - Return stored raw content when available.

### User-supplied URL ingestion fetch

- URL/host: arbitrary URL submitted by the user when `options.injest` is true.
- File and lines: `app/jsonDoc.server.ts:55-62`
- Called from: `app/routes/new.tsx:37-46` when the query has `injest=true`.
- China problem: ingestion from global or blocked hosts can be slow/fail from mainland China or from a China-hosted backend. Without timeouts and size limits, this can also tie up worker execution.
- Specific fix:
  - Add timeout, max body size, content-type validation, and SSRF protection.
  - For China deployments, route through region-local egress or require users to upload/paste JSON if the URL cannot be fetched.
  - Store ingestion results so future views are same-origin.

### Analytics/event collection through `sendEvent`

- URL/host: none in current code.
- File and lines:
  - `app/graphJSON.server.ts:1-3` returns immediately.
  - Event call sites include `app/routes/actions/createFromUrl.ts:48-56`, `app/routes/actions/createFromFile.ts:32-39`, `app/routes/api/create[.json].ts:53-61`, and `app/routes/new.tsx:48-56`.
- China problem: no current server-side analytics request is made. However, `app/bindings.d.ts:6-7` and `wrangler.toml:33-39` still define/comment `GRAPH_JSON_*` bindings, suggesting a prior or planned external analytics API.
- Specific fix:
  - Keep `sendEvent` as a no-op for China deployments, or implement it against a China-region analytics/event service.
  - If re-enabling Graph JSON, document the endpoint and route through a China-accessible collector with async `waitUntil` and short timeouts.

## Tracking and Analytics

### Active client analytics: Fathom

- Host: `cdn.usefathom.com`
- File and lines: `app/entry.client.tsx:3` and `app/entry.client.tsx:7-11`
- Site ID: `ROBFNTET`
- Behavior: loads an async third-party script, tracks SPA navigation with history mode, excludes `localhost`, and includes `jsonhero.io`.
- China issue: third-party analytics script and beacon endpoint can be blocked or slow; analytics data for mainland China users will be incomplete.
- Fix: self-host/proxy the script, use Fathom custom domain, replace with a China-region analytics service, or disable analytics for China traffic.

### Inactive/server no-op analytics: Graph JSON

- Host: none currently.
- File and lines: `app/graphJSON.server.ts:1-3`
- Behavior: `sendEvent` immediately returns, so route call sites do not emit network traffic.
- China issue: safe as currently implemented.
- Fix if re-enabled: require explicit endpoint review before deploying in China.

### Analytics dependency present but unused: Intercom

- Package: `react-use-intercom`
- File and line: `package.json:64`
- Runtime usage: no imports found under `app/`.
- China issue: no current runtime request. If used later, Intercom's global widget/API domains are likely to be slow or blocked.
- Fix: remove unused dependency or gate any future Intercom integration behind region-specific config.

## Already Self-Hosted or Same-Origin Resources That Are Safe

These resources are bundled with the app or served from the same deployment origin. They are generally China-safe if the app's own domain/CDN is China-optimized.

- App CSS bundle: `app/root.tsx:43` imports `./tailwind.css`; `app/root.tsx:49-50` serves it through Remix. The source CSS still contains the Google Fonts import and must be fixed separately.
- OpenGraph image: `app/root.tsx:21` imports `~/assets/images/opengraph.png`; `app/root.tsx:30` and `app/root.tsx:34` reference it as `https://jsonhero.io${openGraphImage}`.
- Homepage videos:
  - `app/components/Home/HomeHeroSection.tsx:6` imports `~/assets/home/JsonHero2.mp4`; rendered via `app/components/Home/HomeHeroSection.tsx:18`.
  - `app/components/Home/HomeSearchSection.tsx:6` imports `~/assets/home/JsonHeroSearch.mp4`; rendered via `app/components/Home/HomeSearchSection.tsx:22`.
  - `app/components/Home/HomeCollaborateSection.tsx:6` imports `~/assets/home/JsonHeroShare.mp4`; rendered via `app/components/Home/HomeCollaborateSection.tsx:25`.
  - `app/components/Home/HomeEdgeCasesSection.tsx:6` imports `~/assets/home/UncoverEdgeCases.mp4`; rendered via `app/components/Home/HomeEdgeCasesSection.tsx:26`.
- Homepage/API Hero image asset: `app/components/Home/HomeApiHeroLaptop.tsx:1` imports `~/assets/images/apihero-laptop.png`; rendered at `app/components/Home/HomeApiHeroLaptop.tsx:8`.
- Trigger.dev logo images in the document footer: `app/components/Footer.tsx:11-13` import local PNGs.
- Header Trigger.dev logo graphic: the visible SVG paths are inline in React components; only the wrapper link is external (`app/components/Icons/LogoTriggerdotdev.tsx:9`).
- Icon assets and inline icons:
  - SVG files under `app/assets/svgs/` are local.
  - React icon components under `app/components/Icons/` are inline SVG markup; `xmlns="http://www.w3.org/2000/svg"` is an XML namespace, not a network request.
  - Heroicons and other package icons are bundled in the JS build.
- Search web worker: `app/hooks/useJsonSearch.tsx:211` loads `/entry.worker.js`, built from `app/entry.worker.ts` by `package.json:13`.
- Existing local font files: `public/fonts/MonoLisa/woff/*` and `public/fonts/MonoLisa/woff2/*` are self-hosted. Current Tailwind config does not use `MonoLisa`; if desired, `Roboto Mono` can be replaced with this local font to avoid Google Fonts.
- Local app routes and form actions such as `/actions/createFromUrl`, `/actions/createFromFile`, `/actions/getPreview/:url`, `/j/:id`, and `/j/:id.json` are same-origin. Their internals may still perform external server-side fetches as documented above.

## Deployment-Level China Considerations

- Current production route is `jsonhero.io/*` in `wrangler.toml:26-28`, deployed on Cloudflare Workers. Cloudflare's standard global network is outside mainland China unless using a China Network/partner setup. Even after fixing third-party resources, mainland users may still see cross-border latency to the app itself.
- For a China-focused deployment, use a mainland China CDN and origin strategy that satisfies ICP requirements, or deploy a separate China domain backed by Alibaba Cloud, Tencent Cloud, Huawei Cloud, or another compliant provider.
- Make third-party endpoints configurable through environment variables:
  - `FONT_CDN_BASE_URL` or fully self-hosted fonts.
  - `ANALYTICS_SCRIPT_URL` and analytics enable/disable flag.
  - `PREVIEW_SERVICE_URL`.
  - `PREVIEW_ASSET_PROXY_URL`.
  - `IPFS_GATEWAY_BASE_URL`.
  - `GITHUB_STATS_SOURCE`.

## Prioritized Fix Checklist

1. Replace the Google Fonts import with local `@font-face` assets or system fonts.
2. Self-host or disable Fathom analytics for China traffic.
3. Self-host homepage sample media and fixture images; replace the YouTube/Giphy samples with China-safe examples.
4. Add a URL preview backend/cache and rewrite preview image/icon URLs to same-origin cached assets.
5. Make IPFS gateway configurable and stop hard-coding `ipfs.io`.
6. Stop blocking root loader rendering on the GitHub API; cache or staticize the star count.
7. Prefer URL ingestion/storage over re-fetching upstream JSON documents on every view.
8. Add China alternatives for click-only links to Discord, Twitter/X, GitHub, VS Code Marketplace, API Hero, and Trigger.dev.
