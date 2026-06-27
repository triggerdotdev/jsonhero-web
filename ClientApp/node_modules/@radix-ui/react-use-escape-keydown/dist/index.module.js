import{useCallbackRef as e}from"@radix-ui/react-use-callback-ref";import*as t from"react";export function useEscapeKeydown(n){const o=e(n);t.useEffect((()=>{const e=e=>{"Escape"===e.key&&o(e)};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)}),[o])}
//# sourceMappingURL=index.module.js.map
