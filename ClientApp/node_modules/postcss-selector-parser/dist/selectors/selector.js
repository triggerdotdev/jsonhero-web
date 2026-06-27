"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _container = _interopRequireDefault(require("./container"));
var _types = require("./types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var Selector = exports["default"] = /*#__PURE__*/function (_Container) {
  _inheritsLoose(Selector, _Container);
  function Selector(opts) {
    var _this;
    _this = _Container.call(this, opts) || this;
    _this.type = _types.SELECTOR;
    return _this;
  }
  return Selector;
}(_container["default"]);
module.exports = exports.default;