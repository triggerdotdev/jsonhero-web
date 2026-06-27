const React = require("react");

function ArrowSmLeftIcon(props, svgRef) {
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
    d: "M11 17l-5-5m0 0l5-5m-5 5h12"
  }));
}

const ForwardRef = React.forwardRef(ArrowSmLeftIcon);
module.exports = ForwardRef;