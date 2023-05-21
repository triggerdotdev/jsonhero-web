## 👩🏽‍💻 JSON Hero Local Development Guide

Welcome to JSON Hero development and thanks for being here! If you'd like to run JSON Hero locally, please use the following guide to get started. If you have any issues with this guide please feel free to email me at [eric@jsonhero.io](mailto:eric@jsonhero.io) or come leave a message in our open [Discord Channel](https://discord.gg/JtBAxBr2m3).

For more information about contributing to JSON Hero please see the [Contributing doc](https://github.com/triggerdotdev/jsonhero-web/blob/main/CONTRIBUTING.md).

### Install dependencies

Before you can run JSON Hero locally, you will need to install the following dependencies on your machine:

#### Git

You most likely already have git installed on your machine, but if not, you can install it from the [Git website](https://git-scm.com).

#### Node.js 16

Even though JSON Hero runs on [Cloudflare Workers](https://workers.cloudflare.com), which isn't a Node.js environment, you will still need Node.js 16 to run it locally. The recommended way to install Node.js is to download a pre-built package from the [Node.js website](https://nodejs.org/en/)

#### NPM

If you install Node.js through the above link, you should also have NPM automatically installed as well. To make sure, run the following command in your preferred Terminal:

```bash
npm ---version
```

### Fork JSON Hero on GitHub (optional)

To contribute code to JSON Hero, you should first create a fork of the [jsonhero-web](https://github.com/triggerdotdev/jsonhero-web) repository on GitHub. Follow [these instructions](https://docs.github.com/en/get-started/quickstart/fork-a-repo) on repository forking.

### Clone the repo

In your terminal, issue the following command to clone the repository to your local machine:

```bash
git clone https://github.com/triggerdotdev/jsonhero-web.git
```

Or if you've forked the repository:

```bash
git clone https://github.com/<github username>/jsonhero-web.git
```

Then `cd` into the repository:

```bash
cd jsonhero-web
```

### Prepare the repo

First, install npm dependencies:

```bash
npm install
```

Run the following command to create the `.env` file with a new `SESSION_SECRET` environment variable:

```bash
echo "SESSION_SECRET=$(openssl rand -hex 32)" > .env
```

Then, run `npm run build` or `npm run dev` to build.

Start the development server:

```bash
npm start
```

You should now be able to access your local JSON Hero server on [localhost:8787](http://localhost:8787)

> **Note** JSON documents created locally are not persisted across server restarts

### Previewing URLs

We currently use [OpenGraph Ninja](https://opengraph.ninja/) to power some of the Preview URL functionality.

### Deploying to Cloudflare

_Coming Soon_
