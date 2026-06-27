(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.heyListen = {}));
}(this, function (exports) { 'use strict';

  exports.warning = function () { };
  exports.invariant = function () { };
  if (process.env.NODE_ENV !== 'production') {
      exports.warning = function (check, message) {
          if (!check && typeof console !== 'undefined') {
              console.warn(message);
          }
      };
      exports.invariant = function (check, message) {
          if (!check) {
              throw new Error(message);
          }
      };
  }

  Object.defineProperty(exports, '__esModule', { value: true });

}));
