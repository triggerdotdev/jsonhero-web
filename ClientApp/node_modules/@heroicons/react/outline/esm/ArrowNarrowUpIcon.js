import * as React from "react";

function ArrowNarrowUpIcon(props, svgRef) {
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
    d: "M8 7l4-4m0 0l4 4m-4-4v18"
  }));
}

const ForwardRef = React.forwardRef(ArrowNarrowUpIcon);
export default ForwardRef;