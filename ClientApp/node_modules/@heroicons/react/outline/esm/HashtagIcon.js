import * as React from "react";

function HashtagIcon(props, svgRef) {
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
    d: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
  }));
}

const ForwardRef = React.forwardRef(HashtagIcon);
export default ForwardRef;