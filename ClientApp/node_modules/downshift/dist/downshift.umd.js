(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Downshift = {}, global.React));
})(this, (function (exports, react) { 'use strict';

  var propTypes$3 = {exports: {}};

  var reactIs$1 = {exports: {}};

  var reactIs_development$1 = {};

  /** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */



  {
    (function() {

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
  // (unstable) APIs that have been removed. Can we remove the symbols?

  var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
  var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
  var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
  var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
  var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
  var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
  var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
  }

  function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
      var $$typeof = object.$$typeof;

      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = object.type;

          switch (type) {
            case REACT_ASYNC_MODE_TYPE:
            case REACT_CONCURRENT_MODE_TYPE:
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
            case REACT_SUSPENSE_TYPE:
              return type;

            default:
              var $$typeofType = type && type.$$typeof;

              switch ($$typeofType) {
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_LAZY_TYPE:
                case REACT_MEMO_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;

                default:
                  return $$typeof;
              }

          }

        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }

    return undefined;
  } // AsyncMode is deprecated along with isAsyncMode

  var AsyncMode = REACT_ASYNC_MODE_TYPE;
  var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  var ContextConsumer = REACT_CONTEXT_TYPE;
  var ContextProvider = REACT_PROVIDER_TYPE;
  var Element = REACT_ELEMENT_TYPE;
  var ForwardRef = REACT_FORWARD_REF_TYPE;
  var Fragment = REACT_FRAGMENT_TYPE;
  var Lazy = REACT_LAZY_TYPE;
  var Memo = REACT_MEMO_TYPE;
  var Portal = REACT_PORTAL_TYPE;
  var Profiler = REACT_PROFILER_TYPE;
  var StrictMode = REACT_STRICT_MODE_TYPE;
  var Suspense = REACT_SUSPENSE_TYPE;
  var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

  function isAsyncMode(object) {
    {
      if (!hasWarnedAboutDeprecatedIsAsyncMode) {
        hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

        console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
      }
    }

    return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
  }
  function isConcurrentMode(object) {
    return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
  }
  function isContextConsumer(object) {
    return typeOf(object) === REACT_CONTEXT_TYPE;
  }
  function isContextProvider(object) {
    return typeOf(object) === REACT_PROVIDER_TYPE;
  }
  function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function isForwardRef(object) {
    return typeOf(object) === REACT_FORWARD_REF_TYPE;
  }
  function isFragment(object) {
    return typeOf(object) === REACT_FRAGMENT_TYPE;
  }
  function isLazy(object) {
    return typeOf(object) === REACT_LAZY_TYPE;
  }
  function isMemo(object) {
    return typeOf(object) === REACT_MEMO_TYPE;
  }
  function isPortal(object) {
    return typeOf(object) === REACT_PORTAL_TYPE;
  }
  function isProfiler(object) {
    return typeOf(object) === REACT_PROFILER_TYPE;
  }
  function isStrictMode(object) {
    return typeOf(object) === REACT_STRICT_MODE_TYPE;
  }
  function isSuspense(object) {
    return typeOf(object) === REACT_SUSPENSE_TYPE;
  }

  reactIs_development$1.AsyncMode = AsyncMode;
  reactIs_development$1.ConcurrentMode = ConcurrentMode;
  reactIs_development$1.ContextConsumer = ContextConsumer;
  reactIs_development$1.ContextProvider = ContextProvider;
  reactIs_development$1.Element = Element;
  reactIs_development$1.ForwardRef = ForwardRef;
  reactIs_development$1.Fragment = Fragment;
  reactIs_development$1.Lazy = Lazy;
  reactIs_development$1.Memo = Memo;
  reactIs_development$1.Portal = Portal;
  reactIs_development$1.Profiler = Profiler;
  reactIs_development$1.StrictMode = StrictMode;
  reactIs_development$1.Suspense = Suspense;
  reactIs_development$1.isAsyncMode = isAsyncMode;
  reactIs_development$1.isConcurrentMode = isConcurrentMode;
  reactIs_development$1.isContextConsumer = isContextConsumer;
  reactIs_development$1.isContextProvider = isContextProvider;
  reactIs_development$1.isElement = isElement;
  reactIs_development$1.isForwardRef = isForwardRef;
  reactIs_development$1.isFragment = isFragment;
  reactIs_development$1.isLazy = isLazy;
  reactIs_development$1.isMemo = isMemo;
  reactIs_development$1.isPortal = isPortal;
  reactIs_development$1.isProfiler = isProfiler;
  reactIs_development$1.isStrictMode = isStrictMode;
  reactIs_development$1.isSuspense = isSuspense;
  reactIs_development$1.isValidElementType = isValidElementType;
  reactIs_development$1.typeOf = typeOf;
    })();
  }

  {
    reactIs$1.exports = reactIs_development$1;
  }

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
  	if (val === null || val === undefined) {
  		throw new TypeError('Object.assign cannot be called with null or undefined');
  	}

  	return Object(val);
  }

  function shouldUseNative() {
  	try {
  		if (!Object.assign) {
  			return false;
  		}

  		// Detect buggy property enumeration order in older V8 versions.

  		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
  		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
  		test1[5] = 'de';
  		if (Object.getOwnPropertyNames(test1)[0] === '5') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test2 = {};
  		for (var i = 0; i < 10; i++) {
  			test2['_' + String.fromCharCode(i)] = i;
  		}
  		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
  			return test2[n];
  		});
  		if (order2.join('') !== '0123456789') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test3 = {};
  		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
  			test3[letter] = letter;
  		});
  		if (Object.keys(Object.assign({}, test3)).join('') !==
  				'abcdefghijklmnopqrst') {
  			return false;
  		}

  		return true;
  	} catch (err) {
  		// We don't expect any of the above to throw, but better to be safe.
  		return false;
  	}
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  	var from;
  	var to = toObject(target);
  	var symbols;

  	for (var s = 1; s < arguments.length; s++) {
  		from = Object(arguments[s]);

  		for (var key in from) {
  			if (hasOwnProperty.call(from, key)) {
  				to[key] = from[key];
  			}
  		}

  		if (getOwnPropertySymbols) {
  			symbols = getOwnPropertySymbols(from);
  			for (var i = 0; i < symbols.length; i++) {
  				if (propIsEnumerable.call(from, symbols[i])) {
  					to[symbols[i]] = from[symbols[i]];
  				}
  			}
  		}
  	}

  	return to;
  };

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret$2 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  var ReactPropTypesSecret_1 = ReactPropTypesSecret$2;

  var has$2 = Function.call.bind(Object.prototype.hasOwnProperty);

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var printWarning$1 = function() {};

  {
    var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
    var loggedTypeFailures = {};
    var has$1 = has$2;

    printWarning$1 = function(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) { /**/ }
    };
  }

  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */
  function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
    {
      for (var typeSpecName in typeSpecs) {
        if (has$1(typeSpecs, typeSpecName)) {
          var error;
          // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.
          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              var err = Error(
                (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
                'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
                'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
              );
              err.name = 'Invariant Violation';
              throw err;
            }
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning$1(
              (componentName || 'React class') + ': type specification of ' +
              location + ' `' + typeSpecName + '` is invalid; the type checker ' +
              'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
              'You may have forgotten to pass an argument to the type checker ' +
              'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
              'shape all require an argument).'
            );
          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;

            var stack = getStack ? getStack() : '';

            printWarning$1(
              'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
            );
          }
        }
      }
    }
  }

  /**
   * Resets warning cache when testing.
   *
   * @private
   */
  checkPropTypes$1.resetWarningCache = function() {
    {
      loggedTypeFailures = {};
    }
  };

  var checkPropTypes_1 = checkPropTypes$1;

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactIs$1 = reactIs$1.exports;
  var assign = objectAssign;

  var ReactPropTypesSecret = ReactPropTypesSecret_1;
  var has = has$2;
  var checkPropTypes = checkPropTypes_1;

  var printWarning = function() {};

  {
    printWarning = function(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }

  function emptyFunctionThatReturnsNull() {
    return null;
  }

  var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
    /* global Symbol */
    var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

    /**
     * Returns the iterator method function contained on the iterable object.
     *
     * Be sure to invoke the function with the iterable as context:
     *
     *     var iteratorFn = getIteratorFn(myIterable);
     *     if (iteratorFn) {
     *       var iterator = iteratorFn.call(myIterable);
     *       ...
     *     }
     *
     * @param {?object} maybeIterable
     * @return {?function}
     */
    function getIteratorFn(maybeIterable) {
      var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
      if (typeof iteratorFn === 'function') {
        return iteratorFn;
      }
    }

    /**
     * Collection of methods that allow declaration and validation of props that are
     * supplied to React components. Example usage:
     *
     *   var Props = require('ReactPropTypes');
     *   var MyArticle = React.createClass({
     *     propTypes: {
     *       // An optional string prop named "description".
     *       description: Props.string,
     *
     *       // A required enum prop named "category".
     *       category: Props.oneOf(['News','Photos']).isRequired,
     *
     *       // A prop named "dialog" that requires an instance of Dialog.
     *       dialog: Props.instanceOf(Dialog).isRequired
     *     },
     *     render: function() { ... }
     *   });
     *
     * A more formal specification of how these methods are used:
     *
     *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
     *   decl := ReactPropTypes.{type}(.isRequired)?
     *
     * Each and every declaration produces a function with the same signature. This
     * allows the creation of custom validation functions. For example:
     *
     *  var MyLink = React.createClass({
     *    propTypes: {
     *      // An optional string or URI prop named "href".
     *      href: function(props, propName, componentName) {
     *        var propValue = props[propName];
     *        if (propValue != null && typeof propValue !== 'string' &&
     *            !(propValue instanceof URI)) {
     *          return new Error(
     *            'Expected a string or an URI for ' + propName + ' in ' +
     *            componentName
     *          );
     *        }
     *      }
     *    },
     *    render: function() {...}
     *  });
     *
     * @internal
     */

    var ANONYMOUS = '<<anonymous>>';

    // Important!
    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
    var ReactPropTypes = {
      array: createPrimitiveTypeChecker('array'),
      bigint: createPrimitiveTypeChecker('bigint'),
      bool: createPrimitiveTypeChecker('boolean'),
      func: createPrimitiveTypeChecker('function'),
      number: createPrimitiveTypeChecker('number'),
      object: createPrimitiveTypeChecker('object'),
      string: createPrimitiveTypeChecker('string'),
      symbol: createPrimitiveTypeChecker('symbol'),

      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      elementType: createElementTypeTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker,
      exact: createStrictShapeTypeChecker,
    };

    /**
     * inlined Object.is polyfill to avoid requiring consumers ship their own
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    /*eslint-disable no-self-compare*/
    function is(x, y) {
      // SameValue algorithm
      if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
      }
    }
    /*eslint-enable no-self-compare*/

    /**
     * We use an Error-like object for backward compatibility as people may call
     * PropTypes directly and inspect their output. However, we don't use real
     * Errors anymore. We don't inspect their stack anyway, and creating them
     * is prohibitively expensive if they are created too often, such as what
     * happens in oneOfType() for any type before the one that matched.
     */
    function PropTypeError(message, data) {
      this.message = message;
      this.data = data && typeof data === 'object' ? data: {};
      this.stack = '';
    }
    // Make `instanceof Error` still work for returned errors.
    PropTypeError.prototype = Error.prototype;

    function createChainableTypeChecker(validate) {
      {
        var manualPropTypeCallCache = {};
        var manualPropTypeWarningCount = 0;
      }
      function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;

        if (secret !== ReactPropTypesSecret) {
          if (throwOnDirectAccess) {
            // New behavior only for users of `prop-types` package
            var err = new Error(
              'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
              'Use `PropTypes.checkPropTypes()` to call them. ' +
              'Read more at http://fb.me/use-check-prop-types'
            );
            err.name = 'Invariant Violation';
            throw err;
          } else if (typeof console !== 'undefined') {
            // Old behavior for people using React.PropTypes
            var cacheKey = componentName + ':' + propName;
            if (
              !manualPropTypeCallCache[cacheKey] &&
              // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3
            ) {
              printWarning(
                'You are manually calling a React.PropTypes validation ' +
                'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
                'and will throw in the standalone `prop-types` package. ' +
                'You may be seeing this warning due to a third-party PropTypes ' +
                'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
              );
              manualPropTypeCallCache[cacheKey] = true;
              manualPropTypeWarningCount++;
            }
          }
        }
        if (props[propName] == null) {
          if (isRequired) {
            if (props[propName] === null) {
              return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
            }
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
          }
          return null;
        } else {
          return validate(props, propName, componentName, location, propFullName);
        }
      }

      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);

      return chainedCheckType;
    }

    function createPrimitiveTypeChecker(expectedType) {
      function validate(props, propName, componentName, location, propFullName, secret) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== expectedType) {
          // `propValue` being instance of, say, date/regexp, pass the 'object'
          // check, but we can offer a more precise error message here rather than
          // 'of type `object`'.
          var preciseType = getPreciseType(propValue);

          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
            {expectedType: expectedType}
          );
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }

    function createArrayOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
        }
        var propValue = props[propName];
        if (!Array.isArray(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
        }
        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createElementTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!isValidElement(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createElementTypeTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!ReactIs$1.isValidElementType(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createInstanceTypeChecker(expectedClass) {
      function validate(props, propName, componentName, location, propFullName) {
        if (!(props[propName] instanceof expectedClass)) {
          var expectedClassName = expectedClass.name || ANONYMOUS;
          var actualClassName = getClassName(props[propName]);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues)) {
        {
          if (arguments.length > 1) {
            printWarning(
              'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
              'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
            );
          } else {
            printWarning('Invalid argument supplied to oneOf, expected an array.');
          }
        }
        return emptyFunctionThatReturnsNull;
      }

      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        for (var i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null;
          }
        }

        var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
          var type = getPreciseType(value);
          if (type === 'symbol') {
            return String(value);
          }
          return value;
        });
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
      }
      return createChainableTypeChecker(validate);
    }

    function createObjectOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
        }
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
        }
        for (var key in propValue) {
          if (has(propValue, key)) {
            var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createUnionTypeChecker(arrayOfTypeCheckers) {
      if (!Array.isArray(arrayOfTypeCheckers)) {
        printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') ;
        return emptyFunctionThatReturnsNull;
      }

      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (typeof checker !== 'function') {
          printWarning(
            'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
            'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
          );
          return emptyFunctionThatReturnsNull;
        }
      }

      function validate(props, propName, componentName, location, propFullName) {
        var expectedTypes = [];
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
          if (checkerResult == null) {
            return null;
          }
          if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
            expectedTypes.push(checkerResult.data.expectedType);
          }
        }
        var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
      }
      return createChainableTypeChecker(validate);
    }

    function createNodeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        if (!isNode(props[propName])) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function invalidValidatorError(componentName, location, propFullName, key, type) {
      return new PropTypeError(
        (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
        'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
      );
    }

    function createShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        for (var key in shapeTypes) {
          var checker = shapeTypes[key];
          if (typeof checker !== 'function') {
            return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createStrictShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        // We need to check all keys in case some are required but missing from props.
        var allKeys = assign({}, props[propName], shapeTypes);
        for (var key in allKeys) {
          var checker = shapeTypes[key];
          if (has(shapeTypes, key) && typeof checker !== 'function') {
            return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
          }
          if (!checker) {
            return new PropTypeError(
              'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
              '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
              '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
            );
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error) {
            return error;
          }
        }
        return null;
      }

      return createChainableTypeChecker(validate);
    }

    function isNode(propValue) {
      switch (typeof propValue) {
        case 'number':
        case 'string':
        case 'undefined':
          return true;
        case 'boolean':
          return !propValue;
        case 'object':
          if (Array.isArray(propValue)) {
            return propValue.every(isNode);
          }
          if (propValue === null || isValidElement(propValue)) {
            return true;
          }

          var iteratorFn = getIteratorFn(propValue);
          if (iteratorFn) {
            var iterator = iteratorFn.call(propValue);
            var step;
            if (iteratorFn !== propValue.entries) {
              while (!(step = iterator.next()).done) {
                if (!isNode(step.value)) {
                  return false;
                }
              }
            } else {
              // Iterator will provide entry [k,v] tuples rather than values.
              while (!(step = iterator.next()).done) {
                var entry = step.value;
                if (entry) {
                  if (!isNode(entry[1])) {
                    return false;
                  }
                }
              }
            }
          } else {
            return false;
          }

          return true;
        default:
          return false;
      }
    }

    function isSymbol(propType, propValue) {
      // Native Symbol.
      if (propType === 'symbol') {
        return true;
      }

      // falsy value can't be a Symbol
      if (!propValue) {
        return false;
      }

      // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
      if (propValue['@@toStringTag'] === 'Symbol') {
        return true;
      }

      // Fallback for non-spec compliant Symbols which are polyfilled.
      if (typeof Symbol === 'function' && propValue instanceof Symbol) {
        return true;
      }

      return false;
    }

    // Equivalent of `typeof` but with special handling for array and regexp.
    function getPropType(propValue) {
      var propType = typeof propValue;
      if (Array.isArray(propValue)) {
        return 'array';
      }
      if (propValue instanceof RegExp) {
        // Old webkits (at least until Android 4.0) return 'function' rather than
        // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
        // passes PropTypes.object.
        return 'object';
      }
      if (isSymbol(propType, propValue)) {
        return 'symbol';
      }
      return propType;
    }

    // This handles more types than `getPropType`. Only used for error messages.
    // See `createPrimitiveTypeChecker`.
    function getPreciseType(propValue) {
      if (typeof propValue === 'undefined' || propValue === null) {
        return '' + propValue;
      }
      var propType = getPropType(propValue);
      if (propType === 'object') {
        if (propValue instanceof Date) {
          return 'date';
        } else if (propValue instanceof RegExp) {
          return 'regexp';
        }
      }
      return propType;
    }

    // Returns a string that is postfixed to a warning about an invalid type.
    // For example, "undefined" or "of type array"
    function getPostfixForTypeWarning(value) {
      var type = getPreciseType(value);
      switch (type) {
        case 'array':
        case 'object':
          return 'an ' + type;
        case 'boolean':
        case 'date':
        case 'regexp':
          return 'a ' + type;
        default:
          return type;
      }
    }

    // Returns class name of the object, if any.
    function getClassName(propValue) {
      if (!propValue.constructor || !propValue.constructor.name) {
        return ANONYMOUS;
      }
      return propValue.constructor.name;
    }

    ReactPropTypes.checkPropTypes = checkPropTypes;
    ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
  };

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    var ReactIs = reactIs$1.exports;

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    propTypes$3.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
  }

  var PropTypes = propTypes$3.exports;

  var reactIs = {exports: {}};

  /** @license React v17.0.2
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  if("function"===typeof Symbol&&Symbol.for){var x=Symbol.for;x("react.element");x("react.portal");x("react.fragment");x("react.strict_mode");x("react.profiler");x("react.provider");x("react.context");x("react.forward_ref");x("react.suspense");x("react.suspense_list");x("react.memo");x("react.lazy");x("react.block");x("react.server.block");x("react.fundamental");x("react.debug_trace_mode");x("react.legacy_hidden");}

  var reactIs_development = {};

  /** @license React v17.0.2
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    (function() {

  // ATTENTION
  // When adding new symbols to this file,
  // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var REACT_ELEMENT_TYPE = 0xeac7;
  var REACT_PORTAL_TYPE = 0xeaca;
  var REACT_FRAGMENT_TYPE = 0xeacb;
  var REACT_STRICT_MODE_TYPE = 0xeacc;
  var REACT_PROFILER_TYPE = 0xead2;
  var REACT_PROVIDER_TYPE = 0xeacd;
  var REACT_CONTEXT_TYPE = 0xeace;
  var REACT_FORWARD_REF_TYPE = 0xead0;
  var REACT_SUSPENSE_TYPE = 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = 0xead8;
  var REACT_MEMO_TYPE = 0xead3;
  var REACT_LAZY_TYPE = 0xead4;
  var REACT_BLOCK_TYPE = 0xead9;
  var REACT_SERVER_BLOCK_TYPE = 0xeada;
  var REACT_FUNDAMENTAL_TYPE = 0xead5;
  var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
  var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

  if (typeof Symbol === 'function' && Symbol.for) {
    var symbolFor = Symbol.for;
    REACT_ELEMENT_TYPE = symbolFor('react.element');
    REACT_PORTAL_TYPE = symbolFor('react.portal');
    REACT_FRAGMENT_TYPE = symbolFor('react.fragment');
    REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
    REACT_PROFILER_TYPE = symbolFor('react.profiler');
    REACT_PROVIDER_TYPE = symbolFor('react.provider');
    REACT_CONTEXT_TYPE = symbolFor('react.context');
    REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
    REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
    REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
    REACT_MEMO_TYPE = symbolFor('react.memo');
    REACT_LAZY_TYPE = symbolFor('react.lazy');
    REACT_BLOCK_TYPE = symbolFor('react.block');
    REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
    REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
    symbolFor('react.scope');
    symbolFor('react.opaque.id');
    REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
    symbolFor('react.offscreen');
    REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
  }

  // Filter certain DOM attributes (e.g. src, href) if their values are empty strings.

  var enableScopeAPI = false; // Experimental Create Event Handle API.

  function isValidElementType(type) {
    if (typeof type === 'string' || typeof type === 'function') {
      return true;
    } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


    if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI ) {
      return true;
    }

    if (typeof type === 'object' && type !== null) {
      if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
        return true;
      }
    }

    return false;
  }

  function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
      var $$typeof = object.$$typeof;

      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = object.type;

          switch (type) {
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
            case REACT_SUSPENSE_TYPE:
            case REACT_SUSPENSE_LIST_TYPE:
              return type;

            default:
              var $$typeofType = type && type.$$typeof;

              switch ($$typeofType) {
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_LAZY_TYPE:
                case REACT_MEMO_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;

                default:
                  return $$typeof;
              }

          }

        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }

    return undefined;
  }
  var ContextConsumer = REACT_CONTEXT_TYPE;
  var ContextProvider = REACT_PROVIDER_TYPE;
  var Element = REACT_ELEMENT_TYPE;
  var ForwardRef = REACT_FORWARD_REF_TYPE;
  var Fragment = REACT_FRAGMENT_TYPE;
  var Lazy = REACT_LAZY_TYPE;
  var Memo = REACT_MEMO_TYPE;
  var Portal = REACT_PORTAL_TYPE;
  var Profiler = REACT_PROFILER_TYPE;
  var StrictMode = REACT_STRICT_MODE_TYPE;
  var Suspense = REACT_SUSPENSE_TYPE;
  var hasWarnedAboutDeprecatedIsAsyncMode = false;
  var hasWarnedAboutDeprecatedIsConcurrentMode = false; // AsyncMode should be deprecated

  function isAsyncMode(object) {
    {
      if (!hasWarnedAboutDeprecatedIsAsyncMode) {
        hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

        console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
      }
    }

    return false;
  }
  function isConcurrentMode(object) {
    {
      if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
        hasWarnedAboutDeprecatedIsConcurrentMode = true; // Using console['warn'] to evade Babel and ESLint

        console['warn']('The ReactIs.isConcurrentMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
      }
    }

    return false;
  }
  function isContextConsumer(object) {
    return typeOf(object) === REACT_CONTEXT_TYPE;
  }
  function isContextProvider(object) {
    return typeOf(object) === REACT_PROVIDER_TYPE;
  }
  function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function isForwardRef(object) {
    return typeOf(object) === REACT_FORWARD_REF_TYPE;
  }
  function isFragment(object) {
    return typeOf(object) === REACT_FRAGMENT_TYPE;
  }
  function isLazy(object) {
    return typeOf(object) === REACT_LAZY_TYPE;
  }
  function isMemo(object) {
    return typeOf(object) === REACT_MEMO_TYPE;
  }
  function isPortal(object) {
    return typeOf(object) === REACT_PORTAL_TYPE;
  }
  function isProfiler(object) {
    return typeOf(object) === REACT_PROFILER_TYPE;
  }
  function isStrictMode(object) {
    return typeOf(object) === REACT_STRICT_MODE_TYPE;
  }
  function isSuspense(object) {
    return typeOf(object) === REACT_SUSPENSE_TYPE;
  }

  reactIs_development.ContextConsumer = ContextConsumer;
  reactIs_development.ContextProvider = ContextProvider;
  reactIs_development.Element = Element;
  reactIs_development.ForwardRef = ForwardRef;
  reactIs_development.Fragment = Fragment;
  reactIs_development.Lazy = Lazy;
  reactIs_development.Memo = Memo;
  reactIs_development.Portal = Portal;
  reactIs_development.Profiler = Profiler;
  reactIs_development.StrictMode = StrictMode;
  reactIs_development.Suspense = Suspense;
  reactIs_development.isAsyncMode = isAsyncMode;
  reactIs_development.isConcurrentMode = isConcurrentMode;
  reactIs_development.isContextConsumer = isContextConsumer;
  reactIs_development.isContextProvider = isContextProvider;
  reactIs_development.isElement = isElement;
  reactIs_development.isForwardRef = isForwardRef;
  reactIs_development.isFragment = isFragment;
  reactIs_development.isLazy = isLazy;
  reactIs_development.isMemo = isMemo;
  reactIs_development.isPortal = isPortal;
  reactIs_development.isProfiler = isProfiler;
  reactIs_development.isStrictMode = isStrictMode;
  reactIs_development.isSuspense = isSuspense;
  reactIs_development.isValidElementType = isValidElementType;
  reactIs_development.typeOf = typeOf;
    })();
  }

  {
    reactIs.exports = reactIs_development;
  }

  function t(t){return "object"==typeof t&&null!=t&&1===t.nodeType}function e(t,e){return (!e||"hidden"!==t)&&"visible"!==t&&"clip"!==t}function n(t,n){if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){var r=getComputedStyle(t,null);return e(r.overflowY,n)||e(r.overflowX,n)||function(t){var e=function(t){if(!t.ownerDocument||!t.ownerDocument.defaultView)return null;try{return t.ownerDocument.defaultView.frameElement}catch(t){return null}}(t);return !!e&&(e.clientHeight<t.scrollHeight||e.clientWidth<t.scrollWidth)}(t)}return !1}function r(t,e,n,r,i,o,l,d){return o<t&&l>e||o>t&&l<e?0:o<=t&&d<=n||l>=e&&d>=n?o-t-r:l>e&&d<n||o<t&&d>n?l-e+i:0}function computeScrollIntoView(e,i){var o=window,l=i.scrollMode,d=i.block,u=i.inline,h=i.boundary,a=i.skipOverflowHiddenElements,c="function"==typeof h?h:function(t){return t!==h};if(!t(e))throw new TypeError("Invalid target");for(var f=document.scrollingElement||document.documentElement,s=[],p=e;t(p)&&c(p);){if((p=p.parentElement)===f){s.push(p);break}null!=p&&p===document.body&&n(p)&&!n(document.documentElement)||null!=p&&n(p,a)&&s.push(p);}for(var m=o.visualViewport?o.visualViewport.width:innerWidth,g=o.visualViewport?o.visualViewport.height:innerHeight,w=window.scrollX||pageXOffset,v=window.scrollY||pageYOffset,W=e.getBoundingClientRect(),b=W.height,H=W.width,y=W.top,E=W.right,M=W.bottom,V=W.left,x="start"===d||"nearest"===d?y:"end"===d?M:y+b/2,I="center"===u?V+H/2:"end"===u?E:V,C=[],T=0;T<s.length;T++){var k=s[T],B=k.getBoundingClientRect(),D=B.height,O=B.width,R=B.top,X=B.right,Y=B.bottom,L=B.left;if("if-needed"===l&&y>=0&&V>=0&&M<=g&&E<=m&&y>=R&&M<=Y&&V>=L&&E<=X)return C;var S=getComputedStyle(k),j=parseInt(S.borderLeftWidth,10),q=parseInt(S.borderTopWidth,10),z=parseInt(S.borderRightWidth,10),A=parseInt(S.borderBottomWidth,10),F=0,G=0,J="offsetWidth"in k?k.offsetWidth-k.clientWidth-j-z:0,K="offsetHeight"in k?k.offsetHeight-k.clientHeight-q-A:0;if(f===k)F="start"===d?x:"end"===d?x-g:"nearest"===d?r(v,v+g,g,q,A,v+x,v+x+b,b):x-g/2,G="start"===u?I:"center"===u?I-m/2:"end"===u?I-m:r(w,w+m,m,j,z,w+I,w+I+H,H),F=Math.max(0,F+v),G=Math.max(0,G+w);else {F="start"===d?x-R-q:"end"===d?x-Y+A+K:"nearest"===d?r(R,Y,D,q,A+K,x,x+b,b):x-(R+D/2)+K/2,G="start"===u?I-L-j:"center"===u?I-(L+O/2)+J/2:"end"===u?I-X+z+J:r(L,X,O,j,z+J,I,I+H,H);var N=k.scrollLeft,P=k.scrollTop;x+=P-(F=Math.max(0,Math.min(P+F,k.scrollHeight-D+K))),I+=N-(G=Math.max(0,Math.min(N+G,k.scrollWidth-O+J)));}C.push({el:k,top:F,left:G});}return C}

  let idCounter = 0;
  /**
   * Accepts a parameter and returns it if it's a function
   * or a noop function if it's not. This allows us to
   * accept a callback, but not worry about it if it's not
   * passed.
   * @param {Function} cb the callback
   * @return {Function} a function
   */

  function cbToCb(cb) {
    return typeof cb === 'function' ? cb : noop;
  }

  function noop() {}
  /**
   * Scroll node into view if necessary
   * @param {HTMLElement} node the element that should scroll into view
   * @param {HTMLElement} menuNode the menu element of the component
   */


  function scrollIntoView(node, menuNode) {
    if (!node) {
      return;
    }

    const actions = computeScrollIntoView(node, {
      boundary: menuNode,
      block: 'nearest',
      scrollMode: 'if-needed'
    });
    actions.forEach(_ref => {
      let {
        el,
        top,
        left
      } = _ref;
      el.scrollTop = top;
      el.scrollLeft = left;
    });
  }
  /**
   * @param {HTMLElement} parent the parent node
   * @param {HTMLElement} child the child node
   * @param {Window} environment The window context where downshift renders.
   * @return {Boolean} whether the parent is the child or the child is in the parent
   */


  function isOrContainsNode(parent, child, environment) {
    const result = parent === child || child instanceof environment.Node && parent.contains && parent.contains(child);
    return result;
  }
  /**
   * Simple debounce implementation. Will call the given
   * function once after the time given has passed since
   * it was last called.
   * @param {Function} fn the function to call after the time
   * @param {Number} time the time to wait
   * @return {Function} the debounced function
   */


  function debounce(fn, time) {
    let timeoutId;

    function cancel() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }

    function wrapper() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      cancel();
      timeoutId = setTimeout(() => {
        timeoutId = null;
        fn(...args);
      }, time);
    }

    wrapper.cancel = cancel;
    return wrapper;
  }
  /**
   * This is intended to be used to compose event handlers.
   * They are executed in order until one of them sets
   * `event.preventDownshiftDefault = true`.
   * @param {...Function} fns the event handler functions
   * @return {Function} the event handler to add to an element
   */


  function callAllEventHandlers() {
    for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      fns[_key2] = arguments[_key2];
    }

    return function (event) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      return fns.some(fn => {
        if (fn) {
          fn(event, ...args);
        }

        return event.preventDownshiftDefault || event.hasOwnProperty('nativeEvent') && event.nativeEvent.preventDownshiftDefault;
      });
    };
  }

  function handleRefs() {
    for (var _len4 = arguments.length, refs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      refs[_key4] = arguments[_key4];
    }

    return node => {
      refs.forEach(ref => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      });
    };
  }
  /**
   * This generates a unique ID for an instance of Downshift
   * @return {String} the unique ID
   */


  function generateId() {
    return String(idCounter++);
  }
  /**
   * Resets idCounter to 0. Used for SSR.
   */


  function resetIdCounter() {
    idCounter = 0;
  }
  /**
   * Default implementation for status message. Only added when menu is open.
   * Will specify if there are results in the list, and if so, how many,
   * and what keys are relevant.
   *
   * @param {Object} param the downshift state and other relevant properties
   * @return {String} the a11y status message
   */


  function getA11yStatusMessage$1(_ref2) {
    let {
      isOpen,
      resultCount,
      previousResultCount
    } = _ref2;

    if (!isOpen) {
      return '';
    }

    if (!resultCount) {
      return 'No results are available.';
    }

    if (resultCount !== previousResultCount) {
      return `${resultCount} result${resultCount === 1 ? ' is' : 's are'} available, use up and down arrow keys to navigate. Press Enter key to select.`;
    }

    return '';
  }
  /**
   * Takes an argument and if it's an array, returns the first item in the array
   * otherwise returns the argument
   * @param {*} arg the maybe-array
   * @param {*} defaultValue the value if arg is falsey not defined
   * @return {*} the arg or it's first item
   */


  function unwrapArray(arg, defaultValue) {
    arg = Array.isArray(arg) ?
    /* istanbul ignore next (preact) */
    arg[0] : arg;

    if (!arg && defaultValue) {
      return defaultValue;
    } else {
      return arg;
    }
  }
  /**
   * @param {Object} element (P)react element
   * @return {Boolean} whether it's a DOM element
   */


  function isDOMElement(element) {


    return typeof element.type === 'string';
  }
  /**
   * @param {Object} element (P)react element
   * @return {Object} the props
   */


  function getElementProps(element) {

    return element.props;
  }
  /**
   * Throws a helpful error message for required properties. Useful
   * to be used as a default in destructuring or object params.
   * @param {String} fnName the function name
   * @param {String} propName the prop name
   */


  function requiredProp(fnName, propName) {
    // eslint-disable-next-line no-console
    console.error(`The property "${propName}" is required in "${fnName}"`);
  }

  const stateKeys = ['highlightedIndex', 'inputValue', 'isOpen', 'selectedItem', 'type'];
  /**
   * @param {Object} state the state object
   * @return {Object} state that is relevant to downshift
   */

  function pickState(state) {
    if (state === void 0) {
      state = {};
    }

    const result = {};
    stateKeys.forEach(k => {
      if (state.hasOwnProperty(k)) {
        result[k] = state[k];
      }
    });
    return result;
  }
  /**
   * This will perform a shallow merge of the given state object
   * with the state coming from props
   * (for the controlled component scenario)
   * This is used in state updater functions so they're referencing
   * the right state regardless of where it comes from.
   *
   * @param {Object} state The state of the component/hook.
   * @param {Object} props The props that may contain controlled values.
   * @returns {Object} The merged controlled state.
   */


  function getState(state, props) {
    return Object.keys(state).reduce((prevState, key) => {
      prevState[key] = isControlledProp(props, key) ? props[key] : state[key];
      return prevState;
    }, {});
  }
  /**
   * This determines whether a prop is a "controlled prop" meaning it is
   * state which is controlled by the outside of this component rather
   * than within this component.
   *
   * @param {Object} props The props that may contain controlled values.
   * @param {String} key the key to check
   * @return {Boolean} whether it is a controlled controlled prop
   */


  function isControlledProp(props, key) {
    return props[key] !== undefined;
  }
  /**
   * Normalizes the 'key' property of a KeyboardEvent in IE/Edge
   * @param {Object} event a keyboardEvent object
   * @return {String} keyboard key
   */


  function normalizeArrowKey(event) {
    const {
      key,
      keyCode
    } = event;
    /* istanbul ignore next (ie) */

    if (keyCode >= 37 && keyCode <= 40 && key.indexOf('Arrow') !== 0) {
      return `Arrow${key}`;
    }

    return key;
  }
  /**
   * Simple check if the value passed is object literal
   * @param {*} obj any things
   * @return {Boolean} whether it's object literal
   */


  function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
  /**
   * Returns the new index in the list, in a circular way. If next value is out of bonds from the total,
   * it will wrap to either 0 or itemCount - 1.
   *
   * @param {number} moveAmount Number of positions to move. Negative to move backwards, positive forwards.
   * @param {number} baseIndex The initial position to move from.
   * @param {number} itemCount The total number of items.
   * @param {Function} getItemNodeFromIndex Used to check if item is disabled.
   * @param {boolean} circular Specify if navigation is circular. Default is true.
   * @returns {number} The new index after the move.
   */


  function getNextWrappingIndex(moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular) {
    if (circular === void 0) {
      circular = true;
    }

    if (itemCount === 0) {
      return -1;
    }

    const itemsLastIndex = itemCount - 1;

    if (typeof baseIndex !== 'number' || baseIndex < 0 || baseIndex >= itemCount) {
      baseIndex = moveAmount > 0 ? -1 : itemsLastIndex + 1;
    }

    let newIndex = baseIndex + moveAmount;

    if (newIndex < 0) {
      newIndex = circular ? itemsLastIndex : 0;
    } else if (newIndex > itemsLastIndex) {
      newIndex = circular ? 0 : itemsLastIndex;
    }

    const nonDisabledNewIndex = getNextNonDisabledIndex(moveAmount, newIndex, itemCount, getItemNodeFromIndex, circular);

    if (nonDisabledNewIndex === -1) {
      return baseIndex >= itemCount ? -1 : baseIndex;
    }

    return nonDisabledNewIndex;
  }
  /**
   * Returns the next index in the list of an item that is not disabled.
   *
   * @param {number} moveAmount Number of positions to move. Negative to move backwards, positive forwards.
   * @param {number} baseIndex The initial position to move from.
   * @param {number} itemCount The total number of items.
   * @param {Function} getItemNodeFromIndex Used to check if item is disabled.
   * @param {boolean} circular Specify if navigation is circular. Default is true.
   * @returns {number} The new index. Returns baseIndex if item is not disabled. Returns next non-disabled item otherwise. If no non-disabled found it will return -1.
   */


  function getNextNonDisabledIndex(moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular) {
    const currentElementNode = getItemNodeFromIndex(baseIndex);

    if (!currentElementNode || !currentElementNode.hasAttribute('disabled')) {
      return baseIndex;
    }

    if (moveAmount > 0) {
      for (let index = baseIndex + 1; index < itemCount; index++) {
        if (!getItemNodeFromIndex(index).hasAttribute('disabled')) {
          return index;
        }
      }
    } else {
      for (let index = baseIndex - 1; index >= 0; index--) {
        if (!getItemNodeFromIndex(index).hasAttribute('disabled')) {
          return index;
        }
      }
    }

    if (circular) {
      return moveAmount > 0 ? getNextNonDisabledIndex(1, 0, itemCount, getItemNodeFromIndex, false) : getNextNonDisabledIndex(-1, itemCount - 1, itemCount, getItemNodeFromIndex, false);
    }

    return -1;
  }
  /**
   * Checks if event target is within the downshift elements.
   *
   * @param {EventTarget} target Target to check.
   * @param {HTMLElement[]} downshiftElements The elements that form downshift (list, toggle button etc).
   * @param {Window} environment The window context where downshift renders.
   * @param {boolean} checkActiveElement Whether to also check activeElement.
   *
   * @returns {boolean} Whether or not the target is within downshift elements.
   */


  function targetWithinDownshift(target, downshiftElements, environment, checkActiveElement) {
    if (checkActiveElement === void 0) {
      checkActiveElement = true;
    }

    return downshiftElements.some(contextNode => contextNode && (isOrContainsNode(contextNode, target, environment) || checkActiveElement && isOrContainsNode(contextNode, environment.document.activeElement, environment)));
  } // eslint-disable-next-line import/no-mutable-exports


  let validateControlledUnchanged = noop;
  /* istanbul ignore next */

  {
    validateControlledUnchanged = (state, prevProps, nextProps) => {
      const warningDescription = `This prop should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled Downshift element for the lifetime of the component. More info: https://github.com/downshift-js/downshift#control-props`;
      Object.keys(state).forEach(propKey => {
        if (prevProps[propKey] !== undefined && nextProps[propKey] === undefined) {
          // eslint-disable-next-line no-console
          console.error(`downshift: A component has changed the controlled prop "${propKey}" to be uncontrolled. ${warningDescription}`);
        } else if (prevProps[propKey] === undefined && nextProps[propKey] !== undefined) {
          // eslint-disable-next-line no-console
          console.error(`downshift: A component has changed the uncontrolled prop "${propKey}" to be controlled. ${warningDescription}`);
        }
      });
    };
  }

  const cleanupStatus = debounce(documentProp => {
    getStatusDiv(documentProp).textContent = '';
  }, 500);
  /**
   * @param {String} status the status message
   * @param {Object} documentProp document passed by the user.
   */

  function setStatus(status, documentProp) {
    const div = getStatusDiv(documentProp);

    if (!status) {
      return;
    }

    div.textContent = status;
    cleanupStatus(documentProp);
  }
  /**
   * Get the status node or create it if it does not already exist.
   * @param {Object} documentProp document passed by the user.
   * @return {HTMLElement} the status node.
   */


  function getStatusDiv(documentProp) {
    if (documentProp === void 0) {
      documentProp = document;
    }

    let statusDiv = documentProp.getElementById('a11y-status-message');

    if (statusDiv) {
      return statusDiv;
    }

    statusDiv = documentProp.createElement('div');
    statusDiv.setAttribute('id', 'a11y-status-message');
    statusDiv.setAttribute('role', 'status');
    statusDiv.setAttribute('aria-live', 'polite');
    statusDiv.setAttribute('aria-relevant', 'additions text');
    Object.assign(statusDiv.style, {
      border: '0',
      clip: 'rect(0 0 0 0)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: '0',
      position: 'absolute',
      width: '1px'
    });
    documentProp.body.appendChild(statusDiv);
    return statusDiv;
  }

  const unknown = '__autocomplete_unknown__' ;
  const mouseUp = '__autocomplete_mouseup__' ;
  const itemMouseEnter = '__autocomplete_item_mouseenter__' ;
  const keyDownArrowUp = '__autocomplete_keydown_arrow_up__' ;
  const keyDownArrowDown = '__autocomplete_keydown_arrow_down__' ;
  const keyDownEscape = '__autocomplete_keydown_escape__' ;
  const keyDownEnter = '__autocomplete_keydown_enter__' ;
  const keyDownHome = '__autocomplete_keydown_home__' ;
  const keyDownEnd = '__autocomplete_keydown_end__' ;
  const clickItem = '__autocomplete_click_item__' ;
  const blurInput = '__autocomplete_blur_input__' ;
  const changeInput = '__autocomplete_change_input__' ;
  const keyDownSpaceButton = '__autocomplete_keydown_space_button__' ;
  const clickButton = '__autocomplete_click_button__' ;
  const blurButton = '__autocomplete_blur_button__' ;
  const controlledPropUpdatedSelectedItem = '__autocomplete_controlled_prop_updated_selected_item__' ;
  const touchEnd = '__autocomplete_touchend__' ;

  var stateChangeTypes$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    unknown: unknown,
    mouseUp: mouseUp,
    itemMouseEnter: itemMouseEnter,
    keyDownArrowUp: keyDownArrowUp,
    keyDownArrowDown: keyDownArrowDown,
    keyDownEscape: keyDownEscape,
    keyDownEnter: keyDownEnter,
    keyDownHome: keyDownHome,
    keyDownEnd: keyDownEnd,
    clickItem: clickItem,
    blurInput: blurInput,
    changeInput: changeInput,
    keyDownSpaceButton: keyDownSpaceButton,
    clickButton: clickButton,
    blurButton: blurButton,
    controlledPropUpdatedSelectedItem: controlledPropUpdatedSelectedItem,
    touchEnd: touchEnd
  });

  /* eslint camelcase:0 */

  const Downshift = /*#__PURE__*/(() => {
    class Downshift extends react.Component {
      constructor(_props) {
        var _this;

        super(_props);
        _this = this;
        this.id = this.props.id || `downshift-${generateId()}`;
        this.menuId = this.props.menuId || `${this.id}-menu`;
        this.labelId = this.props.labelId || `${this.id}-label`;
        this.inputId = this.props.inputId || `${this.id}-input`;

        this.getItemId = this.props.getItemId || (index => `${this.id}-item-${index}`);

        this.input = null;
        this.items = [];
        this.itemCount = null;
        this.previousResultCount = 0;
        this.timeoutIds = [];

        this.internalSetTimeout = (fn, time) => {
          const id = setTimeout(() => {
            this.timeoutIds = this.timeoutIds.filter(i => i !== id);
            fn();
          }, time);
          this.timeoutIds.push(id);
        };

        this.setItemCount = count => {
          this.itemCount = count;
        };

        this.unsetItemCount = () => {
          this.itemCount = null;
        };

        this.setHighlightedIndex = function (highlightedIndex, otherStateToSet) {
          if (highlightedIndex === void 0) {
            highlightedIndex = _this.props.defaultHighlightedIndex;
          }

          if (otherStateToSet === void 0) {
            otherStateToSet = {};
          }

          otherStateToSet = pickState(otherStateToSet);

          _this.internalSetState({
            highlightedIndex,
            ...otherStateToSet
          });
        };

        this.clearSelection = cb => {
          this.internalSetState({
            selectedItem: null,
            inputValue: '',
            highlightedIndex: this.props.defaultHighlightedIndex,
            isOpen: this.props.defaultIsOpen
          }, cb);
        };

        this.selectItem = (item, otherStateToSet, cb) => {
          otherStateToSet = pickState(otherStateToSet);
          this.internalSetState({
            isOpen: this.props.defaultIsOpen,
            highlightedIndex: this.props.defaultHighlightedIndex,
            selectedItem: item,
            inputValue: this.props.itemToString(item),
            ...otherStateToSet
          }, cb);
        };

        this.selectItemAtIndex = (itemIndex, otherStateToSet, cb) => {
          const item = this.items[itemIndex];

          if (item == null) {
            return;
          }

          this.selectItem(item, otherStateToSet, cb);
        };

        this.selectHighlightedItem = (otherStateToSet, cb) => {
          return this.selectItemAtIndex(this.getState().highlightedIndex, otherStateToSet, cb);
        };

        this.internalSetState = (stateToSet, cb) => {
          let isItemSelected, onChangeArg;
          const onStateChangeArg = {};
          const isStateToSetFunction = typeof stateToSet === 'function'; // we want to call `onInputValueChange` before the `setState` call
          // so someone controlling the `inputValue` state gets notified of
          // the input change as soon as possible. This avoids issues with
          // preserving the cursor position.
          // See https://github.com/downshift-js/downshift/issues/217 for more info.

          if (!isStateToSetFunction && stateToSet.hasOwnProperty('inputValue')) {
            this.props.onInputValueChange(stateToSet.inputValue, { ...this.getStateAndHelpers(),
              ...stateToSet
            });
          }

          return this.setState(state => {
            state = this.getState(state);
            let newStateToSet = isStateToSetFunction ? stateToSet(state) : stateToSet; // Your own function that could modify the state that will be set.

            newStateToSet = this.props.stateReducer(state, newStateToSet); // checks if an item is selected, regardless of if it's different from
            // what was selected before
            // used to determine if onSelect and onChange callbacks should be called

            isItemSelected = newStateToSet.hasOwnProperty('selectedItem'); // this keeps track of the object we want to call with setState

            const nextState = {}; // this is just used to tell whether the state changed
            // and we're trying to update that state. OR if the selection has changed and we're
            // trying to update the selection

            if (isItemSelected && newStateToSet.selectedItem !== state.selectedItem) {
              onChangeArg = newStateToSet.selectedItem;
            }

            newStateToSet.type = newStateToSet.type || unknown;
            Object.keys(newStateToSet).forEach(key => {
              // onStateChangeArg should only have the state that is
              // actually changing
              if (state[key] !== newStateToSet[key]) {
                onStateChangeArg[key] = newStateToSet[key];
              } // the type is useful for the onStateChangeArg
              // but we don't actually want to set it in internal state.
              // this is an undocumented feature for now... Not all internalSetState
              // calls support it and I'm not certain we want them to yet.
              // But it enables users controlling the isOpen state to know when
              // the isOpen state changes due to mouseup events which is quite handy.


              if (key === 'type') {
                return;
              }

              newStateToSet[key]; // if it's coming from props, then we don't care to set it internally

              if (!isControlledProp(this.props, key)) {
                nextState[key] = newStateToSet[key];
              }
            }); // if stateToSet is a function, then we weren't able to call onInputValueChange
            // earlier, so we'll call it now that we know what the inputValue state will be.

            if (isStateToSetFunction && newStateToSet.hasOwnProperty('inputValue')) {
              this.props.onInputValueChange(newStateToSet.inputValue, { ...this.getStateAndHelpers(),
                ...newStateToSet
              });
            }

            return nextState;
          }, () => {
            // call the provided callback if it's a function
            cbToCb(cb)(); // only call the onStateChange and onChange callbacks if
            // we have relevant information to pass them.

            const hasMoreStateThanType = Object.keys(onStateChangeArg).length > 1;

            if (hasMoreStateThanType) {
              this.props.onStateChange(onStateChangeArg, this.getStateAndHelpers());
            }

            if (isItemSelected) {
              this.props.onSelect(stateToSet.selectedItem, this.getStateAndHelpers());
            }

            if (onChangeArg !== undefined) {
              this.props.onChange(onChangeArg, this.getStateAndHelpers());
            } // this is currently undocumented and therefore subject to change
            // We'll try to not break it, but just be warned.


            this.props.onUserAction(onStateChangeArg, this.getStateAndHelpers());
          });
        };

        this.rootRef = node => this._rootNode = node;

        this.getRootProps = function (_temp, _temp2) {
          let {
            refKey = 'ref',
            ref,
            ...rest
          } = _temp === void 0 ? {} : _temp;
          let {
            suppressRefError = false
          } = _temp2 === void 0 ? {} : _temp2;
          // this is used in the render to know whether the user has called getRootProps.
          // It uses that to know whether to apply the props automatically
          _this.getRootProps.called = true;
          _this.getRootProps.refKey = refKey;
          _this.getRootProps.suppressRefError = suppressRefError;

          const {
            isOpen
          } = _this.getState();

          return {
            [refKey]: handleRefs(ref, _this.rootRef),
            role: 'combobox',
            'aria-expanded': isOpen,
            'aria-haspopup': 'listbox',
            'aria-owns': isOpen ? _this.menuId : null,
            'aria-labelledby': _this.labelId,
            ...rest
          };
        };

        this.keyDownHandlers = {
          ArrowDown(event) {
            event.preventDefault();

            if (this.getState().isOpen) {
              const amount = event.shiftKey ? 5 : 1;
              this.moveHighlightedIndex(amount, {
                type: keyDownArrowDown
              });
            } else {
              this.internalSetState({
                isOpen: true,
                type: keyDownArrowDown
              }, () => {
                const itemCount = this.getItemCount();

                if (itemCount > 0) {
                  const {
                    highlightedIndex
                  } = this.getState();
                  const nextHighlightedIndex = getNextWrappingIndex(1, highlightedIndex, itemCount, index => this.getItemNodeFromIndex(index));
                  this.setHighlightedIndex(nextHighlightedIndex, {
                    type: keyDownArrowDown
                  });
                }
              });
            }
          },

          ArrowUp(event) {
            event.preventDefault();

            if (this.getState().isOpen) {
              const amount = event.shiftKey ? -5 : -1;
              this.moveHighlightedIndex(amount, {
                type: keyDownArrowUp
              });
            } else {
              this.internalSetState({
                isOpen: true,
                type: keyDownArrowUp
              }, () => {
                const itemCount = this.getItemCount();

                if (itemCount > 0) {
                  const {
                    highlightedIndex
                  } = this.getState();
                  const nextHighlightedIndex = getNextWrappingIndex(-1, highlightedIndex, itemCount, index => this.getItemNodeFromIndex(index));
                  this.setHighlightedIndex(nextHighlightedIndex, {
                    type: keyDownArrowUp
                  });
                }
              });
            }
          },

          Enter(event) {
            if (event.which === 229) {
              return;
            }

            const {
              isOpen,
              highlightedIndex
            } = this.getState();

            if (isOpen && highlightedIndex != null) {
              event.preventDefault();
              const item = this.items[highlightedIndex];
              const itemNode = this.getItemNodeFromIndex(highlightedIndex);

              if (item == null || itemNode && itemNode.hasAttribute('disabled')) {
                return;
              }

              this.selectHighlightedItem({
                type: keyDownEnter
              });
            }
          },

          Escape(event) {
            event.preventDefault();
            this.reset({
              type: keyDownEscape,
              ...(!this.state.isOpen && {
                selectedItem: null,
                inputValue: ''
              })
            });
          }

        };
        this.buttonKeyDownHandlers = { ...this.keyDownHandlers,

          ' '(event) {
            event.preventDefault();
            this.toggleMenu({
              type: keyDownSpaceButton
            });
          }

        };
        this.inputKeyDownHandlers = { ...this.keyDownHandlers,

          Home(event) {
            const {
              isOpen
            } = this.getState();

            if (!isOpen) {
              return;
            }

            event.preventDefault();
            const itemCount = this.getItemCount();

            if (itemCount <= 0 || !isOpen) {
              return;
            } // get next non-disabled starting downwards from 0 if that's disabled.


            const newHighlightedIndex = getNextNonDisabledIndex(1, 0, itemCount, index => this.getItemNodeFromIndex(index), false);
            this.setHighlightedIndex(newHighlightedIndex, {
              type: keyDownHome
            });
          },

          End(event) {
            const {
              isOpen
            } = this.getState();

            if (!isOpen) {
              return;
            }

            event.preventDefault();
            const itemCount = this.getItemCount();

            if (itemCount <= 0 || !isOpen) {
              return;
            } // get next non-disabled starting upwards from last index if that's disabled.


            const newHighlightedIndex = getNextNonDisabledIndex(-1, itemCount - 1, itemCount, index => this.getItemNodeFromIndex(index), false);
            this.setHighlightedIndex(newHighlightedIndex, {
              type: keyDownEnd
            });
          }

        };

        this.getToggleButtonProps = function (_temp3) {
          let {
            onClick,
            onPress,
            onKeyDown,
            onKeyUp,
            onBlur,
            ...rest
          } = _temp3 === void 0 ? {} : _temp3;

          const {
            isOpen
          } = _this.getState();

          const enabledEventHandlers = {
            onClick: callAllEventHandlers(onClick, _this.buttonHandleClick),
            onKeyDown: callAllEventHandlers(onKeyDown, _this.buttonHandleKeyDown),
            onKeyUp: callAllEventHandlers(onKeyUp, _this.buttonHandleKeyUp),
            onBlur: callAllEventHandlers(onBlur, _this.buttonHandleBlur)
          };
          const eventHandlers = rest.disabled ? {} : enabledEventHandlers;
          return {
            type: 'button',
            role: 'button',
            'aria-label': isOpen ? 'close menu' : 'open menu',
            'aria-haspopup': true,
            'data-toggle': true,
            ...eventHandlers,
            ...rest
          };
        };

        this.buttonHandleKeyUp = event => {
          // Prevent click event from emitting in Firefox
          event.preventDefault();
        };

        this.buttonHandleKeyDown = event => {
          const key = normalizeArrowKey(event);

          if (this.buttonKeyDownHandlers[key]) {
            this.buttonKeyDownHandlers[key].call(this, event);
          }
        };

        this.buttonHandleClick = event => {
          event.preventDefault(); // handle odd case for Safari and Firefox which
          // don't give the button the focus properly.

          /* istanbul ignore if (can't reasonably test this) */

          if (this.props.environment.document.activeElement === this.props.environment.document.body) {
            event.target.focus();
          } // to simplify testing components that use downshift, we'll not wrap this in a setTimeout
          // if the NODE_ENV is test. With the proper build system, this should be dead code eliminated
          // when building for production and should therefore have no impact on production code.


          {
            // Ensure that toggle of menu occurs after the potential blur event in iOS
            this.internalSetTimeout(() => this.toggleMenu({
              type: clickButton
            }));
          }
        };

        this.buttonHandleBlur = event => {
          const blurTarget = event.target; // Save blur target for comparison with activeElement later
          // Need setTimeout, so that when the user presses Tab, the activeElement is the next focused element, not body element

          this.internalSetTimeout(() => {
            if (!this.isMouseDown && (this.props.environment.document.activeElement == null || this.props.environment.document.activeElement.id !== this.inputId) && this.props.environment.document.activeElement !== blurTarget // Do nothing if we refocus the same element again (to solve issue in Safari on iOS)
            ) {
              this.reset({
                type: blurButton
              });
            }
          });
        };

        this.getLabelProps = props => {
          return {
            htmlFor: this.inputId,
            id: this.labelId,
            ...props
          };
        };

        this.getInputProps = function (_temp4) {
          let {
            onKeyDown,
            onBlur,
            onChange,
            onInput,
            onChangeText,
            ...rest
          } = _temp4 === void 0 ? {} : _temp4;
          let onChangeKey;
          let eventHandlers = {};
          /* istanbul ignore next (preact) */

          {
            onChangeKey = 'onChange';
          }

          const {
            inputValue,
            isOpen,
            highlightedIndex
          } = _this.getState();

          if (!rest.disabled) {
            eventHandlers = {
              [onChangeKey]: callAllEventHandlers(onChange, onInput, _this.inputHandleChange),
              onKeyDown: callAllEventHandlers(onKeyDown, _this.inputHandleKeyDown),
              onBlur: callAllEventHandlers(onBlur, _this.inputHandleBlur)
            };
          }

          return {
            'aria-autocomplete': 'list',
            'aria-activedescendant': isOpen && typeof highlightedIndex === 'number' && highlightedIndex >= 0 ? _this.getItemId(highlightedIndex) : null,
            'aria-controls': isOpen ? _this.menuId : null,
            'aria-labelledby': _this.labelId,
            // https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
            // revert back since autocomplete="nope" is ignored on latest Chrome and Opera
            autoComplete: 'off',
            value: inputValue,
            id: _this.inputId,
            ...eventHandlers,
            ...rest
          };
        };

        this.inputHandleKeyDown = event => {
          const key = normalizeArrowKey(event);

          if (key && this.inputKeyDownHandlers[key]) {
            this.inputKeyDownHandlers[key].call(this, event);
          }
        };

        this.inputHandleChange = event => {
          this.internalSetState({
            type: changeInput,
            isOpen: true,
            inputValue: event.target.value,
            highlightedIndex: this.props.defaultHighlightedIndex
          });
        };

        this.inputHandleBlur = () => {
          // Need setTimeout, so that when the user presses Tab, the activeElement is the next focused element, not the body element
          this.internalSetTimeout(() => {
            const downshiftButtonIsActive = this.props.environment.document && !!this.props.environment.document.activeElement && !!this.props.environment.document.activeElement.dataset && this.props.environment.document.activeElement.dataset.toggle && this._rootNode && this._rootNode.contains(this.props.environment.document.activeElement);

            if (!this.isMouseDown && !downshiftButtonIsActive) {
              this.reset({
                type: blurInput
              });
            }
          });
        };

        this.menuRef = node => {
          this._menuNode = node;
        };

        this.getMenuProps = function (_temp5, _temp6) {
          let {
            refKey = 'ref',
            ref,
            ...props
          } = _temp5 === void 0 ? {} : _temp5;
          let {
            suppressRefError = false
          } = _temp6 === void 0 ? {} : _temp6;
          _this.getMenuProps.called = true;
          _this.getMenuProps.refKey = refKey;
          _this.getMenuProps.suppressRefError = suppressRefError;
          return {
            [refKey]: handleRefs(ref, _this.menuRef),
            role: 'listbox',
            'aria-labelledby': props && props['aria-label'] ? null : _this.labelId,
            id: _this.menuId,
            ...props
          };
        };

        this.getItemProps = function (_temp7) {
          let {
            onMouseMove,
            onMouseDown,
            onClick,
            onPress,
            index,
            item = requiredProp('getItemProps', 'item'),
            ...rest
          } = _temp7 === void 0 ? {} : _temp7;

          if (index === undefined) {
            _this.items.push(item);

            index = _this.items.indexOf(item);
          } else {
            _this.items[index] = item;
          }

          const onSelectKey = 'onClick';
          const customClickHandler = onClick;
          const enabledEventHandlers = {
            // onMouseMove is used over onMouseEnter here. onMouseMove
            // is only triggered on actual mouse movement while onMouseEnter
            // can fire on DOM changes, interrupting keyboard navigation
            onMouseMove: callAllEventHandlers(onMouseMove, () => {
              if (index === _this.getState().highlightedIndex) {
                return;
              }

              _this.setHighlightedIndex(index, {
                type: itemMouseEnter
              }); // We never want to manually scroll when changing state based
              // on `onMouseMove` because we will be moving the element out
              // from under the user which is currently scrolling/moving the
              // cursor


              _this.avoidScrolling = true;

              _this.internalSetTimeout(() => _this.avoidScrolling = false, 250);
            }),
            onMouseDown: callAllEventHandlers(onMouseDown, event => {
              // This prevents the activeElement from being changed
              // to the item so it can remain with the current activeElement
              // which is a more common use case.
              event.preventDefault();
            }),
            [onSelectKey]: callAllEventHandlers(customClickHandler, () => {
              _this.selectItemAtIndex(index, {
                type: clickItem
              });
            })
          }; // Passing down the onMouseDown handler to prevent redirect
          // of the activeElement if clicking on disabled items

          const eventHandlers = rest.disabled ? {
            onMouseDown: enabledEventHandlers.onMouseDown
          } : enabledEventHandlers;
          return {
            id: _this.getItemId(index),
            role: 'option',
            'aria-selected': _this.getState().highlightedIndex === index,
            ...eventHandlers,
            ...rest
          };
        };

        this.clearItems = () => {
          this.items = [];
        };

        this.reset = function (otherStateToSet, cb) {
          if (otherStateToSet === void 0) {
            otherStateToSet = {};
          }

          otherStateToSet = pickState(otherStateToSet);

          _this.internalSetState(_ref => {
            let {
              selectedItem
            } = _ref;
            return {
              isOpen: _this.props.defaultIsOpen,
              highlightedIndex: _this.props.defaultHighlightedIndex,
              inputValue: _this.props.itemToString(selectedItem),
              ...otherStateToSet
            };
          }, cb);
        };

        this.toggleMenu = function (otherStateToSet, cb) {
          if (otherStateToSet === void 0) {
            otherStateToSet = {};
          }

          otherStateToSet = pickState(otherStateToSet);

          _this.internalSetState(_ref2 => {
            let {
              isOpen
            } = _ref2;
            return {
              isOpen: !isOpen,
              ...(isOpen && {
                highlightedIndex: _this.props.defaultHighlightedIndex
              }),
              ...otherStateToSet
            };
          }, () => {
            const {
              isOpen,
              highlightedIndex
            } = _this.getState();

            if (isOpen) {
              if (_this.getItemCount() > 0 && typeof highlightedIndex === 'number') {
                _this.setHighlightedIndex(highlightedIndex, otherStateToSet);
              }
            }

            cbToCb(cb)();
          });
        };

        this.openMenu = cb => {
          this.internalSetState({
            isOpen: true
          }, cb);
        };

        this.closeMenu = cb => {
          this.internalSetState({
            isOpen: false
          }, cb);
        };

        this.updateStatus = debounce(() => {
          const state = this.getState();
          const item = this.items[state.highlightedIndex];
          const resultCount = this.getItemCount();
          const status = this.props.getA11yStatusMessage({
            itemToString: this.props.itemToString,
            previousResultCount: this.previousResultCount,
            resultCount,
            highlightedItem: item,
            ...state
          });
          this.previousResultCount = resultCount;
          setStatus(status, this.props.environment.document);
        }, 200);
        // fancy destructuring + defaults + aliases
        // this basically says each value of state should either be set to
        // the initial value or the default value if the initial value is not provided
        const {
          defaultHighlightedIndex,
          initialHighlightedIndex: _highlightedIndex = defaultHighlightedIndex,
          defaultIsOpen,
          initialIsOpen: _isOpen = defaultIsOpen,
          initialInputValue: _inputValue = '',
          initialSelectedItem: _selectedItem = null
        } = this.props;

        const _state = this.getState({
          highlightedIndex: _highlightedIndex,
          isOpen: _isOpen,
          inputValue: _inputValue,
          selectedItem: _selectedItem
        });

        if (_state.selectedItem != null && this.props.initialInputValue === undefined) {
          _state.inputValue = this.props.itemToString(_state.selectedItem);
        }

        this.state = _state;
      }

      /**
       * Clear all running timeouts
       */
      internalClearTimeouts() {
        this.timeoutIds.forEach(id => {
          clearTimeout(id);
        });
        this.timeoutIds = [];
      }
      /**
       * Gets the state based on internal state or props
       * If a state value is passed via props, then that
       * is the value given, otherwise it's retrieved from
       * stateToMerge
       *
       * @param {Object} stateToMerge defaults to this.state
       * @return {Object} the state
       */


      getState(stateToMerge) {
        if (stateToMerge === void 0) {
          stateToMerge = this.state;
        }

        return getState(stateToMerge, this.props);
      }

      getItemCount() {
        // things read better this way. They're in priority order:
        // 1. `this.itemCount`
        // 2. `this.props.itemCount`
        // 3. `this.items.length`
        let itemCount = this.items.length;

        if (this.itemCount != null) {
          itemCount = this.itemCount;
        } else if (this.props.itemCount !== undefined) {
          itemCount = this.props.itemCount;
        }

        return itemCount;
      }

      getItemNodeFromIndex(index) {
        return this.props.environment.document.getElementById(this.getItemId(index));
      }

      scrollHighlightedItemIntoView() {
        /* istanbul ignore else (react-native) */
        {
          const node = this.getItemNodeFromIndex(this.getState().highlightedIndex);
          this.props.scrollIntoView(node, this._menuNode);
        }
      }

      moveHighlightedIndex(amount, otherStateToSet) {
        const itemCount = this.getItemCount();
        const {
          highlightedIndex
        } = this.getState();

        if (itemCount > 0) {
          const nextHighlightedIndex = getNextWrappingIndex(amount, highlightedIndex, itemCount, index => this.getItemNodeFromIndex(index));
          this.setHighlightedIndex(nextHighlightedIndex, otherStateToSet);
        }
      }

      getStateAndHelpers() {
        const {
          highlightedIndex,
          inputValue,
          selectedItem,
          isOpen
        } = this.getState();
        const {
          itemToString
        } = this.props;
        const {
          id
        } = this;
        const {
          getRootProps,
          getToggleButtonProps,
          getLabelProps,
          getMenuProps,
          getInputProps,
          getItemProps,
          openMenu,
          closeMenu,
          toggleMenu,
          selectItem,
          selectItemAtIndex,
          selectHighlightedItem,
          setHighlightedIndex,
          clearSelection,
          clearItems,
          reset,
          setItemCount,
          unsetItemCount,
          internalSetState: setState
        } = this;
        return {
          // prop getters
          getRootProps,
          getToggleButtonProps,
          getLabelProps,
          getMenuProps,
          getInputProps,
          getItemProps,
          // actions
          reset,
          openMenu,
          closeMenu,
          toggleMenu,
          selectItem,
          selectItemAtIndex,
          selectHighlightedItem,
          setHighlightedIndex,
          clearSelection,
          clearItems,
          setItemCount,
          unsetItemCount,
          setState,
          // props
          itemToString,
          // derived
          id,
          // state
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem
        };
      } //////////////////////////// ROOT


      componentDidMount() {
        /* istanbul ignore if (react-native) */
        if (this.getMenuProps.called && !this.getMenuProps.suppressRefError) {
          validateGetMenuPropsCalledCorrectly(this._menuNode, this.getMenuProps);
        }
        /* istanbul ignore if (react-native) */


        {
          // this.isMouseDown helps us track whether the mouse is currently held down.
          // This is useful when the user clicks on an item in the list, but holds the mouse
          // down long enough for the list to disappear (because the blur event fires on the input)
          // this.isMouseDown is used in the blur handler on the input to determine whether the blur event should
          // trigger hiding the menu.
          const onMouseDown = () => {
            this.isMouseDown = true;
          };

          const onMouseUp = event => {
            this.isMouseDown = false; // if the target element or the activeElement is within a downshift node
            // then we don't want to reset downshift

            const contextWithinDownshift = targetWithinDownshift(event.target, [this._rootNode, this._menuNode], this.props.environment);

            if (!contextWithinDownshift && this.getState().isOpen) {
              this.reset({
                type: mouseUp
              }, () => this.props.onOuterClick(this.getStateAndHelpers()));
            }
          }; // Touching an element in iOS gives focus and hover states, but touching out of
          // the element will remove hover, and persist the focus state, resulting in the
          // blur event not being triggered.
          // this.isTouchMove helps us track whether the user is tapping or swiping on a touch screen.
          // If the user taps outside of Downshift, the component should be reset,
          // but not if the user is swiping


          const onTouchStart = () => {
            this.isTouchMove = false;
          };

          const onTouchMove = () => {
            this.isTouchMove = true;
          };

          const onTouchEnd = event => {
            const contextWithinDownshift = targetWithinDownshift(event.target, [this._rootNode, this._menuNode], this.props.environment, false);

            if (!this.isTouchMove && !contextWithinDownshift && this.getState().isOpen) {
              this.reset({
                type: touchEnd
              }, () => this.props.onOuterClick(this.getStateAndHelpers()));
            }
          };

          const {
            environment
          } = this.props;
          environment.addEventListener('mousedown', onMouseDown);
          environment.addEventListener('mouseup', onMouseUp);
          environment.addEventListener('touchstart', onTouchStart);
          environment.addEventListener('touchmove', onTouchMove);
          environment.addEventListener('touchend', onTouchEnd);

          this.cleanup = () => {
            this.internalClearTimeouts();
            this.updateStatus.cancel();
            environment.removeEventListener('mousedown', onMouseDown);
            environment.removeEventListener('mouseup', onMouseUp);
            environment.removeEventListener('touchstart', onTouchStart);
            environment.removeEventListener('touchmove', onTouchMove);
            environment.removeEventListener('touchend', onTouchEnd);
          };
        }
      }

      shouldScroll(prevState, prevProps) {
        const {
          highlightedIndex: currentHighlightedIndex
        } = this.props.highlightedIndex === undefined ? this.getState() : this.props;
        const {
          highlightedIndex: prevHighlightedIndex
        } = prevProps.highlightedIndex === undefined ? prevState : prevProps;
        const scrollWhenOpen = currentHighlightedIndex && this.getState().isOpen && !prevState.isOpen;
        const scrollWhenNavigating = currentHighlightedIndex !== prevHighlightedIndex;
        return scrollWhenOpen || scrollWhenNavigating;
      }

      componentDidUpdate(prevProps, prevState) {
        {
          validateControlledUnchanged(this.state, prevProps, this.props);
          /* istanbul ignore if (react-native) */

          if (this.getMenuProps.called && !this.getMenuProps.suppressRefError) {
            validateGetMenuPropsCalledCorrectly(this._menuNode, this.getMenuProps);
          }
        }

        if (isControlledProp(this.props, 'selectedItem') && this.props.selectedItemChanged(prevProps.selectedItem, this.props.selectedItem)) {
          this.internalSetState({
            type: controlledPropUpdatedSelectedItem,
            inputValue: this.props.itemToString(this.props.selectedItem)
          });
        }

        if (!this.avoidScrolling && this.shouldScroll(prevState, prevProps)) {
          this.scrollHighlightedItemIntoView();
        }
        /* istanbul ignore else (react-native) */


        {
          this.updateStatus();
        }
      }

      componentWillUnmount() {
        this.cleanup(); // avoids memory leak
      }

      render() {
        const children = unwrapArray(this.props.children, noop); // because the items are rerendered every time we call the children
        // we clear this out each render and it will be populated again as
        // getItemProps is called.

        this.clearItems(); // we reset this so we know whether the user calls getRootProps during
        // this render. If they do then we don't need to do anything,
        // if they don't then we need to clone the element they return and
        // apply the props for them.

        this.getRootProps.called = false;
        this.getRootProps.refKey = undefined;
        this.getRootProps.suppressRefError = undefined; // we do something similar for getMenuProps

        this.getMenuProps.called = false;
        this.getMenuProps.refKey = undefined;
        this.getMenuProps.suppressRefError = undefined; // we do something similar for getLabelProps

        this.getLabelProps.called = false; // and something similar for getInputProps

        this.getInputProps.called = false;
        const element = unwrapArray(children(this.getStateAndHelpers()));

        if (!element) {
          return null;
        }

        if (this.getRootProps.called || this.props.suppressRefError) {
          if (!this.getRootProps.suppressRefError && !this.props.suppressRefError) {
            validateGetRootPropsCalledCorrectly(element, this.getRootProps);
          }

          return element;
        } else if (isDOMElement(element)) {
          // they didn't apply the root props, but we can clone
          // this and apply the props ourselves
          return /*#__PURE__*/react.cloneElement(element, this.getRootProps(getElementProps(element)));
        }
        /* istanbul ignore else */


        {
          // they didn't apply the root props, but they need to
          // otherwise we can't query around the autocomplete
          throw new Error('downshift: If you return a non-DOM element, you must apply the getRootProps function');
        }
      }

    }

    Downshift.defaultProps = {
      defaultHighlightedIndex: null,
      defaultIsOpen: false,
      getA11yStatusMessage: getA11yStatusMessage$1,
      itemToString: i => {
        if (i == null) {
          return '';
        }

        if (isPlainObject(i) && !i.hasOwnProperty('toString')) {
          // eslint-disable-next-line no-console
          console.warn('downshift: An object was passed to the default implementation of `itemToString`. You should probably provide your own `itemToString` implementation. Please refer to the `itemToString` API documentation.', 'The object that was passed:', i);
        }

        return String(i);
      },
      onStateChange: noop,
      onInputValueChange: noop,
      onUserAction: noop,
      onChange: noop,
      onSelect: noop,
      onOuterClick: noop,
      selectedItemChanged: (prevItem, item) => prevItem !== item,
      environment:
      /* istanbul ignore next (ssr) */
      typeof window === 'undefined' ? {} : window,
      stateReducer: (state, stateToSet) => stateToSet,
      suppressRefError: false,
      scrollIntoView
    };
    Downshift.stateChangeTypes = stateChangeTypes$3;
    return Downshift;
  })();

  Downshift.propTypes = {
    children: PropTypes.func,
    defaultHighlightedIndex: PropTypes.number,
    defaultIsOpen: PropTypes.bool,
    initialHighlightedIndex: PropTypes.number,
    initialSelectedItem: PropTypes.any,
    initialInputValue: PropTypes.string,
    initialIsOpen: PropTypes.bool,
    getA11yStatusMessage: PropTypes.func,
    itemToString: PropTypes.func,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onStateChange: PropTypes.func,
    onInputValueChange: PropTypes.func,
    onUserAction: PropTypes.func,
    onOuterClick: PropTypes.func,
    selectedItemChanged: PropTypes.func,
    stateReducer: PropTypes.func,
    itemCount: PropTypes.number,
    id: PropTypes.string,
    environment: PropTypes.shape({
      addEventListener: PropTypes.func,
      removeEventListener: PropTypes.func,
      document: PropTypes.shape({
        getElementById: PropTypes.func,
        activeElement: PropTypes.any,
        body: PropTypes.any
      })
    }),
    suppressRefError: PropTypes.bool,
    scrollIntoView: PropTypes.func,
    // things we keep in state for uncontrolled components
    // but can accept as props for controlled components

    /* eslint-disable react/no-unused-prop-types */
    selectedItem: PropTypes.any,
    isOpen: PropTypes.bool,
    inputValue: PropTypes.string,
    highlightedIndex: PropTypes.number,
    labelId: PropTypes.string,
    inputId: PropTypes.string,
    menuId: PropTypes.string,
    getItemId: PropTypes.func
    /* eslint-enable react/no-unused-prop-types */

  } ;
  var Downshift$1 = Downshift;

  function validateGetMenuPropsCalledCorrectly(node, _ref3) {
    let {
      refKey
    } = _ref3;

    if (!node) {
      // eslint-disable-next-line no-console
      console.error(`downshift: The ref prop "${refKey}" from getMenuProps was not applied correctly on your menu element.`);
    }
  }

  function validateGetRootPropsCalledCorrectly(element, _ref4) {
    let {
      refKey
    } = _ref4;
    const refKeySpecified = refKey !== 'ref';
    const isComposite = !isDOMElement(element);

    if (isComposite && !refKeySpecified && !reactIs.exports.isForwardRef(element)) {
      // eslint-disable-next-line no-console
      console.error('downshift: You returned a non-DOM element. You must specify a refKey in getRootProps');
    } else if (!isComposite && refKeySpecified) {
      // eslint-disable-next-line no-console
      console.error(`downshift: You returned a DOM element. You should not specify a refKey in getRootProps. You specified "${refKey}"`);
    }

    if (!reactIs.exports.isForwardRef(element) && !getElementProps(element)[refKey]) {
      // eslint-disable-next-line no-console
      console.error(`downshift: You must apply the ref prop "${refKey}" from getRootProps onto your root element.`);
    }
  }

  const dropdownDefaultStateValues = {
    highlightedIndex: -1,
    isOpen: false,
    selectedItem: null,
    inputValue: ''
  };

  function callOnChangeProps(action, state, newState) {
    const {
      props,
      type
    } = action;
    const changes = {};
    Object.keys(state).forEach(key => {
      invokeOnChangeHandler(key, action, state, newState);

      if (newState[key] !== state[key]) {
        changes[key] = newState[key];
      }
    });

    if (props.onStateChange && Object.keys(changes).length) {
      props.onStateChange({
        type,
        ...changes
      });
    }
  }

  function invokeOnChangeHandler(key, action, state, newState) {
    const {
      props,
      type
    } = action;
    const handler = `on${capitalizeString(key)}Change`;

    if (props[handler] && newState[key] !== undefined && newState[key] !== state[key]) {
      props[handler]({
        type,
        ...newState
      });
    }
  }
  /**
   * Default state reducer that returns the changes.
   *
   * @param {Object} s state.
   * @param {Object} a action with changes.
   * @returns {Object} changes.
   */


  function stateReducer(s, a) {
    return a.changes;
  }
  /**
   * Returns a message to be added to aria-live region when item is selected.
   *
   * @param {Object} selectionParameters Parameters required to build the message.
   * @returns {string} The a11y message.
   */


  function getA11ySelectionMessage(selectionParameters) {
    const {
      selectedItem,
      itemToString: itemToStringLocal
    } = selectionParameters;
    return selectedItem ? `${itemToStringLocal(selectedItem)} has been selected.` : '';
  }
  /**
   * Debounced call for updating the a11y message.
   */


  const updateA11yStatus = debounce((getA11yMessage, document) => {
    setStatus(getA11yMessage(), document);
  }, 200); // istanbul ignore next

  const useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? react.useLayoutEffect : react.useEffect;

  function useElementIds(_ref) {
    let {
      id = `downshift-${generateId()}`,
      labelId,
      menuId,
      getItemId,
      toggleButtonId,
      inputId
    } = _ref;
    const elementIdsRef = react.useRef({
      labelId: labelId || `${id}-label`,
      menuId: menuId || `${id}-menu`,
      getItemId: getItemId || (index => `${id}-item-${index}`),
      toggleButtonId: toggleButtonId || `${id}-toggle-button`,
      inputId: inputId || `${id}-input`
    });
    return elementIdsRef.current;
  }

  function getItemIndex(index, item, items) {
    if (index !== undefined) {
      return index;
    }

    if (items.length === 0) {
      return -1;
    }

    return items.indexOf(item);
  }

  function itemToString(item) {
    return item ? String(item) : '';
  }

  function isAcceptedCharacterKey(key) {
    return /^\S{1}$/.test(key);
  }

  function capitalizeString(string) {
    return `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;
  }

  function useLatestRef(val) {
    const ref = react.useRef(val); // technically this is not "concurrent mode safe" because we're manipulating
    // the value during render (so it's not idempotent). However, the places this
    // hook is used is to support memoizing callbacks which will be called
    // *during* render, so we need the latest values *during* render.
    // If not for this, then we'd probably want to use useLayoutEffect instead.

    ref.current = val;
    return ref;
  }
  /**
   * Computes the controlled state using a the previous state, props,
   * two reducers, one from downshift and an optional one from the user.
   * Also calls the onChange handlers for state values that have changed.
   *
   * @param {Function} reducer Reducer function from downshift.
   * @param {Object} initialState Initial state of the hook.
   * @param {Object} props The hook props.
   * @returns {Array} An array with the state and an action dispatcher.
   */


  function useEnhancedReducer(reducer, initialState, props) {
    const prevStateRef = react.useRef();
    const actionRef = react.useRef();
    const enhancedReducer = react.useCallback((state, action) => {
      actionRef.current = action;
      state = getState(state, action.props);
      const changes = reducer(state, action);
      const newState = action.props.stateReducer(state, { ...action,
        changes
      });
      return newState;
    }, [reducer]);
    const [state, dispatch] = react.useReducer(enhancedReducer, initialState);
    const propsRef = useLatestRef(props);
    const dispatchWithProps = react.useCallback(action => dispatch({
      props: propsRef.current,
      ...action
    }), [propsRef]);
    const action = actionRef.current;
    react.useEffect(() => {
      if (action && prevStateRef.current && prevStateRef.current !== state) {
        callOnChangeProps(action, getState(prevStateRef.current, action.props), state);
      }

      prevStateRef.current = state;
    }, [state, props, action]);
    return [state, dispatchWithProps];
  }
  /**
   * Wraps the useEnhancedReducer and applies the controlled prop values before
   * returning the new state.
   *
   * @param {Function} reducer Reducer function from downshift.
   * @param {Object} initialState Initial state of the hook.
   * @param {Object} props The hook props.
   * @returns {Array} An array with the state and an action dispatcher.
   */


  function useControlledReducer$1(reducer, initialState, props) {
    const [state, dispatch] = useEnhancedReducer(reducer, initialState, props);
    return [getState(state, props), dispatch];
  }

  const defaultProps$3 = {
    itemToString,
    stateReducer,
    getA11ySelectionMessage,
    scrollIntoView,
    circularNavigation: false,
    environment:
    /* istanbul ignore next (ssr) */
    typeof window === 'undefined' ? {} : window
  };

  function getDefaultValue$1(props, propKey, defaultStateValues) {
    if (defaultStateValues === void 0) {
      defaultStateValues = dropdownDefaultStateValues;
    }

    const defaultValue = props[`default${capitalizeString(propKey)}`];

    if (defaultValue !== undefined) {
      return defaultValue;
    }

    return defaultStateValues[propKey];
  }

  function getInitialValue$1(props, propKey, defaultStateValues) {
    if (defaultStateValues === void 0) {
      defaultStateValues = dropdownDefaultStateValues;
    }

    const value = props[propKey];

    if (value !== undefined) {
      return value;
    }

    const initialValue = props[`initial${capitalizeString(propKey)}`];

    if (initialValue !== undefined) {
      return initialValue;
    }

    return getDefaultValue$1(props, propKey, defaultStateValues);
  }

  function getInitialState$2(props) {
    const selectedItem = getInitialValue$1(props, 'selectedItem');
    const isOpen = getInitialValue$1(props, 'isOpen');
    const highlightedIndex = getInitialValue$1(props, 'highlightedIndex');
    const inputValue = getInitialValue$1(props, 'inputValue');
    return {
      highlightedIndex: highlightedIndex < 0 && selectedItem && isOpen ? props.items.indexOf(selectedItem) : highlightedIndex,
      isOpen,
      selectedItem,
      inputValue
    };
  }

  function getHighlightedIndexOnOpen(props, state, offset, getItemNodeFromIndex) {
    const {
      items,
      initialHighlightedIndex,
      defaultHighlightedIndex
    } = props;
    const {
      selectedItem,
      highlightedIndex
    } = state;

    if (items.length === 0) {
      return -1;
    } // initialHighlightedIndex will give value to highlightedIndex on initial state only.


    if (initialHighlightedIndex !== undefined && highlightedIndex === initialHighlightedIndex) {
      return initialHighlightedIndex;
    }

    if (defaultHighlightedIndex !== undefined) {
      return defaultHighlightedIndex;
    }

    if (selectedItem) {
      if (offset === 0) {
        return items.indexOf(selectedItem);
      }

      return getNextWrappingIndex(offset, items.indexOf(selectedItem), items.length, getItemNodeFromIndex, false);
    }

    if (offset === 0) {
      return -1;
    }

    return offset < 0 ? items.length - 1 : 0;
  }
  /**
   * Reuse the movement tracking of mouse and touch events.
   *
   * @param {boolean} isOpen Whether the dropdown is open or not.
   * @param {Array<Object>} downshiftElementRefs Downshift element refs to track movement (toggleButton, menu etc.)
   * @param {Object} environment Environment where component/hook exists.
   * @param {Function} handleBlur Handler on blur from mouse or touch.
   * @returns {Object} Ref containing whether mouseDown or touchMove event is happening
   */


  function useMouseAndTouchTracker(isOpen, downshiftElementRefs, environment, handleBlur) {
    const mouseAndTouchTrackersRef = react.useRef({
      isMouseDown: false,
      isTouchMove: false
    });
    react.useEffect(() => {
      // The same strategy for checking if a click occurred inside or outside downsift
      // as in downshift.js.
      const onMouseDown = () => {
        mouseAndTouchTrackersRef.current.isMouseDown = true;
      };

      const onMouseUp = event => {
        mouseAndTouchTrackersRef.current.isMouseDown = false;

        if (isOpen && !targetWithinDownshift(event.target, downshiftElementRefs.map(ref => ref.current), environment)) {
          handleBlur();
        }
      };

      const onTouchStart = () => {
        mouseAndTouchTrackersRef.current.isTouchMove = false;
      };

      const onTouchMove = () => {
        mouseAndTouchTrackersRef.current.isTouchMove = true;
      };

      const onTouchEnd = event => {
        if (isOpen && !mouseAndTouchTrackersRef.current.isTouchMove && !targetWithinDownshift(event.target, downshiftElementRefs.map(ref => ref.current), environment, false)) {
          handleBlur();
        }
      };

      environment.addEventListener('mousedown', onMouseDown);
      environment.addEventListener('mouseup', onMouseUp);
      environment.addEventListener('touchstart', onTouchStart);
      environment.addEventListener('touchmove', onTouchMove);
      environment.addEventListener('touchend', onTouchEnd);
      return function cleanup() {
        environment.removeEventListener('mousedown', onMouseDown);
        environment.removeEventListener('mouseup', onMouseUp);
        environment.removeEventListener('touchstart', onTouchStart);
        environment.removeEventListener('touchmove', onTouchMove);
        environment.removeEventListener('touchend', onTouchEnd);
      }; // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, environment]);
    return mouseAndTouchTrackersRef;
  }
  /* istanbul ignore next */
  // eslint-disable-next-line import/no-mutable-exports


  let useGetterPropsCalledChecker = () => noop;
  /**
   * Custom hook that checks if getter props are called correctly.
   *
   * @param  {...any} propKeys Getter prop names to be handled.
   * @returns {Function} Setter function called inside getter props to set call information.
   */

  /* istanbul ignore next */


  {
    useGetterPropsCalledChecker = function () {
      const isInitialMountRef = react.useRef(true);

      for (var _len = arguments.length, propKeys = new Array(_len), _key = 0; _key < _len; _key++) {
        propKeys[_key] = arguments[_key];
      }

      const getterPropsCalledRef = react.useRef(propKeys.reduce((acc, propKey) => {
        acc[propKey] = {};
        return acc;
      }, {}));
      react.useEffect(() => {
        Object.keys(getterPropsCalledRef.current).forEach(propKey => {
          const propCallInfo = getterPropsCalledRef.current[propKey];

          if (isInitialMountRef.current) {
            if (!Object.keys(propCallInfo).length) {
              // eslint-disable-next-line no-console
              console.error(`downshift: You forgot to call the ${propKey} getter function on your component / element.`);
              return;
            }
          }

          const {
            suppressRefError,
            refKey,
            elementRef
          } = propCallInfo;

          if ((!elementRef || !elementRef.current) && !suppressRefError) {
            // eslint-disable-next-line no-console
            console.error(`downshift: The ref prop "${refKey}" from ${propKey} was not applied correctly on your element.`);
          }
        });
        isInitialMountRef.current = false;
      });
      const setGetterPropCallInfo = react.useCallback((propKey, suppressRefError, refKey, elementRef) => {
        getterPropsCalledRef.current[propKey] = {
          suppressRefError,
          refKey,
          elementRef
        };
      }, []);
      return setGetterPropCallInfo;
    };
  }

  function useA11yMessageSetter(getA11yMessage, dependencyArray, _ref2) {
    let {
      isInitialMount,
      highlightedIndex,
      items,
      environment,
      ...rest
    } = _ref2;
    // Sets a11y status message on changes in state.
    react.useEffect(() => {
      if (isInitialMount || false) {
        return;
      }

      updateA11yStatus(() => getA11yMessage({
        highlightedIndex,
        highlightedItem: items[highlightedIndex],
        resultCount: items.length,
        ...rest
      }), environment.document); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencyArray);
  }

  function useScrollIntoView(_ref3) {
    let {
      highlightedIndex,
      isOpen,
      itemRefs,
      getItemNodeFromIndex,
      menuElement,
      scrollIntoView: scrollIntoViewProp
    } = _ref3;
    // used not to scroll on highlight by mouse.
    const shouldScrollRef = react.useRef(true); // Scroll on highlighted item if change comes from keyboard.

    useIsomorphicLayoutEffect(() => {
      if (highlightedIndex < 0 || !isOpen || !Object.keys(itemRefs.current).length) {
        return;
      }

      if (shouldScrollRef.current === false) {
        shouldScrollRef.current = true;
      } else {
        scrollIntoViewProp(getItemNodeFromIndex(highlightedIndex), menuElement);
      } // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [highlightedIndex]);
    return shouldScrollRef;
  } // eslint-disable-next-line import/no-mutable-exports


  let useControlPropsValidator = noop;
  /* istanbul ignore next */

  {
    useControlPropsValidator = _ref4 => {
      let {
        isInitialMount,
        props,
        state
      } = _ref4;
      // used for checking when props are moving from controlled to uncontrolled.
      const prevPropsRef = react.useRef(props);
      react.useEffect(() => {
        if (isInitialMount) {
          return;
        }

        validateControlledUnchanged(state, prevPropsRef.current, props);
        prevPropsRef.current = props;
      }, [state, props, isInitialMount]);
    };
  }

  /* eslint-disable complexity */

  function downshiftCommonReducer(state, action, stateChangeTypes) {
    const {
      type,
      props
    } = action;
    let changes;

    switch (type) {
      case stateChangeTypes.ItemMouseMove:
        changes = {
          highlightedIndex: action.disabled ? -1 : action.index
        };
        break;

      case stateChangeTypes.MenuMouseLeave:
        changes = {
          highlightedIndex: -1
        };
        break;

      case stateChangeTypes.ToggleButtonClick:
      case stateChangeTypes.FunctionToggleMenu:
        changes = {
          isOpen: !state.isOpen,
          highlightedIndex: state.isOpen ? -1 : getHighlightedIndexOnOpen(props, state, 0)
        };
        break;

      case stateChangeTypes.FunctionOpenMenu:
        changes = {
          isOpen: true,
          highlightedIndex: getHighlightedIndexOnOpen(props, state, 0)
        };
        break;

      case stateChangeTypes.FunctionCloseMenu:
        changes = {
          isOpen: false
        };
        break;

      case stateChangeTypes.FunctionSetHighlightedIndex:
        changes = {
          highlightedIndex: action.highlightedIndex
        };
        break;

      case stateChangeTypes.FunctionSetInputValue:
        changes = {
          inputValue: action.inputValue
        };
        break;

      case stateChangeTypes.FunctionReset:
        changes = {
          highlightedIndex: getDefaultValue$1(props, 'highlightedIndex'),
          isOpen: getDefaultValue$1(props, 'isOpen'),
          selectedItem: getDefaultValue$1(props, 'selectedItem'),
          inputValue: getDefaultValue$1(props, 'inputValue')
        };
        break;

      default:
        throw new Error('Reducer called without proper action type.');
    }

    return { ...state,
      ...changes
    };
  }
  /* eslint-enable complexity */

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function getItemIndexByCharacterKey(_a) {
      var keysSoFar = _a.keysSoFar, highlightedIndex = _a.highlightedIndex, items = _a.items, itemToString = _a.itemToString, getItemNodeFromIndex = _a.getItemNodeFromIndex;
      var lowerCasedKeysSoFar = keysSoFar.toLowerCase();
      for (var index = 0; index < items.length; index++) {
          var offsetIndex = (index + highlightedIndex + 1) % items.length;
          var item = items[offsetIndex];
          if (item !== undefined &&
              itemToString(item)
                  .toLowerCase()
                  .startsWith(lowerCasedKeysSoFar)) {
              var element = getItemNodeFromIndex(offsetIndex);
              if (!(element === null || element === void 0 ? void 0 : element.hasAttribute('disabled'))) {
                  return offsetIndex;
              }
          }
      }
      return highlightedIndex;
  }
  var propTypes$2 = {
      items: PropTypes.array.isRequired,
      itemToString: PropTypes.func,
      getA11yStatusMessage: PropTypes.func,
      getA11ySelectionMessage: PropTypes.func,
      circularNavigation: PropTypes.bool,
      highlightedIndex: PropTypes.number,
      defaultHighlightedIndex: PropTypes.number,
      initialHighlightedIndex: PropTypes.number,
      isOpen: PropTypes.bool,
      defaultIsOpen: PropTypes.bool,
      initialIsOpen: PropTypes.bool,
      selectedItem: PropTypes.any,
      initialSelectedItem: PropTypes.any,
      defaultSelectedItem: PropTypes.any,
      id: PropTypes.string,
      labelId: PropTypes.string,
      menuId: PropTypes.string,
      getItemId: PropTypes.func,
      toggleButtonId: PropTypes.string,
      stateReducer: PropTypes.func,
      onSelectedItemChange: PropTypes.func,
      onHighlightedIndexChange: PropTypes.func,
      onStateChange: PropTypes.func,
      onIsOpenChange: PropTypes.func,
      environment: PropTypes.shape({
          addEventListener: PropTypes.func,
          removeEventListener: PropTypes.func,
          document: PropTypes.shape({
              getElementById: PropTypes.func,
              activeElement: PropTypes.any,
              body: PropTypes.any
          })
      })
  };
  /**
   * Default implementation for status message. Only added when menu is open.
   * Will specift if there are results in the list, and if so, how many,
   * and what keys are relevant.
   *
   * @param {Object} param the downshift state and other relevant properties
   * @return {String} the a11y status message
   */
  function getA11yStatusMessage(_a) {
      var isOpen = _a.isOpen, resultCount = _a.resultCount, previousResultCount = _a.previousResultCount;
      if (!isOpen) {
          return '';
      }
      if (!resultCount) {
          return 'No results are available.';
      }
      if (resultCount !== previousResultCount) {
          return "".concat(resultCount, " result").concat(resultCount === 1 ? ' is' : 's are', " available, use up and down arrow keys to navigate. Press Enter or Space Bar keys to select.");
      }
      return '';
  }
  var defaultProps$2 = __assign(__assign({}, defaultProps$3), { getA11yStatusMessage: getA11yStatusMessage });
  // eslint-disable-next-line import/no-mutable-exports
  var validatePropTypes$2 = noop;
  /* istanbul ignore next */
  {
      validatePropTypes$2 = function (options, caller) {
          PropTypes.checkPropTypes(propTypes$2, options, 'prop', caller.name);
      };
  }

  const MenuKeyDownArrowDown = '__menu_keydown_arrow_down__' ;
  const MenuKeyDownArrowUp = '__menu_keydown_arrow_up__' ;
  const MenuKeyDownEscape = '__menu_keydown_escape__' ;
  const MenuKeyDownHome = '__menu_keydown_home__' ;
  const MenuKeyDownEnd = '__menu_keydown_end__' ;
  const MenuKeyDownEnter = '__menu_keydown_enter__' ;
  const MenuKeyDownSpaceButton = '__menu_keydown_space_button__' ;
  const MenuKeyDownCharacter = '__menu_keydown_character__' ;
  const MenuBlur = '__menu_blur__' ;
  const MenuMouseLeave$1 = '__menu_mouse_leave__' ;
  const ItemMouseMove$1 = '__item_mouse_move__' ;
  const ItemClick$1 = '__item_click__' ;
  const ToggleButtonClick$1 = '__togglebutton_click__' ;
  const ToggleButtonKeyDownArrowDown = '__togglebutton_keydown_arrow_down__' ;
  const ToggleButtonKeyDownArrowUp = '__togglebutton_keydown_arrow_up__' ;
  const ToggleButtonKeyDownCharacter = '__togglebutton_keydown_character__' ;
  const FunctionToggleMenu$1 = '__function_toggle_menu__' ;
  const FunctionOpenMenu$1 = '__function_open_menu__' ;
  const FunctionCloseMenu$1 = '__function_close_menu__' ;
  const FunctionSetHighlightedIndex$1 = '__function_set_highlighted_index__' ;
  const FunctionSelectItem$1 = '__function_select_item__' ;
  const FunctionSetInputValue$1 = '__function_set_input_value__' ;
  const FunctionReset$2 = '__function_reset__' ;

  var stateChangeTypes$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MenuKeyDownArrowDown: MenuKeyDownArrowDown,
    MenuKeyDownArrowUp: MenuKeyDownArrowUp,
    MenuKeyDownEscape: MenuKeyDownEscape,
    MenuKeyDownHome: MenuKeyDownHome,
    MenuKeyDownEnd: MenuKeyDownEnd,
    MenuKeyDownEnter: MenuKeyDownEnter,
    MenuKeyDownSpaceButton: MenuKeyDownSpaceButton,
    MenuKeyDownCharacter: MenuKeyDownCharacter,
    MenuBlur: MenuBlur,
    MenuMouseLeave: MenuMouseLeave$1,
    ItemMouseMove: ItemMouseMove$1,
    ItemClick: ItemClick$1,
    ToggleButtonClick: ToggleButtonClick$1,
    ToggleButtonKeyDownArrowDown: ToggleButtonKeyDownArrowDown,
    ToggleButtonKeyDownArrowUp: ToggleButtonKeyDownArrowUp,
    ToggleButtonKeyDownCharacter: ToggleButtonKeyDownCharacter,
    FunctionToggleMenu: FunctionToggleMenu$1,
    FunctionOpenMenu: FunctionOpenMenu$1,
    FunctionCloseMenu: FunctionCloseMenu$1,
    FunctionSetHighlightedIndex: FunctionSetHighlightedIndex$1,
    FunctionSelectItem: FunctionSelectItem$1,
    FunctionSetInputValue: FunctionSetInputValue$1,
    FunctionReset: FunctionReset$2
  });

  /* eslint-disable complexity */

  function downshiftSelectReducer(state, action) {
    const {
      type,
      props,
      shiftKey
    } = action;
    let changes;

    switch (type) {
      case ItemClick$1:
        changes = {
          isOpen: getDefaultValue$1(props, 'isOpen'),
          highlightedIndex: getDefaultValue$1(props, 'highlightedIndex'),
          selectedItem: props.items[action.index]
        };
        break;

      case ToggleButtonKeyDownCharacter:
        {
          const lowercasedKey = action.key;
          const inputValue = `${state.inputValue}${lowercasedKey}`;
          const itemIndex = getItemIndexByCharacterKey({
            keysSoFar: inputValue,
            highlightedIndex: state.selectedItem ? props.items.indexOf(state.selectedItem) : -1,
            items: props.items,
            itemToString: props.itemToString,
            getItemNodeFromIndex: action.getItemNodeFromIndex
          });
          changes = {
            inputValue,
            ...(itemIndex >= 0 && {
              selectedItem: props.items[itemIndex]
            })
          };
        }
        break;

      case ToggleButtonKeyDownArrowDown:
        changes = {
          highlightedIndex: getHighlightedIndexOnOpen(props, state, 1, action.getItemNodeFromIndex),
          isOpen: true
        };
        break;

      case ToggleButtonKeyDownArrowUp:
        changes = {
          highlightedIndex: getHighlightedIndexOnOpen(props, state, -1, action.getItemNodeFromIndex),
          isOpen: true
        };
        break;

      case MenuKeyDownEnter:
      case MenuKeyDownSpaceButton:
        changes = {
          isOpen: getDefaultValue$1(props, 'isOpen'),
          highlightedIndex: getDefaultValue$1(props, 'highlightedIndex'),
          ...(state.highlightedIndex >= 0 && {
            selectedItem: props.items[state.highlightedIndex]
          })
        };
        break;

      case MenuKeyDownHome:
        changes = {
          highlightedIndex: getNextNonDisabledIndex(1, 0, props.items.length, action.getItemNodeFromIndex, false)
        };
        break;

      case MenuKeyDownEnd:
        changes = {
          highlightedIndex: getNextNonDisabledIndex(-1, props.items.length - 1, props.items.length, action.getItemNodeFromIndex, false)
        };
        break;

      case MenuKeyDownEscape:
        changes = {
          isOpen: false,
          highlightedIndex: -1
        };
        break;

      case MenuBlur:
        changes = {
          isOpen: false,
          highlightedIndex: -1
        };
        break;

      case MenuKeyDownCharacter:
        {
          const lowercasedKey = action.key;
          const inputValue = `${state.inputValue}${lowercasedKey}`;
          const highlightedIndex = getItemIndexByCharacterKey({
            keysSoFar: inputValue,
            highlightedIndex: state.highlightedIndex,
            items: props.items,
            itemToString: props.itemToString,
            getItemNodeFromIndex: action.getItemNodeFromIndex
          });
          changes = {
            inputValue,
            ...(highlightedIndex >= 0 && {
              highlightedIndex
            })
          };
        }
        break;

      case MenuKeyDownArrowDown:
        changes = {
          highlightedIndex: getNextWrappingIndex(shiftKey ? 5 : 1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, props.circularNavigation)
        };
        break;

      case MenuKeyDownArrowUp:
        changes = {
          highlightedIndex: getNextWrappingIndex(shiftKey ? -5 : -1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, props.circularNavigation)
        };
        break;

      case FunctionSelectItem$1:
        changes = {
          selectedItem: action.selectedItem
        };
        break;

      default:
        return downshiftCommonReducer(state, action, stateChangeTypes$2);
    }

    return { ...state,
      ...changes
    };
  }
  /* eslint-enable complexity */

  /* eslint-disable max-statements */
  useSelect.stateChangeTypes = stateChangeTypes$2;

  function useSelect(userProps) {
    if (userProps === void 0) {
      userProps = {};
    }

    validatePropTypes$2(userProps, useSelect); // Props defaults and destructuring.

    const props = { ...defaultProps$2,
      ...userProps
    };
    const {
      items,
      scrollIntoView,
      environment,
      initialIsOpen,
      defaultIsOpen,
      itemToString,
      getA11ySelectionMessage,
      getA11yStatusMessage
    } = props; // Initial state depending on controlled props.

    const initialState = getInitialState$2(props);
    const [state, dispatch] = useControlledReducer$1(downshiftSelectReducer, initialState, props);
    const {
      isOpen,
      highlightedIndex,
      selectedItem,
      inputValue
    } = state; // Element efs.

    const toggleButtonRef = react.useRef(null);
    const menuRef = react.useRef(null);
    const itemRefs = react.useRef({}); // used not to trigger menu blur action in some scenarios.

    const shouldBlurRef = react.useRef(true); // used to keep the inputValue clearTimeout object between renders.

    const clearTimeoutRef = react.useRef(null); // prevent id re-generation between renders.

    const elementIds = useElementIds(props); // used to keep track of how many items we had on previous cycle.

    const previousResultCountRef = react.useRef();
    const isInitialMountRef = react.useRef(true); // utility callback to get item element.

    const latest = useLatestRef({
      state,
      props
    }); // Some utils.

    const getItemNodeFromIndex = react.useCallback(index => itemRefs.current[elementIds.getItemId(index)], [elementIds]); // Effects.
    // Sets a11y status message on changes in state.

    useA11yMessageSetter(getA11yStatusMessage, [isOpen, highlightedIndex, inputValue, items], {
      isInitialMount: isInitialMountRef.current,
      previousResultCount: previousResultCountRef.current,
      items,
      environment,
      itemToString,
      ...state
    }); // Sets a11y status message on changes in selectedItem.

    useA11yMessageSetter(getA11ySelectionMessage, [selectedItem], {
      isInitialMount: isInitialMountRef.current,
      previousResultCount: previousResultCountRef.current,
      items,
      environment,
      itemToString,
      ...state
    }); // Scroll on highlighted item if change comes from keyboard.

    const shouldScrollRef = useScrollIntoView({
      menuElement: menuRef.current,
      highlightedIndex,
      isOpen,
      itemRefs,
      scrollIntoView,
      getItemNodeFromIndex
    }); // Sets cleanup for the keysSoFar callback, debounded after 500ms.

    react.useEffect(() => {
      // init the clean function here as we need access to dispatch.
      clearTimeoutRef.current = debounce(outerDispatch => {
        outerDispatch({
          type: FunctionSetInputValue$1,
          inputValue: ''
        });
      }, 500); // Cancel any pending debounced calls on mount

      return () => {
        clearTimeoutRef.current.cancel();
      };
    }, []); // Invokes the keysSoFar callback set up above.

    react.useEffect(() => {
      if (!inputValue) {
        return;
      }

      clearTimeoutRef.current(dispatch);
    }, [dispatch, inputValue]);
    useControlPropsValidator({
      isInitialMount: isInitialMountRef.current,
      props,
      state
    });
    /* Controls the focus on the menu or the toggle button. */

    react.useEffect(() => {
      // Don't focus menu on first render.
      if (isInitialMountRef.current) {
        // Unless it was initialised as open.
        if ((initialIsOpen || defaultIsOpen || isOpen) && menuRef.current) {
          menuRef.current.focus();
        }

        return;
      } // Focus menu on open.


      if (isOpen) {
        // istanbul ignore else
        if (menuRef.current) {
          menuRef.current.focus();
        }

        return;
      } // Focus toggleButton on close, but not if it was closed with (Shift+)Tab.


      if (environment.document.activeElement === menuRef.current) {
        // istanbul ignore else
        if (toggleButtonRef.current) {
          shouldBlurRef.current = false;
          toggleButtonRef.current.focus();
        }
      } // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [isOpen]);
    react.useEffect(() => {
      if (isInitialMountRef.current) {
        return;
      }

      previousResultCountRef.current = items.length;
    }); // Add mouse/touch events to document.

    const mouseAndTouchTrackersRef = useMouseAndTouchTracker(isOpen, [menuRef, toggleButtonRef], environment, () => {
      dispatch({
        type: MenuBlur
      });
    });
    const setGetterPropCallInfo = useGetterPropsCalledChecker('getMenuProps', 'getToggleButtonProps'); // Make initial ref false.

    react.useEffect(() => {
      isInitialMountRef.current = false;
    }, []); // Reset itemRefs on close.

    react.useEffect(() => {
      if (!isOpen) {
        itemRefs.current = {};
      }
    }, [isOpen]); // Event handler functions.

    const toggleButtonKeyDownHandlers = react.useMemo(() => ({
      ArrowDown(event) {
        event.preventDefault();
        dispatch({
          type: ToggleButtonKeyDownArrowDown,
          getItemNodeFromIndex,
          shiftKey: event.shiftKey
        });
      },

      ArrowUp(event) {
        event.preventDefault();
        dispatch({
          type: ToggleButtonKeyDownArrowUp,
          getItemNodeFromIndex,
          shiftKey: event.shiftKey
        });
      }

    }), [dispatch, getItemNodeFromIndex]);
    const menuKeyDownHandlers = react.useMemo(() => ({
      ArrowDown(event) {
        event.preventDefault();
        dispatch({
          type: MenuKeyDownArrowDown,
          getItemNodeFromIndex,
          shiftKey: event.shiftKey
        });
      },

      ArrowUp(event) {
        event.preventDefault();
        dispatch({
          type: MenuKeyDownArrowUp,
          getItemNodeFromIndex,
          shiftKey: event.shiftKey
        });
      },

      Home(event) {
        event.preventDefault();
        dispatch({
          type: MenuKeyDownHome,
          getItemNodeFromIndex
        });
      },

      End(event) {
        event.preventDefault();
        dispatch({
          type: MenuKeyDownEnd,
          getItemNodeFromIndex
        });
      },

      Escape() {
        dispatch({
          type: MenuKeyDownEscape
        });
      },

      Enter(event) {
        event.preventDefault();
        dispatch({
          type: MenuKeyDownEnter
        });
      },

      ' '(event) {
        event.preventDefault();
        dispatch({
          type: MenuKeyDownSpaceButton
        });
      }

    }), [dispatch, getItemNodeFromIndex]); // Action functions.

    const toggleMenu = react.useCallback(() => {
      dispatch({
        type: FunctionToggleMenu$1
      });
    }, [dispatch]);
    const closeMenu = react.useCallback(() => {
      dispatch({
        type: FunctionCloseMenu$1
      });
    }, [dispatch]);
    const openMenu = react.useCallback(() => {
      dispatch({
        type: FunctionOpenMenu$1
      });
    }, [dispatch]);
    const setHighlightedIndex = react.useCallback(newHighlightedIndex => {
      dispatch({
        type: FunctionSetHighlightedIndex$1,
        highlightedIndex: newHighlightedIndex
      });
    }, [dispatch]);
    const selectItem = react.useCallback(newSelectedItem => {
      dispatch({
        type: FunctionSelectItem$1,
        selectedItem: newSelectedItem
      });
    }, [dispatch]);
    const reset = react.useCallback(() => {
      dispatch({
        type: FunctionReset$2
      });
    }, [dispatch]);
    const setInputValue = react.useCallback(newInputValue => {
      dispatch({
        type: FunctionSetInputValue$1,
        inputValue: newInputValue
      });
    }, [dispatch]); // Getter functions.

    const getLabelProps = react.useCallback(labelProps => ({
      id: elementIds.labelId,
      htmlFor: elementIds.toggleButtonId,
      ...labelProps
    }), [elementIds]);
    const getMenuProps = react.useCallback(function (_temp, _temp2) {
      let {
        onMouseLeave,
        refKey = 'ref',
        onKeyDown,
        onBlur,
        ref,
        ...rest
      } = _temp === void 0 ? {} : _temp;
      let {
        suppressRefError = false
      } = _temp2 === void 0 ? {} : _temp2;
      const latestState = latest.current.state;

      const menuHandleKeyDown = event => {
        const key = normalizeArrowKey(event);

        if (key && menuKeyDownHandlers[key]) {
          menuKeyDownHandlers[key](event);
        } else if (isAcceptedCharacterKey(key)) {
          dispatch({
            type: MenuKeyDownCharacter,
            key,
            getItemNodeFromIndex
          });
        }
      };

      const menuHandleBlur = () => {
        // if the blur was a result of selection, we don't trigger this action.
        if (shouldBlurRef.current === false) {
          shouldBlurRef.current = true;
          return;
        }

        const shouldBlur = !mouseAndTouchTrackersRef.current.isMouseDown;
        /* istanbul ignore else */

        if (shouldBlur) {
          dispatch({
            type: MenuBlur
          });
        }
      };

      const menuHandleMouseLeave = () => {
        dispatch({
          type: MenuMouseLeave$1
        });
      };

      setGetterPropCallInfo('getMenuProps', suppressRefError, refKey, menuRef);
      return {
        [refKey]: handleRefs(ref, menuNode => {
          menuRef.current = menuNode;
        }),
        id: elementIds.menuId,
        role: 'listbox',
        'aria-labelledby': elementIds.labelId,
        tabIndex: -1,
        ...(latestState.isOpen && latestState.highlightedIndex > -1 && {
          'aria-activedescendant': elementIds.getItemId(latestState.highlightedIndex)
        }),
        onMouseLeave: callAllEventHandlers(onMouseLeave, menuHandleMouseLeave),
        onKeyDown: callAllEventHandlers(onKeyDown, menuHandleKeyDown),
        onBlur: callAllEventHandlers(onBlur, menuHandleBlur),
        ...rest
      };
    }, [dispatch, latest, menuKeyDownHandlers, mouseAndTouchTrackersRef, setGetterPropCallInfo, elementIds, getItemNodeFromIndex]);
    const getToggleButtonProps = react.useCallback(function (_temp3, _temp4) {
      let {
        onClick,
        onKeyDown,
        refKey = 'ref',
        ref,
        ...rest
      } = _temp3 === void 0 ? {} : _temp3;
      let {
        suppressRefError = false
      } = _temp4 === void 0 ? {} : _temp4;

      const toggleButtonHandleClick = () => {
        dispatch({
          type: ToggleButtonClick$1
        });
      };

      const toggleButtonHandleKeyDown = event => {
        const key = normalizeArrowKey(event);

        if (key && toggleButtonKeyDownHandlers[key]) {
          toggleButtonKeyDownHandlers[key](event);
        } else if (isAcceptedCharacterKey(key)) {
          dispatch({
            type: ToggleButtonKeyDownCharacter,
            key,
            getItemNodeFromIndex
          });
        }
      };

      const toggleProps = {
        [refKey]: handleRefs(ref, toggleButtonNode => {
          toggleButtonRef.current = toggleButtonNode;
        }),
        id: elementIds.toggleButtonId,
        'aria-haspopup': 'listbox',
        'aria-expanded': latest.current.state.isOpen,
        'aria-labelledby': `${elementIds.labelId} ${elementIds.toggleButtonId}`,
        ...rest
      };

      if (!rest.disabled) {
        toggleProps.onClick = callAllEventHandlers(onClick, toggleButtonHandleClick);
        toggleProps.onKeyDown = callAllEventHandlers(onKeyDown, toggleButtonHandleKeyDown);
      }

      setGetterPropCallInfo('getToggleButtonProps', suppressRefError, refKey, toggleButtonRef);
      return toggleProps;
    }, [dispatch, latest, toggleButtonKeyDownHandlers, setGetterPropCallInfo, elementIds, getItemNodeFromIndex]);
    const getItemProps = react.useCallback(function (_temp5) {
      let {
        item,
        index,
        onMouseMove,
        onClick,
        refKey = 'ref',
        ref,
        disabled,
        ...rest
      } = _temp5 === void 0 ? {} : _temp5;
      const {
        state: latestState,
        props: latestProps
      } = latest.current;

      const itemHandleMouseMove = () => {
        if (index === latestState.highlightedIndex) {
          return;
        }

        shouldScrollRef.current = false;
        dispatch({
          type: ItemMouseMove$1,
          index,
          disabled
        });
      };

      const itemHandleClick = () => {
        dispatch({
          type: ItemClick$1,
          index
        });
      };

      const itemIndex = getItemIndex(index, item, latestProps.items);

      if (itemIndex < 0) {
        throw new Error('Pass either item or item index in getItemProps!');
      }

      const itemProps = {
        disabled,
        role: 'option',
        'aria-selected': `${itemIndex === latestState.highlightedIndex}`,
        id: elementIds.getItemId(itemIndex),
        [refKey]: handleRefs(ref, itemNode => {
          if (itemNode) {
            itemRefs.current[elementIds.getItemId(itemIndex)] = itemNode;
          }
        }),
        ...rest
      };

      if (!disabled) {
        itemProps.onClick = callAllEventHandlers(onClick, itemHandleClick);
      }

      itemProps.onMouseMove = callAllEventHandlers(onMouseMove, itemHandleMouseMove);
      return itemProps;
    }, [dispatch, latest, shouldScrollRef, elementIds]);
    return {
      // prop getters.
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getItemProps,
      // actions.
      toggleMenu,
      openMenu,
      closeMenu,
      setHighlightedIndex,
      selectItem,
      reset,
      setInputValue,
      // state.
      highlightedIndex,
      isOpen,
      selectedItem,
      inputValue
    };
  }

  const InputKeyDownArrowDown = '__input_keydown_arrow_down__' ;
  const InputKeyDownArrowUp = '__input_keydown_arrow_up__' ;
  const InputKeyDownEscape = '__input_keydown_escape__' ;
  const InputKeyDownHome = '__input_keydown_home__' ;
  const InputKeyDownEnd = '__input_keydown_end__' ;
  const InputKeyDownEnter = '__input_keydown_enter__' ;
  const InputChange = '__input_change__' ;
  const InputBlur = '__input_blur__' ;
  const MenuMouseLeave = '__menu_mouse_leave__' ;
  const ItemMouseMove = '__item_mouse_move__' ;
  const ItemClick = '__item_click__' ;
  const ToggleButtonClick = '__togglebutton_click__' ;
  const FunctionToggleMenu = '__function_toggle_menu__' ;
  const FunctionOpenMenu = '__function_open_menu__' ;
  const FunctionCloseMenu = '__function_close_menu__' ;
  const FunctionSetHighlightedIndex = '__function_set_highlighted_index__' ;
  const FunctionSelectItem = '__function_select_item__' ;
  const FunctionSetInputValue = '__function_set_input_value__' ;
  const FunctionReset$1 = '__function_reset__' ;
  const ControlledPropUpdatedSelectedItem = '__controlled_prop_updated_selected_item__' ;

  var stateChangeTypes$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    InputKeyDownArrowDown: InputKeyDownArrowDown,
    InputKeyDownArrowUp: InputKeyDownArrowUp,
    InputKeyDownEscape: InputKeyDownEscape,
    InputKeyDownHome: InputKeyDownHome,
    InputKeyDownEnd: InputKeyDownEnd,
    InputKeyDownEnter: InputKeyDownEnter,
    InputChange: InputChange,
    InputBlur: InputBlur,
    MenuMouseLeave: MenuMouseLeave,
    ItemMouseMove: ItemMouseMove,
    ItemClick: ItemClick,
    ToggleButtonClick: ToggleButtonClick,
    FunctionToggleMenu: FunctionToggleMenu,
    FunctionOpenMenu: FunctionOpenMenu,
    FunctionCloseMenu: FunctionCloseMenu,
    FunctionSetHighlightedIndex: FunctionSetHighlightedIndex,
    FunctionSelectItem: FunctionSelectItem,
    FunctionSetInputValue: FunctionSetInputValue,
    FunctionReset: FunctionReset$1,
    ControlledPropUpdatedSelectedItem: ControlledPropUpdatedSelectedItem
  });

  function getInitialState$1(props) {
    const initialState = getInitialState$2(props);
    const {
      selectedItem
    } = initialState;
    let {
      inputValue
    } = initialState;

    if (inputValue === '' && selectedItem && props.defaultInputValue === undefined && props.initialInputValue === undefined && props.inputValue === undefined) {
      inputValue = props.itemToString(selectedItem);
    }

    return { ...initialState,
      inputValue
    };
  }

  const propTypes$1 = {
    items: PropTypes.array.isRequired,
    itemToString: PropTypes.func,
    getA11yStatusMessage: PropTypes.func,
    getA11ySelectionMessage: PropTypes.func,
    circularNavigation: PropTypes.bool,
    highlightedIndex: PropTypes.number,
    defaultHighlightedIndex: PropTypes.number,
    initialHighlightedIndex: PropTypes.number,
    isOpen: PropTypes.bool,
    defaultIsOpen: PropTypes.bool,
    initialIsOpen: PropTypes.bool,
    selectedItem: PropTypes.any,
    initialSelectedItem: PropTypes.any,
    defaultSelectedItem: PropTypes.any,
    inputValue: PropTypes.string,
    defaultInputValue: PropTypes.string,
    initialInputValue: PropTypes.string,
    id: PropTypes.string,
    labelId: PropTypes.string,
    menuId: PropTypes.string,
    getItemId: PropTypes.func,
    inputId: PropTypes.string,
    toggleButtonId: PropTypes.string,
    stateReducer: PropTypes.func,
    onSelectedItemChange: PropTypes.func,
    onHighlightedIndexChange: PropTypes.func,
    onStateChange: PropTypes.func,
    onIsOpenChange: PropTypes.func,
    onInputValueChange: PropTypes.func,
    environment: PropTypes.shape({
      addEventListener: PropTypes.func,
      removeEventListener: PropTypes.func,
      document: PropTypes.shape({
        getElementById: PropTypes.func,
        activeElement: PropTypes.any,
        body: PropTypes.any
      })
    })
  };
  /**
   * The useCombobox version of useControlledReducer, which also
   * checks if the controlled prop selectedItem changed between
   * renders. If so, it will also update inputValue with its
   * string equivalent. It uses the common useEnhancedReducer to
   * compute the rest of the state.
   *
   * @param {Function} reducer Reducer function from downshift.
   * @param {Object} initialState Initial state of the hook.
   * @param {Object} props The hook props.
   * @returns {Array} An array with the state and an action dispatcher.
   */

  function useControlledReducer(reducer, initialState, props) {
    const previousSelectedItemRef = react.useRef();
    const [state, dispatch] = useEnhancedReducer(reducer, initialState, props); // ToDo: if needed, make same approach as selectedItemChanged from Downshift.

    react.useEffect(() => {
      if (isControlledProp(props, 'selectedItem')) {
        if (previousSelectedItemRef.current !== props.selectedItem) {
          dispatch({
            type: ControlledPropUpdatedSelectedItem,
            inputValue: props.itemToString(props.selectedItem)
          });
        }

        previousSelectedItemRef.current = state.selectedItem === previousSelectedItemRef.current ? props.selectedItem : state.selectedItem;
      }
    });
    return [getState(state, props), dispatch];
  } // eslint-disable-next-line import/no-mutable-exports


  let validatePropTypes$1 = noop;
  /* istanbul ignore next */

  {
    validatePropTypes$1 = (options, caller) => {
      PropTypes.checkPropTypes(propTypes$1, options, 'prop', caller.name);
    };
  }

  const defaultProps$1 = { ...defaultProps$3,
    getA11yStatusMessage: getA11yStatusMessage$1,
    circularNavigation: true
  };

  /* eslint-disable complexity */

  function downshiftUseComboboxReducer(state, action) {
    const {
      type,
      props,
      shiftKey
    } = action;
    let changes;

    switch (type) {
      case ItemClick:
        changes = {
          isOpen: getDefaultValue$1(props, 'isOpen'),
          highlightedIndex: getDefaultValue$1(props, 'highlightedIndex'),
          selectedItem: props.items[action.index],
          inputValue: props.itemToString(props.items[action.index])
        };
        break;

      case InputKeyDownArrowDown:
        if (state.isOpen) {
          changes = {
            highlightedIndex: getNextWrappingIndex(shiftKey ? 5 : 1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, props.circularNavigation)
          };
        } else {
          changes = {
            highlightedIndex: getHighlightedIndexOnOpen(props, state, 1, action.getItemNodeFromIndex),
            isOpen: props.items.length >= 0
          };
        }

        break;

      case InputKeyDownArrowUp:
        if (state.isOpen) {
          changes = {
            highlightedIndex: getNextWrappingIndex(shiftKey ? -5 : -1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, props.circularNavigation)
          };
        } else {
          changes = {
            highlightedIndex: getHighlightedIndexOnOpen(props, state, -1, action.getItemNodeFromIndex),
            isOpen: props.items.length >= 0
          };
        }

        break;

      case InputKeyDownEnter:
        changes = { ...(state.isOpen && state.highlightedIndex >= 0 && {
            selectedItem: props.items[state.highlightedIndex],
            isOpen: getDefaultValue$1(props, 'isOpen'),
            highlightedIndex: getDefaultValue$1(props, 'highlightedIndex'),
            inputValue: props.itemToString(props.items[state.highlightedIndex])
          })
        };
        break;

      case InputKeyDownEscape:
        changes = {
          isOpen: false,
          highlightedIndex: -1,
          ...(!state.isOpen && {
            selectedItem: null,
            inputValue: ''
          })
        };
        break;

      case InputKeyDownHome:
        changes = {
          highlightedIndex: getNextNonDisabledIndex(1, 0, props.items.length, action.getItemNodeFromIndex, false)
        };
        break;

      case InputKeyDownEnd:
        changes = {
          highlightedIndex: getNextNonDisabledIndex(-1, props.items.length - 1, props.items.length, action.getItemNodeFromIndex, false)
        };
        break;

      case InputBlur:
        changes = {
          isOpen: false,
          highlightedIndex: -1,
          ...(state.highlightedIndex >= 0 && action.selectItem && {
            selectedItem: props.items[state.highlightedIndex],
            inputValue: props.itemToString(props.items[state.highlightedIndex])
          })
        };
        break;

      case InputChange:
        changes = {
          isOpen: true,
          highlightedIndex: getDefaultValue$1(props, 'highlightedIndex'),
          inputValue: action.inputValue
        };
        break;

      case FunctionSelectItem:
        changes = {
          selectedItem: action.selectedItem,
          inputValue: props.itemToString(action.selectedItem)
        };
        break;

      case ControlledPropUpdatedSelectedItem:
        changes = {
          inputValue: action.inputValue
        };
        break;

      default:
        return downshiftCommonReducer(state, action, stateChangeTypes$1);
    }

    return { ...state,
      ...changes
    };
  }
  /* eslint-enable complexity */

  /* eslint-disable max-statements */
  useCombobox.stateChangeTypes = stateChangeTypes$1;

  function useCombobox(userProps) {
    if (userProps === void 0) {
      userProps = {};
    }

    validatePropTypes$1(userProps, useCombobox); // Props defaults and destructuring.

    const props = { ...defaultProps$1,
      ...userProps
    };
    const {
      initialIsOpen,
      defaultIsOpen,
      items,
      scrollIntoView,
      environment,
      getA11yStatusMessage,
      getA11ySelectionMessage,
      itemToString
    } = props; // Initial state depending on controlled props.

    const initialState = getInitialState$1(props);
    const [state, dispatch] = useControlledReducer(downshiftUseComboboxReducer, initialState, props);
    const {
      isOpen,
      highlightedIndex,
      selectedItem,
      inputValue
    } = state; // Element refs.

    const menuRef = react.useRef(null);
    const itemRefs = react.useRef({});
    const inputRef = react.useRef(null);
    const toggleButtonRef = react.useRef(null);
    const comboboxRef = react.useRef(null);
    const isInitialMountRef = react.useRef(true); // prevent id re-generation between renders.

    const elementIds = useElementIds(props); // used to keep track of how many items we had on previous cycle.

    const previousResultCountRef = react.useRef(); // utility callback to get item element.

    const latest = useLatestRef({
      state,
      props
    });
    const getItemNodeFromIndex = react.useCallback(index => itemRefs.current[elementIds.getItemId(index)], [elementIds]); // Effects.
    // Sets a11y status message on changes in state.

    useA11yMessageSetter(getA11yStatusMessage, [isOpen, highlightedIndex, inputValue, items], {
      isInitialMount: isInitialMountRef.current,
      previousResultCount: previousResultCountRef.current,
      items,
      environment,
      itemToString,
      ...state
    }); // Sets a11y status message on changes in selectedItem.

    useA11yMessageSetter(getA11ySelectionMessage, [selectedItem], {
      isInitialMount: isInitialMountRef.current,
      previousResultCount: previousResultCountRef.current,
      items,
      environment,
      itemToString,
      ...state
    }); // Scroll on highlighted item if change comes from keyboard.

    const shouldScrollRef = useScrollIntoView({
      menuElement: menuRef.current,
      highlightedIndex,
      isOpen,
      itemRefs,
      scrollIntoView,
      getItemNodeFromIndex
    });
    useControlPropsValidator({
      isInitialMount: isInitialMountRef.current,
      props,
      state
    }); // Focus the input on first render if required.

    react.useEffect(() => {
      const focusOnOpen = initialIsOpen || defaultIsOpen || isOpen;

      if (focusOnOpen && inputRef.current) {
        inputRef.current.focus();
      } // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);
    react.useEffect(() => {
      if (isInitialMountRef.current) {
        return;
      }

      previousResultCountRef.current = items.length;
    }); // Add mouse/touch events to document.

    const mouseAndTouchTrackersRef = useMouseAndTouchTracker(isOpen, [comboboxRef, menuRef, toggleButtonRef], environment, () => {
      dispatch({
        type: InputBlur,
        selectItem: false
      });
    });
    const setGetterPropCallInfo = useGetterPropsCalledChecker('getInputProps', 'getComboboxProps', 'getMenuProps'); // Make initial ref false.

    react.useEffect(() => {
      isInitialMountRef.current = false;
    }, []); // Reset itemRefs on close.

    react.useEffect(() => {
      if (!isOpen) {
        itemRefs.current = {};
      }
    }, [isOpen]);
    /* Event handler functions */

    const inputKeyDownHandlers = react.useMemo(() => ({
      ArrowDown(event) {
        event.preventDefault();
        dispatch({
          type: InputKeyDownArrowDown,
          shiftKey: event.shiftKey,
          getItemNodeFromIndex
        });
      },

      ArrowUp(event) {
        event.preventDefault();
        dispatch({
          type: InputKeyDownArrowUp,
          shiftKey: event.shiftKey,
          getItemNodeFromIndex
        });
      },

      Home(event) {
        if (!latest.current.state.isOpen) {
          return;
        }

        event.preventDefault();
        dispatch({
          type: InputKeyDownHome,
          getItemNodeFromIndex
        });
      },

      End(event) {
        if (!latest.current.state.isOpen) {
          return;
        }

        event.preventDefault();
        dispatch({
          type: InputKeyDownEnd,
          getItemNodeFromIndex
        });
      },

      Escape(event) {
        const latestState = latest.current.state;

        if (latestState.isOpen || latestState.inputValue || latestState.selectedItem || latestState.highlightedIndex > -1) {
          event.preventDefault();
          dispatch({
            type: InputKeyDownEscape
          });
        }
      },

      Enter(event) {
        const latestState = latest.current.state; // if closed or no highlighted index, do nothing.

        if (!latestState.isOpen || latestState.highlightedIndex < 0 || event.which === 229 // if IME composing, wait for next Enter keydown event.
        ) {
          return;
        }

        event.preventDefault();
        dispatch({
          type: InputKeyDownEnter,
          getItemNodeFromIndex
        });
      }

    }), [dispatch, latest, getItemNodeFromIndex]); // Getter props.

    const getLabelProps = react.useCallback(labelProps => ({
      id: elementIds.labelId,
      htmlFor: elementIds.inputId,
      ...labelProps
    }), [elementIds]);
    const getMenuProps = react.useCallback(function (_temp, _temp2) {
      let {
        onMouseLeave,
        refKey = 'ref',
        ref,
        ...rest
      } = _temp === void 0 ? {} : _temp;
      let {
        suppressRefError = false
      } = _temp2 === void 0 ? {} : _temp2;
      setGetterPropCallInfo('getMenuProps', suppressRefError, refKey, menuRef);
      return {
        [refKey]: handleRefs(ref, menuNode => {
          menuRef.current = menuNode;
        }),
        id: elementIds.menuId,
        role: 'listbox',
        'aria-labelledby': elementIds.labelId,
        onMouseLeave: callAllEventHandlers(onMouseLeave, () => {
          dispatch({
            type: MenuMouseLeave
          });
        }),
        ...rest
      };
    }, [dispatch, setGetterPropCallInfo, elementIds]);
    const getItemProps = react.useCallback(function (_temp3) {
      let {
        item,
        index,
        refKey = 'ref',
        ref,
        onMouseMove,
        onMouseDown,
        onClick,
        onPress,
        disabled,
        ...rest
      } = _temp3 === void 0 ? {} : _temp3;
      const {
        props: latestProps,
        state: latestState
      } = latest.current;
      const itemIndex = getItemIndex(index, item, latestProps.items);

      if (itemIndex < 0) {
        throw new Error('Pass either item or item index in getItemProps!');
      }

      const onSelectKey = 'onClick';
      const customClickHandler = onClick;

      const itemHandleMouseMove = () => {
        if (index === latestState.highlightedIndex) {
          return;
        }

        shouldScrollRef.current = false;
        dispatch({
          type: ItemMouseMove,
          index,
          disabled
        });
      };

      const itemHandleClick = () => {
        dispatch({
          type: ItemClick,
          index
        });
      };

      const itemHandleMouseDown = e => e.preventDefault();

      return {
        [refKey]: handleRefs(ref, itemNode => {
          if (itemNode) {
            itemRefs.current[elementIds.getItemId(itemIndex)] = itemNode;
          }
        }),
        disabled,
        role: 'option',
        'aria-selected': `${itemIndex === latestState.highlightedIndex}`,
        id: elementIds.getItemId(itemIndex),
        ...(!disabled && {
          [onSelectKey]: callAllEventHandlers(customClickHandler, itemHandleClick)
        }),
        onMouseMove: callAllEventHandlers(onMouseMove, itemHandleMouseMove),
        onMouseDown: callAllEventHandlers(onMouseDown, itemHandleMouseDown),
        ...rest
      };
    }, [dispatch, latest, shouldScrollRef, elementIds]);
    const getToggleButtonProps = react.useCallback(function (_temp4) {
      let {
        onClick,
        onPress,
        refKey = 'ref',
        ref,
        ...rest
      } = _temp4 === void 0 ? {} : _temp4;

      const toggleButtonHandleClick = () => {
        dispatch({
          type: ToggleButtonClick
        });

        if (!latest.current.state.isOpen && inputRef.current) {
          inputRef.current.focus();
        }
      };

      return {
        [refKey]: handleRefs(ref, toggleButtonNode => {
          toggleButtonRef.current = toggleButtonNode;
        }),
        id: elementIds.toggleButtonId,
        tabIndex: -1,
        ...(!rest.disabled && { ...({
            onClick: callAllEventHandlers(onClick, toggleButtonHandleClick)
          })
        }),
        ...rest
      };
    }, [dispatch, latest, elementIds]);
    const getInputProps = react.useCallback(function (_temp5, _temp6) {
      let {
        onKeyDown,
        onChange,
        onInput,
        onBlur,
        onChangeText,
        refKey = 'ref',
        ref,
        ...rest
      } = _temp5 === void 0 ? {} : _temp5;
      let {
        suppressRefError = false
      } = _temp6 === void 0 ? {} : _temp6;
      setGetterPropCallInfo('getInputProps', suppressRefError, refKey, inputRef);
      const latestState = latest.current.state;

      const inputHandleKeyDown = event => {
        const key = normalizeArrowKey(event);

        if (key && inputKeyDownHandlers[key]) {
          inputKeyDownHandlers[key](event);
        }
      };

      const inputHandleChange = event => {
        dispatch({
          type: InputChange,
          inputValue: event.target.value
        });
      };

      const inputHandleBlur = () => {
        /* istanbul ignore else */
        if (latestState.isOpen && !mouseAndTouchTrackersRef.current.isMouseDown) {
          dispatch({
            type: InputBlur,
            selectItem: true
          });
        }
      };
      /* istanbul ignore next (preact) */


      const onChangeKey = 'onChange';
      let eventHandlers = {};

      if (!rest.disabled) {
        eventHandlers = {
          [onChangeKey]: callAllEventHandlers(onChange, onInput, inputHandleChange),
          onKeyDown: callAllEventHandlers(onKeyDown, inputHandleKeyDown),
          onBlur: callAllEventHandlers(onBlur, inputHandleBlur)
        };
      }

      return {
        [refKey]: handleRefs(ref, inputNode => {
          inputRef.current = inputNode;
        }),
        id: elementIds.inputId,
        'aria-autocomplete': 'list',
        'aria-controls': elementIds.menuId,
        ...(latestState.isOpen && latestState.highlightedIndex > -1 && {
          'aria-activedescendant': elementIds.getItemId(latestState.highlightedIndex)
        }),
        'aria-labelledby': elementIds.labelId,
        // https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
        // revert back since autocomplete="nope" is ignored on latest Chrome and Opera
        autoComplete: 'off',
        value: latestState.inputValue,
        ...eventHandlers,
        ...rest
      };
    }, [dispatch, inputKeyDownHandlers, latest, mouseAndTouchTrackersRef, setGetterPropCallInfo, elementIds]);
    const getComboboxProps = react.useCallback(function (_temp7, _temp8) {
      let {
        refKey = 'ref',
        ref,
        ...rest
      } = _temp7 === void 0 ? {} : _temp7;
      let {
        suppressRefError = false
      } = _temp8 === void 0 ? {} : _temp8;
      setGetterPropCallInfo('getComboboxProps', suppressRefError, refKey, comboboxRef);
      return {
        [refKey]: handleRefs(ref, comboboxNode => {
          comboboxRef.current = comboboxNode;
        }),
        role: 'combobox',
        'aria-haspopup': 'listbox',
        'aria-owns': elementIds.menuId,
        'aria-expanded': latest.current.state.isOpen,
        ...rest
      };
    }, [latest, setGetterPropCallInfo, elementIds]); // returns

    const toggleMenu = react.useCallback(() => {
      dispatch({
        type: FunctionToggleMenu
      });
    }, [dispatch]);
    const closeMenu = react.useCallback(() => {
      dispatch({
        type: FunctionCloseMenu
      });
    }, [dispatch]);
    const openMenu = react.useCallback(() => {
      dispatch({
        type: FunctionOpenMenu
      });
    }, [dispatch]);
    const setHighlightedIndex = react.useCallback(newHighlightedIndex => {
      dispatch({
        type: FunctionSetHighlightedIndex,
        highlightedIndex: newHighlightedIndex
      });
    }, [dispatch]);
    const selectItem = react.useCallback(newSelectedItem => {
      dispatch({
        type: FunctionSelectItem,
        selectedItem: newSelectedItem
      });
    }, [dispatch]);
    const setInputValue = react.useCallback(newInputValue => {
      dispatch({
        type: FunctionSetInputValue,
        inputValue: newInputValue
      });
    }, [dispatch]);
    const reset = react.useCallback(() => {
      dispatch({
        type: FunctionReset$1
      });
    }, [dispatch]);
    return {
      // prop getters.
      getItemProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      getToggleButtonProps,
      // actions.
      toggleMenu,
      openMenu,
      closeMenu,
      setHighlightedIndex,
      setInputValue,
      selectItem,
      reset,
      // state.
      highlightedIndex,
      isOpen,
      selectedItem,
      inputValue
    };
  }

  const defaultStateValues = {
    activeIndex: -1,
    selectedItems: []
  };
  /**
   * Returns the initial value for a state key in the following order:
   * 1. controlled prop, 2. initial prop, 3. default prop, 4. default
   * value from Downshift.
   *
   * @param {Object} props Props passed to the hook.
   * @param {string} propKey Props key to generate the value for.
   * @returns {any} The initial value for that prop.
   */

  function getInitialValue(props, propKey) {
    return getInitialValue$1(props, propKey, defaultStateValues);
  }
  /**
   * Returns the default value for a state key in the following order:
   * 1. controlled prop, 2. default prop, 3. default value from Downshift.
   *
   * @param {Object} props Props passed to the hook.
   * @param {string} propKey Props key to generate the value for.
   * @returns {any} The initial value for that prop.
   */


  function getDefaultValue(props, propKey) {
    return getDefaultValue$1(props, propKey, defaultStateValues);
  }
  /**
   * Gets the initial state based on the provided props. It uses initial, default
   * and controlled props related to state in order to compute the initial value.
   *
   * @param {Object} props Props passed to the hook.
   * @returns {Object} The initial state.
   */


  function getInitialState(props) {
    const activeIndex = getInitialValue(props, 'activeIndex');
    const selectedItems = getInitialValue(props, 'selectedItems');
    return {
      activeIndex,
      selectedItems
    };
  }
  /**
   * Returns true if dropdown keydown operation is permitted. Should not be
   * allowed on keydown with modifier keys (ctrl, alt, shift, meta), on
   * input element with text content that is either highlighted or selection
   * cursor is not at the starting position.
   *
   * @param {KeyboardEvent} event The event from keydown.
   * @returns {boolean} Whether the operation is allowed.
   */


  function isKeyDownOperationPermitted(event) {
    if (event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
      return false;
    }

    const element = event.target;

    if (element instanceof HTMLInputElement && // if element is a text input
    element.value !== '' && ( // and we have text in it
    // and cursor is either not at the start or is currently highlighting text.
    element.selectionStart !== 0 || element.selectionEnd !== 0)) {
      return false;
    }

    return true;
  }
  /**
   * Returns a message to be added to aria-live region when item is removed.
   *
   * @param {Object} selectionParameters Parameters required to build the message.
   * @returns {string} The a11y message.
   */


  function getA11yRemovalMessage(selectionParameters) {
    const {
      removedSelectedItem,
      itemToString: itemToStringLocal
    } = selectionParameters;
    return `${itemToStringLocal(removedSelectedItem)} has been removed.`;
  }

  const propTypes = {
    selectedItems: PropTypes.array,
    initialSelectedItems: PropTypes.array,
    defaultSelectedItems: PropTypes.array,
    itemToString: PropTypes.func,
    getA11yRemovalMessage: PropTypes.func,
    stateReducer: PropTypes.func,
    activeIndex: PropTypes.number,
    initialActiveIndex: PropTypes.number,
    defaultActiveIndex: PropTypes.number,
    onActiveIndexChange: PropTypes.func,
    onSelectedItemsChange: PropTypes.func,
    keyNavigationNext: PropTypes.string,
    keyNavigationPrevious: PropTypes.string,
    environment: PropTypes.shape({
      addEventListener: PropTypes.func,
      removeEventListener: PropTypes.func,
      document: PropTypes.shape({
        getElementById: PropTypes.func,
        activeElement: PropTypes.any,
        body: PropTypes.any
      })
    })
  };
  const defaultProps = {
    itemToString: defaultProps$3.itemToString,
    stateReducer: defaultProps$3.stateReducer,
    environment: defaultProps$3.environment,
    getA11yRemovalMessage,
    keyNavigationNext: 'ArrowRight',
    keyNavigationPrevious: 'ArrowLeft'
  }; // eslint-disable-next-line import/no-mutable-exports

  let validatePropTypes = noop;
  /* istanbul ignore next */

  {
    validatePropTypes = (options, caller) => {
      PropTypes.checkPropTypes(propTypes, options, 'prop', caller.name);
    };
  }

  const SelectedItemClick = '__selected_item_click__' ;
  const SelectedItemKeyDownDelete = '__selected_item_keydown_delete__' ;
  const SelectedItemKeyDownBackspace = '__selected_item_keydown_backspace__' ;
  const SelectedItemKeyDownNavigationNext = '__selected_item_keydown_navigation_next__' ;
  const SelectedItemKeyDownNavigationPrevious = '__selected_item_keydown_navigation_previous__' ;
  const DropdownKeyDownNavigationPrevious = '__dropdown_keydown_navigation_previous__' ;
  const DropdownKeyDownBackspace = '__dropdown_keydown_backspace__' ;
  const DropdownClick = '__dropdown_click__' ;
  const FunctionAddSelectedItem = '__function_add_selected_item__' ;
  const FunctionRemoveSelectedItem = '__function_remove_selected_item__' ;
  const FunctionSetSelectedItems = '__function_set_selected_items__' ;
  const FunctionSetActiveIndex = '__function_set_active_index__' ;
  const FunctionReset = '__function_reset__' ;

  var stateChangeTypes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SelectedItemClick: SelectedItemClick,
    SelectedItemKeyDownDelete: SelectedItemKeyDownDelete,
    SelectedItemKeyDownBackspace: SelectedItemKeyDownBackspace,
    SelectedItemKeyDownNavigationNext: SelectedItemKeyDownNavigationNext,
    SelectedItemKeyDownNavigationPrevious: SelectedItemKeyDownNavigationPrevious,
    DropdownKeyDownNavigationPrevious: DropdownKeyDownNavigationPrevious,
    DropdownKeyDownBackspace: DropdownKeyDownBackspace,
    DropdownClick: DropdownClick,
    FunctionAddSelectedItem: FunctionAddSelectedItem,
    FunctionRemoveSelectedItem: FunctionRemoveSelectedItem,
    FunctionSetSelectedItems: FunctionSetSelectedItems,
    FunctionSetActiveIndex: FunctionSetActiveIndex,
    FunctionReset: FunctionReset
  });

  /* eslint-disable complexity */

  function downshiftMultipleSelectionReducer(state, action) {
    const {
      type,
      index,
      props,
      selectedItem
    } = action;
    const {
      activeIndex,
      selectedItems
    } = state;
    let changes;

    switch (type) {
      case SelectedItemClick:
        changes = {
          activeIndex: index
        };
        break;

      case SelectedItemKeyDownNavigationPrevious:
        changes = {
          activeIndex: activeIndex - 1 < 0 ? 0 : activeIndex - 1
        };
        break;

      case SelectedItemKeyDownNavigationNext:
        changes = {
          activeIndex: activeIndex + 1 >= selectedItems.length ? -1 : activeIndex + 1
        };
        break;

      case SelectedItemKeyDownBackspace:
      case SelectedItemKeyDownDelete:
        {
          let newActiveIndex = activeIndex;

          if (selectedItems.length === 1) {
            newActiveIndex = -1;
          } else if (activeIndex === selectedItems.length - 1) {
            newActiveIndex = selectedItems.length - 2;
          }

          changes = {
            selectedItems: [...selectedItems.slice(0, activeIndex), ...selectedItems.slice(activeIndex + 1)],
            ...{
              activeIndex: newActiveIndex
            }
          };
          break;
        }

      case DropdownKeyDownNavigationPrevious:
        changes = {
          activeIndex: selectedItems.length - 1
        };
        break;

      case DropdownKeyDownBackspace:
        changes = {
          selectedItems: selectedItems.slice(0, selectedItems.length - 1)
        };
        break;

      case FunctionAddSelectedItem:
        changes = {
          selectedItems: [...selectedItems, selectedItem]
        };
        break;

      case DropdownClick:
        changes = {
          activeIndex: -1
        };
        break;

      case FunctionRemoveSelectedItem:
        {
          let newActiveIndex = activeIndex;
          const selectedItemIndex = selectedItems.indexOf(selectedItem);

          if (selectedItemIndex >= 0) {
            if (selectedItems.length === 1) {
              newActiveIndex = -1;
            } else if (selectedItemIndex === selectedItems.length - 1) {
              newActiveIndex = selectedItems.length - 2;
            }

            changes = {
              selectedItems: [...selectedItems.slice(0, selectedItemIndex), ...selectedItems.slice(selectedItemIndex + 1)],
              activeIndex: newActiveIndex
            };
          }

          break;
        }

      case FunctionSetSelectedItems:
        {
          const {
            selectedItems: newSelectedItems
          } = action;
          changes = {
            selectedItems: newSelectedItems
          };
          break;
        }

      case FunctionSetActiveIndex:
        {
          const {
            activeIndex: newActiveIndex
          } = action;
          changes = {
            activeIndex: newActiveIndex
          };
          break;
        }

      case FunctionReset:
        changes = {
          activeIndex: getDefaultValue(props, 'activeIndex'),
          selectedItems: getDefaultValue(props, 'selectedItems')
        };
        break;

      default:
        throw new Error('Reducer called without proper action type.');
    }

    return { ...state,
      ...changes
    };
  }

  useMultipleSelection.stateChangeTypes = stateChangeTypes;

  function useMultipleSelection(userProps) {
    if (userProps === void 0) {
      userProps = {};
    }

    validatePropTypes(userProps, useMultipleSelection); // Props defaults and destructuring.

    const props = { ...defaultProps,
      ...userProps
    };
    const {
      getA11yRemovalMessage,
      itemToString,
      environment,
      keyNavigationNext,
      keyNavigationPrevious
    } = props; // Reducer init.

    const [state, dispatch] = useControlledReducer$1(downshiftMultipleSelectionReducer, getInitialState(props), props);
    const {
      activeIndex,
      selectedItems
    } = state; // Refs.

    const isInitialMountRef = react.useRef(true);
    const dropdownRef = react.useRef(null);
    const previousSelectedItemsRef = react.useRef(selectedItems);
    const selectedItemRefs = react.useRef();
    selectedItemRefs.current = [];
    const latest = useLatestRef({
      state,
      props
    }); // Effects.

    /* Sets a11y status message on changes in selectedItem. */

    react.useEffect(() => {
      if (isInitialMountRef.current) {
        return;
      }

      if (selectedItems.length < previousSelectedItemsRef.current.length) {
        const removedSelectedItem = previousSelectedItemsRef.current.find(item => selectedItems.indexOf(item) < 0);
        setStatus(getA11yRemovalMessage({
          itemToString,
          resultCount: selectedItems.length,
          removedSelectedItem,
          activeIndex,
          activeSelectedItem: selectedItems[activeIndex]
        }), environment.document);
      }

      previousSelectedItemsRef.current = selectedItems; // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItems.length]); // Sets focus on active item.

    react.useEffect(() => {
      if (isInitialMountRef.current) {
        return;
      }

      if (activeIndex === -1 && dropdownRef.current) {
        dropdownRef.current.focus();
      } else if (selectedItemRefs.current[activeIndex]) {
        selectedItemRefs.current[activeIndex].focus();
      }
    }, [activeIndex]);
    useControlPropsValidator({
      isInitialMount: isInitialMountRef.current,
      props,
      state
    });
    const setGetterPropCallInfo = useGetterPropsCalledChecker('getDropdownProps'); // Make initial ref false.

    react.useEffect(() => {
      isInitialMountRef.current = false;
    }, []); // Event handler functions.

    const selectedItemKeyDownHandlers = react.useMemo(() => ({
      [keyNavigationPrevious]() {
        dispatch({
          type: SelectedItemKeyDownNavigationPrevious
        });
      },

      [keyNavigationNext]() {
        dispatch({
          type: SelectedItemKeyDownNavigationNext
        });
      },

      Delete() {
        dispatch({
          type: SelectedItemKeyDownDelete
        });
      },

      Backspace() {
        dispatch({
          type: SelectedItemKeyDownBackspace
        });
      }

    }), [dispatch, keyNavigationNext, keyNavigationPrevious]);
    const dropdownKeyDownHandlers = react.useMemo(() => ({
      [keyNavigationPrevious](event) {
        if (isKeyDownOperationPermitted(event)) {
          dispatch({
            type: DropdownKeyDownNavigationPrevious
          });
        }
      },

      Backspace(event) {
        if (isKeyDownOperationPermitted(event)) {
          dispatch({
            type: DropdownKeyDownBackspace
          });
        }
      }

    }), [dispatch, keyNavigationPrevious]); // Getter props.

    const getSelectedItemProps = react.useCallback(function (_temp) {
      let {
        refKey = 'ref',
        ref,
        onClick,
        onKeyDown,
        selectedItem,
        index,
        ...rest
      } = _temp === void 0 ? {} : _temp;
      const {
        state: latestState
      } = latest.current;
      const itemIndex = getItemIndex(index, selectedItem, latestState.selectedItems);

      if (itemIndex < 0) {
        throw new Error('Pass either selectedItem or index in getSelectedItemProps!');
      }

      const selectedItemHandleClick = () => {
        dispatch({
          type: SelectedItemClick,
          index
        });
      };

      const selectedItemHandleKeyDown = event => {
        const key = normalizeArrowKey(event);

        if (key && selectedItemKeyDownHandlers[key]) {
          selectedItemKeyDownHandlers[key](event);
        }
      };

      return {
        [refKey]: handleRefs(ref, selectedItemNode => {
          if (selectedItemNode) {
            selectedItemRefs.current.push(selectedItemNode);
          }
        }),
        tabIndex: index === latestState.activeIndex ? 0 : -1,
        onClick: callAllEventHandlers(onClick, selectedItemHandleClick),
        onKeyDown: callAllEventHandlers(onKeyDown, selectedItemHandleKeyDown),
        ...rest
      };
    }, [dispatch, latest, selectedItemKeyDownHandlers]);
    const getDropdownProps = react.useCallback(function (_temp2, _temp3) {
      let {
        refKey = 'ref',
        ref,
        onKeyDown,
        onClick,
        preventKeyAction = false,
        ...rest
      } = _temp2 === void 0 ? {} : _temp2;
      let {
        suppressRefError = false
      } = _temp3 === void 0 ? {} : _temp3;
      setGetterPropCallInfo('getDropdownProps', suppressRefError, refKey, dropdownRef);

      const dropdownHandleKeyDown = event => {
        const key = normalizeArrowKey(event);

        if (key && dropdownKeyDownHandlers[key]) {
          dropdownKeyDownHandlers[key](event);
        }
      };

      const dropdownHandleClick = () => {
        dispatch({
          type: DropdownClick
        });
      };

      return {
        [refKey]: handleRefs(ref, dropdownNode => {
          if (dropdownNode) {
            dropdownRef.current = dropdownNode;
          }
        }),
        ...(!preventKeyAction && {
          onKeyDown: callAllEventHandlers(onKeyDown, dropdownHandleKeyDown),
          onClick: callAllEventHandlers(onClick, dropdownHandleClick)
        }),
        ...rest
      };
    }, [dispatch, dropdownKeyDownHandlers, setGetterPropCallInfo]); // returns

    const addSelectedItem = react.useCallback(selectedItem => {
      dispatch({
        type: FunctionAddSelectedItem,
        selectedItem
      });
    }, [dispatch]);
    const removeSelectedItem = react.useCallback(selectedItem => {
      dispatch({
        type: FunctionRemoveSelectedItem,
        selectedItem
      });
    }, [dispatch]);
    const setSelectedItems = react.useCallback(newSelectedItems => {
      dispatch({
        type: FunctionSetSelectedItems,
        selectedItems: newSelectedItems
      });
    }, [dispatch]);
    const setActiveIndex = react.useCallback(newActiveIndex => {
      dispatch({
        type: FunctionSetActiveIndex,
        activeIndex: newActiveIndex
      });
    }, [dispatch]);
    const reset = react.useCallback(() => {
      dispatch({
        type: FunctionReset
      });
    }, [dispatch]);
    return {
      getSelectedItemProps,
      getDropdownProps,
      addSelectedItem,
      removeSelectedItem,
      setSelectedItems,
      setActiveIndex,
      reset,
      selectedItems,
      activeIndex
    };
  }

  exports["default"] = Downshift$1;
  exports.resetIdCounter = resetIdCounter;
  exports.useCombobox = useCombobox;
  exports.useMultipleSelection = useMultipleSelection;
  exports.useSelect = useSelect;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=downshift.umd.js.map
