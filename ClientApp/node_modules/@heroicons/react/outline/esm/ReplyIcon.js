import * as React from "react";

function ReplyIcon(props, svgRef) {
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
    d: "M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
  }));
}

const ForwardRef = React.forwardRef(ReplyIcon);
export default ForwardRef;