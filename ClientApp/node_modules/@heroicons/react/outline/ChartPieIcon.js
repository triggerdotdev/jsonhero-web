const React = require("react");

function ChartPieIcon(props, svgRef) {
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
    d: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
  }), /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
  }));
}

const ForwardRef = React.forwardRef(ChartPieIcon);
module.exports = ForwardRef;