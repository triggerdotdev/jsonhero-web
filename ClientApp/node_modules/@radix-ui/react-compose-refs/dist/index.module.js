import*as o from"react";export function composeRefs(...o){return e=>o.forEach((o=>function(o,e){"function"==typeof o?o(e):null!=o&&(o.current=e)}(o,e)))}export function useComposedRefs(...e){return o.useCallback(composeRefs(...e),e)}
//# sourceMappingURL=index.module.js.map
