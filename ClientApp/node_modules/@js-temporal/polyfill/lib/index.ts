// This entry point treats Temporal as a library, and does not polyfill it onto
// the global object.
// This is in order to avoid breaking the web in the future, if the polyfill
// gains wide adoption before the API is finalized. We do not want checks such
// as `if (typeof Temporal === 'undefined')` in the wild, until browsers start
// shipping the finalized API.

import * as Temporal from './temporal';
import * as Intl from './intl';
import { toTemporalInstant } from './legacydate';
export { Temporal, Intl, toTemporalInstant };
