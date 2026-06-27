"use strict";

exports.__esModule = true;
exports.unesc = exports.stripComments = exports.resolveMaxNestingDepth = exports.getProp = exports.ensureObject = exports.MAX_NESTING_DEPTH = void 0;
var _unesc = _interopRequireDefault(require("./unesc"));
exports.unesc = _unesc["default"];
var _getProp = _interopRequireDefault(require("./getProp"));
exports.getProp = _getProp["default"];
var _ensureObject = _interopRequireDefault(require("./ensureObject"));
exports.ensureObject = _ensureObject["default"];
var _stripComments = _interopRequireDefault(require("./stripComments"));
exports.stripComments = _stripComments["default"];
var _maxNestingDepth = _interopRequireWildcard(require("./maxNestingDepth"));
exports.resolveMaxNestingDepth = _maxNestingDepth["default"];
exports.MAX_NESTING_DEPTH = _maxNestingDepth.MAX_NESTING_DEPTH;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) { "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); } return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }