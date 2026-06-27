"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _processor = _interopRequireDefault(require("./processor"));
var selectors = _interopRequireWildcard(require("./selectors"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) { "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); } return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var parser = function parser(processor) {
  return new _processor["default"](processor);
};
Object.assign(parser, selectors);
delete parser.__esModule;
var _default = exports["default"] = parser;
module.exports = exports.default;