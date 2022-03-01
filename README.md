<p align="center">
<img width="300" src="https://raw.githubusercontent.com/jsonhero-io/jsonhero-web/main/docs/images/JsonHeroLogo.png"/>
</p>

# JSONHero

## Development

From your terminal:

```sh
npm start
```

This will build JSONHero in development mode and start the local miniflare server. Should now be available at [http://localhost:8787](http://localhost:8787)

## Deploy

Use [wrangler](https://developers.cloudflare.com/workers/cli-wrangler) to build and deploy your application to Cloudflare Workers. If you don't have it yet, follow [the installation guide](https://developers.cloudflare.com/workers/cli-wrangler/install-update) to get it setup. Be sure to [authenticate the CLI](https://developers.cloudflare.com/workers/cli-wrangler/authentication) as well.

If you don't already have an account, then [create a cloudflare account here](https://dash.cloudflare.com/sign-up) and after verifying your email address with Cloudflare, go to your dashboard and set up your free custom Cloudflare Workers subdomain.

Once that's done, you should be able to deploy your app:

```sh
npm run deploy
```
