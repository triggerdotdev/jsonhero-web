const React = require("react");

function ArrowNarrowDownIcon(props, svgRef) {
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
    d: "M16 17l-4 4m0 0l-4-4m4 4V3"
  }));
}

const ForwardRef = React.forwardRef(ArrowNarrowDownIcon);
module.exports = ForwardRef;