"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _container = _interopRequireDefault(require("./container"));
var _types = require("./types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var Pseudo = exports["default"] = /*#__PURE__*/function (_Container) {
  _inheritsLoose(Pseudo, _Container);
  function Pseudo(opts) {
    var _this;
    _this = _Container.call(this, opts) || this;
    _this.type = _types.PSEUDO;
    return _this;
  }
  var _proto = Pseudo.prototype;
  _proto._stringify = function _stringify(options, depth, max) {
    var _this2 = this;
    if (depth >= max) {
      throw new Error("Cannot serialize selector: nesting depth exceeds the maximum of " + max + ".");
    }
    var params = this.length ? '(' + this.map(function (child) {
      return _this2._stringifyChild(child, options, depth + 1, max);
    }).join(',') + ')' : '';
    return [this.rawSpaceBefore, this.stringifyProperty("value"), params, this.rawSpaceAfter].join('');
  };
  return Pseudo;
}(_container["default"]);
module.exports = exports.default;