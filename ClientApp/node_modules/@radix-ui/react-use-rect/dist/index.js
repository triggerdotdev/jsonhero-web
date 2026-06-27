var e,t,r=require("@radix-ui/rect").observeElementRect,u=(e={},t=require("react"),Object.keys(t).forEach((function(r){"default"!==r&&"__esModule"!==r&&Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[r]}})})),e);exports.useRect=function(e){const[t,n]=u.useState();return u.useEffect((()=>{if(e){const t=r(e,n);return()=>{n(void 0),t()}}}),[e]),t};
//# sourceMappingURL=index.js.map
