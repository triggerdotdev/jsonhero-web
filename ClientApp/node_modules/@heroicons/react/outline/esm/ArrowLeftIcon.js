import * as React from "react";

function ArrowLeftIcon(props, svgRef) {
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
    d: "M10 19l-7-7m0 0l7-7m-7 7h18"
  }));
}

const ForwardRef = React.forwardRef(ArrowLeftIcon);
export default ForwardRef;