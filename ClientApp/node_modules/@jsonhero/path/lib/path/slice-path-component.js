"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlicePathComponent = void 0;
var query_result_1 = require("./query-result");
var SlicePathComponent = /** @class */ (function () {
    function SlicePathComponent(startIndex, endIndex) {
        this.endIndex = null;
        this.isArray = true;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
    }
    SlicePathComponent.fromString = function (string) {
        if (!SlicePathComponent.regex.test(string)) {
            return null;
        }
        SlicePathComponent.regex.lastIndex = 0;
        var result = SlicePathComponent.regex.exec(string);
        if (result == null || result.groups == null) {
            return null;
        }
        // try and extract the numbers from the Regex
        var startResult = result.groups.startIndex;
        var endResult = result.groups.endIndex;
        var startIndex = startResult == null || startResult === '' ? 0 : parseInt(startResult, 10);
        var endIndex = endResult == null ? null : parseInt(endResult, 10);
        if (startIndex == null && endIndex == null) {
            return null;
        }
        var isStartInteger = Number.isInteger(startIndex);
        if (!isStartInteger) {
            return null;
        }
        return new SlicePathComponent(startIndex, endIndex);
    };
    SlicePathComponent.prototype.toString = function () {
        return "[".concat(this.startIndex).concat(this.endIndex == null ? '' : ':' + this.endIndex, "]");
    };
    SlicePathComponent.prototype.jsonPointer = function () {
        throw Error("JSON Pointers don't work with wildcards");
    };
    SlicePathComponent.prototype.query = function (results) {
        var newResults = [];
        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            var object = result.object;
            if (typeof object !== 'object')
                continue;
            if (!Array.isArray(object))
                continue;
            var slicedItems = void 0;
            if (this.endIndex == null) {
                slicedItems = object.slice(this.startIndex);
            }
            else {
                slicedItems = object.slice(this.startIndex, this.endIndex);
            }
            for (var j = 0; j < slicedItems.length; j++) {
                var slicedItem = slicedItems[j];
                newResults.push(new query_result_1.default(result.depth + 1, result.path.child("".concat(j + this.startIndex)), slicedItem));
            }
        }
        return newResults;
    };
    //pattern that matches [startIndex?:endIndex?]
    SlicePathComponent.regex = /^\[(?<startIndex>[0-9]*):(?<endIndex>\-?[0-9]*)?\]$/g;
    return SlicePathComponent;
}());
exports.SlicePathComponent = SlicePathComponent;
