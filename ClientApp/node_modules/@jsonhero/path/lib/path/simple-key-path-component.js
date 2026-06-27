"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleKeyPathComponent = void 0;
var query_result_1 = require("./query-result");
var SimpleKeyPathComponent = /** @class */ (function () {
    function SimpleKeyPathComponent(keyName) {
        this.isArray = false;
        this.keyName = keyName;
        var keyAsInteger = parseInt(this.keyName, 10);
        if (isNaN(keyAsInteger)) {
            return;
        }
        var isInteger = Number.isInteger(keyAsInteger);
        if (!isInteger) {
            return;
        }
        if (keyAsInteger < 0) {
            return;
        }
        this.isArray = true;
    }
    SimpleKeyPathComponent.fromString = function (string) {
        var keyName = string;
        SimpleKeyPathComponent.unescapeExpressions.forEach(function (unescapePair) {
            keyName = keyName.replace(unescapePair.search, unescapePair.replacement);
        });
        return new SimpleKeyPathComponent(keyName);
    };
    SimpleKeyPathComponent.prototype.toString = function () {
        var escapedString = this.keyName;
        SimpleKeyPathComponent.escapeExpressions.forEach(function (escapePair) {
            escapedString = escapedString.replace(escapePair.search, escapePair.replacement);
        });
        return escapedString;
    };
    SimpleKeyPathComponent.prototype.jsonPointer = function () {
        var escapedString = this.keyName;
        //replace ~ with ~0
        escapedString = escapedString.replace(/(\~)/g, '~0');
        //replace / with ~1
        escapedString = escapedString.replace(/(\/)/g, '~1');
        return escapedString;
    };
    SimpleKeyPathComponent.prototype.query = function (results) {
        var newResults = [];
        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            var object = result.object;
            if (typeof object !== 'object') {
                continue;
            }
            var newObject = object[this.keyName];
            if (newObject === null) {
                continue;
            }
            var newResult = new query_result_1.default(result.depth, result.path.child(this.keyName), newObject);
            newResults.push(newResult);
        }
        return newResults;
    };
    SimpleKeyPathComponent.escapeExpressions = [
        { search: new RegExp(/(\\)/g), replacement: '\\' },
        { search: new RegExp(/(\.)/g), replacement: '\\.' },
    ];
    SimpleKeyPathComponent.unescapeExpressions = [
        { search: new RegExp(/(\\\.)/g), replacement: '.' },
        { search: new RegExp(/(\\\\)/g), replacement: '\\' },
        { search: '~1', replacement: '/' },
    ];
    return SimpleKeyPathComponent;
}());
exports.SimpleKeyPathComponent = SimpleKeyPathComponent;
