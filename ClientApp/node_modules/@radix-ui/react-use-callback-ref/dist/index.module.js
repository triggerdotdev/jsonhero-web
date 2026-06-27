import*as e from"react";export function useCallbackRef(r){const t=e.useRef(r);return e.useEffect((()=>{t.current=r})),e.useMemo((()=>(...e)=>{var r;return null===(r=t.current)||void 0===r?void 0:r.call(t,...e)}),[])}
//# sourceMappingURL=index.module.js.map
