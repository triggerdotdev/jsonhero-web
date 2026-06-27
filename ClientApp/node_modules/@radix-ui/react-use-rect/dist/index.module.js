import{observeElementRect as t}from"@radix-ui/rect";import*as r from"react";export function useRect(e){const[o,c]=r.useState();return r.useEffect((()=>{if(e){const r=t(e,c);return()=>{c(void 0),r()}}}),[e]),o}
//# sourceMappingURL=index.module.js.map
