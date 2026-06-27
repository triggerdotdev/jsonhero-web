// This is an alternate entry point that polyfills Temporal onto the global
// object. This is used only for the browser playground and the test262 tests.
// See the note in index.mjs.

import * as Temporal from './temporal';
import * as Intl from './intl';
import { toTemporalInstant } from './legacydate';

Object.defineProperty(globalThis, 'Temporal', {
  value: {},
  writable: true,
  enumerable: false,
  configurable: true
});
const globalTemporal = (globalThis as any).Temporal;
copy(globalTemporal, Temporal);
Object.defineProperty(globalTemporal, Symbol.toStringTag, {
  value: 'Temporal',
  writable: false,
  enumerable: false,
  configurable: true
});
copy(globalTemporal.Now, Temporal.Now);
copy(globalThis.Intl, Intl);
Object.defineProperty(globalThis.Date.prototype, 'toTemporalInstant', {
  value: toTemporalInstant,
  writable: true,
  enumerable: false,
  configurable: true
});

function copy(target: Record<string | number | symbol, unknown>, source: Record<string | number | symbol, unknown>) {
  for (const prop of Object.getOwnPropertyNames(source)) {
    Object.defineProperty(target, prop, {
      value: source[prop],
      writable: true,
      enumerable: false,
      configurable: true
    });
  }
}

export { Temporal, Intl, toTemporalInstant };
