"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _node = _interopRequireDefault(require("./node"));
var _types = require("./types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var Comment = exports["default"] = /*#__PURE__*/function (_Node) {
  _inheritsLoose(Comment, _Node);
  function Comment(opts) {
    var _this;
    _this = _Node.call(this, opts) || this;
    _this.type = _types.COMMENT;
    return _this;
  }
  return Comment;
}(_node["default"]);
module.exports = exports.default;