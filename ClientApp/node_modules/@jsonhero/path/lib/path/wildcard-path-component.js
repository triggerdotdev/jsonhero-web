"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WildcardPathComponent = void 0;
var query_result_1 = require("./query-result");
var WildcardPathComponent = /** @class */ (function () {
    function WildcardPathComponent() {
        this.keyName = '*';
        this.isArray = true;
    }
    WildcardPathComponent.fromString = function (string) {
        if (string === '*') {
            return new WildcardPathComponent();
        }
        return null;
    };
    WildcardPathComponent.prototype.toString = function () {
        return this.keyName;
    };
    WildcardPathComponent.prototype.jsonPointer = function () {
        throw Error("JSON Pointers don't work with wildcards");
    };
    WildcardPathComponent.prototype.query = function (results) {
        var newResults = [];
        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            var object = result.object;
            if (typeof object !== 'object') {
                continue;
            }
            for (var key in object) {
                var newObject = object[key];
                var newResult = new query_result_1.default(result.depth + 1, result.path.child(key), newObject);
                newResults.push(newResult);
            }
        }
        return newResults;
    };
    return WildcardPathComponent;
}());
exports.WildcardPathComponent = WildcardPathComponent;
