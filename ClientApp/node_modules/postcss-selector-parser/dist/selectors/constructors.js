"use strict";

exports.__esModule = true;
exports.universal = exports.tag = exports.string = exports.selector = exports.root = exports.pseudo = exports.nesting = exports.id = exports.comment = exports.combinator = exports.className = exports.attribute = void 0;
var _attribute = _interopRequireDefault(require("./attribute"));
var _className = _interopRequireDefault(require("./className"));
var _combinator = _interopRequireDefault(require("./combinator"));
var _comment = _interopRequireDefault(require("./comment"));
var _id = _interopRequireDefault(require("./id"));
var _nesting = _interopRequireDefault(require("./nesting"));
var _pseudo = _interopRequireDefault(require("./pseudo"));
var _root = _interopRequireDefault(require("./root"));
var _selector = _interopRequireDefault(require("./selector"));
var _string = _interopRequireDefault(require("./string"));
var _tag = _interopRequireDefault(require("./tag"));
var _universal = _interopRequireDefault(require("./universal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var attribute = exports.attribute = function attribute(opts) {
  return new _attribute["default"](opts);
};
var className = exports.className = function className(opts) {
  return new _className["default"](opts);
};
var combinator = exports.combinator = function combinator(opts) {
  return new _combinator["default"](opts);
};
var comment = exports.comment = function comment(opts) {
  return new _comment["default"](opts);
};
var id = exports.id = function id(opts) {
  return new _id["default"](opts);
};
var nesting = exports.nesting = function nesting(opts) {
  return new _nesting["default"](opts);
};
var pseudo = exports.pseudo = function pseudo(opts) {
  return new _pseudo["default"](opts);
};
var root = exports.root = function root(opts) {
  return new _root["default"](opts);
};
var selector = exports.selector = function selector(opts) {
  return new _selector["default"](opts);
};
var string = exports.string = function string(opts) {
  return new _string["default"](opts);
};
var tag = exports.tag = function tag(opts) {
  return new _tag["default"](opts);
};
var universal = exports.universal = function universal(opts) {
  return new _universal["default"](opts);
};