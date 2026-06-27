import * as React from "react";

function ArrowSmUpIcon(props, svgRef) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    stroke: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M7 11l5-5m0 0l5 5m-5-5v12"
  }));
}

const ForwardRef = React.forwardRef(ArrowSmUpIcon);
export default ForwardRef;