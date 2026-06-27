const React = require("react");

function MinusCircleIcon(props, svgRef) {
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
    d: "M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
  }));
}

const ForwardRef = React.forwardRef(MinusCircleIcon);
module.exports = ForwardRef;