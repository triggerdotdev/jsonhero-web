import { useConstant } from './use-constant.mjs';

var counter = 0;
var incrementId = function () { return counter++; };
var useId = function () { return useConstant(incrementId); };
/**
 * Ideally we'd use the following code to support React 18 optionally.
 * But this fairly fails in Webpack (otherwise treeshaking wouldn't work at all).
 * Need to come up with a different way of figuring this out.
 */
// export const useId = (React as any).useId
//     ? (React as any).useId
//     : () => useConstant(incrementId)

export { useId };
