"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StartPathComponent = /** @class */ (function () {
    function StartPathComponent() {
        this.keyName = '$';
        this.isArray = false;
    }
    StartPathComponent.fromString = function (string) {
        if (string === '$') {
            return new StartPathComponent();
        }
        return null;
    };
    StartPathComponent.prototype.toString = function () {
        return this.keyName;
    };
    StartPathComponent.prototype.jsonPointer = function () {
        return '';
    };
    StartPathComponent.prototype.query = function (objects) {
        //we don't want to actually do anything, this is just a marker for the start
        return objects;
    };
    return StartPathComponent;
}());
exports.default = StartPathComponent;
