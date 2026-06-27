import * as React from "react";

function ChevronDoubleDownIcon(props, svgRef) {
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
    d: "M19 13l-7 7-7-7m14-8l-7 7-7-7"
  }));
}

const ForwardRef = React.forwardRef(ChevronDoubleDownIcon);
export default ForwardRef;