## ⚡️ JSON Hero Contributing Guide

First of all, thanks for considering contributing to this project! If you have any questions please don't hesitate to reach out to [eric@jsonhero.io](mailto:eric@jsonhero.io) or join us on [Discord](https://discord.gg/JtBAxBr2m3).

JSON Hero is a Typescript React application built with [remix.run](https://remix.run), with support for deploying to Cloudflare workers.

To get started with contributing, please read our [Development guide](https://github.com/triggerdotdev/jsonhero-web/blob/main/DEVELOPMENT.md) first to get JSON Hero running locally.

### Running tests

Although there is less test-coverage for JSON Hero than there should be, tests should still be run to ensure builds have not been broken:

```bash
npm test
```

You can also run tests in "watch" mode:

```bash
npm run test:watch
```

### Making changes

Please make any changes to your forked repository in a branch other than `main`. If you are working on a bug fix, please use the `bug/` prefix for your branch name. If you are working on a feature, please use `features/`. If you are working on a specific issue please name the branch `issue-<issue number>`

Make sure to run the `npm lint` command to ensure there are no Typescript compile-time errors.

### Pull Requests

Please open a Pull Request against the `main` branch in the `triggerdotdev/jsonhero-web` repository. We will aim to address all newly opened PRs by the following Friday. If you haven't opened a Pull Request before, please check out GitHub's [Pull Request documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests)

### Other JSON Hero projects

If you'd like to contribute to the [VSCode extension](https://marketplace.visualstudio.com/items?itemName=JSONHero.jsonhero-vscode), please see the [triggerdotdev/vscode-extension](https://github.com/triggerdotdev/vscode-extension) repo.

For issues related to the JSON Schema inference, please check out [triggerdotdev/schema-infer](https://github.com/triggerdotdev/schema-infer).

The "Smart Preview" feature is in-part powered by the [@jsonhero/json-infer-types](https://github.com/triggerdotdev/json-infer-types) project.

If it's related to the Search functionality, please see the [triggerdotdev/fuzzy-json-search](https://github.com/triggerdotdev/fuzzy-json-search) repo.
