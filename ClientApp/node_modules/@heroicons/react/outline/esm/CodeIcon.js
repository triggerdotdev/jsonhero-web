import * as React from "react";

function CodeIcon(props, svgRef) {
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
    d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
  }));
}

const ForwardRef = React.forwardRef(CodeIcon);
export default ForwardRef;