# Hey, Listen!

### Dev-ex warning functions with added childhood flashbacks

[![npm version](https://img.shields.io/npm/v/hey-listen.svg?style=flat-square)](https://www.npmjs.com/package/hey-listen)
[![npm downloads](https://img.shields.io/npm/dm/hey-listen.svg?style=flat-square)](https://www.npmjs.com/package/hey-listen)
[![Twitter Follow](https://img.shields.io/twitter/follow/popmotionjs.svg?style=social&label=Follow)](http://twitter.com/popmotionjs)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/popmotion)

Hey, Listen! provides simple versions of the popular `warning` and `invariant` dev-experience functions.

The library checks against `process.env.NODE_ENV` to minify away messages in production.

## Install

### npm

```bash
npm install hey-listen
```

### Yarn

```bash
yarn add hey-listen
```

## Usage

### `warning`

```javascript
import { warning } from 'hey-listen';

warning(false, 'Warning message'); // console.warn "Warning message"
```

### `invariant`

```javascript
import { invariant } from 'hey-listen';

invariant(false, 'Error message'); // throws "Error message"
```
