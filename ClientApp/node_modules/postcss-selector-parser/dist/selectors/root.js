"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _container = _interopRequireDefault(require("./container"));
var _types = require("./types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var Root = exports["default"] = /*#__PURE__*/function (_Container) {
  _inheritsLoose(Root, _Container);
  function Root(opts) {
    var _this;
    _this = _Container.call(this, opts) || this;
    _this.type = _types.ROOT;
    return _this;
  }
  var _proto = Root.prototype;
  _proto._stringify = function _stringify(options, depth, max) {
    var _this2 = this;
    var str = this.reduce(function (memo, selector) {
      memo.push(_this2._stringifyChild(selector, options, depth, max));
      return memo;
    }, []).join(',');
    return this.trailingComma ? str + ',' : str;
  };
  _proto.error = function error(message, options) {
    if (this._error) {
      return this._error(message, options);
    } else {
      return new Error(message);
    }
  };
  _createClass(Root, [{
    key: "errorGenerator",
    set: function set(handler) {
      this._error = handler;
    }
  }]);
  return Root;
}(_container["default"]);
module.exports = exports.default;