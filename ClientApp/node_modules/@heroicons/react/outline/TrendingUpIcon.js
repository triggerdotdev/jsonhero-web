const React = require("react");

function TrendingUpIcon(props, svgRef) {
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
    d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
  }));
}

const ForwardRef = React.forwardRef(TrendingUpIcon);
module.exports = ForwardRef;