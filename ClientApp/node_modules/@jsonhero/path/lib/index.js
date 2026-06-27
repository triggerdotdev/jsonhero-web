"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONHeroPath = void 0;
var path_builder_1 = require("./path/path-builder");
var query_result_1 = require("./path/query-result");
var start_path_component_1 = require("./path/start-path-component");
var JSONHeroPath = /** @class */ (function () {
    function JSONHeroPath(components) {
        if (typeof components == 'string') {
            var pathBuilder = new path_builder_1.default();
            this.components = pathBuilder.parse(components);
            return;
        }
        if (components.length == 0) {
            components.push(new start_path_component_1.default());
        }
        if (!(components[0] instanceof start_path_component_1.default)) {
            components.unshift(new start_path_component_1.default());
        }
        this.components = components;
    }
    JSONHeroPath.fromPointer = function (pointer) {
        var pathBuilder = new path_builder_1.default();
        return new JSONHeroPath(pathBuilder.parsePointer(pointer));
    };
    Object.defineProperty(JSONHeroPath.prototype, "root", {
        get: function () {
            return new JSONHeroPath(this.components.slice(0, 1));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(JSONHeroPath.prototype, "isRoot", {
        get: function () {
            if (this.components.length > 1)
                return false;
            return this.components[0] instanceof start_path_component_1.default;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(JSONHeroPath.prototype, "parent", {
        get: function () {
            if (this.components.length == 1) {
                return null;
            }
            return new JSONHeroPath(this.components.slice(0, -1));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(JSONHeroPath.prototype, "lastComponent", {
        get: function () {
            if (this.components.length === 0)
                return;
            return this.components[this.components.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    JSONHeroPath.prototype.child = function (key) {
        var string = this.toString();
        return new JSONHeroPath(string.concat(".".concat(key)));
    };
    JSONHeroPath.prototype.replaceComponent = function (index, newKey) {
        var pathBuilder = new path_builder_1.default();
        var newComponent = pathBuilder.parseComponent(newKey);
        var newComponents = __spreadArray([], this.components, true);
        newComponents[index] = newComponent;
        return new JSONHeroPath(newComponents);
    };
    JSONHeroPath.prototype.toString = function () {
        return this.components.map(function (component) { return component.toString(); }).join('.');
    };
    JSONHeroPath.prototype.jsonPointer = function () {
        if (this.components.length === 1)
            return '';
        return this.components.map(function (component) { return component.jsonPointer(); }).join('/');
    };
    JSONHeroPath.prototype.first = function (object, options) {
        if (options === void 0) { options = { includePath: false }; }
        var results = this.all(object, options);
        if (results === null || results.length === 0) {
            return null;
        }
        return results[0];
    };
    JSONHeroPath.prototype.all = function (object, options) {
        if (options === void 0) { options = { includePath: false }; }
        //if the path is just a wildcard then return the original object
        if (this.components.length == 0)
            return [object];
        if (this.components.length == 1 && this.components[0] instanceof start_path_component_1.default)
            return [object];
        var results = [];
        var firstResult = new query_result_1.default(0, this.root, object);
        results.push(firstResult);
        //use the path to traverse the object
        for (var i = 0; i < this.components.length; i++) {
            var component = this.components[i];
            results = component.query(results);
            if (results === null || results.length === 0) {
                return [];
            }
        }
        //flatten the result
        var flattenedResults = results.map(function (result) { return result.flatten(); });
        if (!options.includePath) {
            return flattenedResults.map(function (result) { return result.object; });
        }
        var all = [];
        for (var i = 0; i < flattenedResults.length; i++) {
            var flattenedResult = flattenedResults[i];
            var object_1 = {
                value: flattenedResult.object,
            };
            if (options.includePath) {
                object_1.path = flattenedResult.path;
            }
            all.push(object_1);
        }
        return all;
    };
    JSONHeroPath.prototype.set = function (object, newValue) {
        var allResults = this.all(object, { includePath: true });
        allResults.forEach(function (_a) {
            var path = _a.path;
            var parentPath = path.parent;
            var parentObject = parentPath === null || parentPath === void 0 ? void 0 : parentPath.first(object);
            if (!path.lastComponent)
                return;
            parentObject[path.lastComponent.toString()] = newValue;
        });
    };
    JSONHeroPath.prototype.merge = function (object, mergeValue) {
        var allResults = this.all(object, { includePath: true });
        allResults.forEach(function (_a) {
            var path = _a.path;
            var parentPath = path.parent;
            var parentObject = parentPath === null || parentPath === void 0 ? void 0 : parentPath.first(object);
            if (!path.lastComponent)
                return;
            var existingValue = parentObject[path.lastComponent.toString()];
            if (Array.isArray(existingValue)) {
                parentObject[path.lastComponent.toString()] = existingValue.concat([mergeValue].flat());
            }
            else {
                if (typeof mergeValue != 'object' || Array.isArray(mergeValue))
                    return;
                for (var key in mergeValue) {
                    existingValue[key] = mergeValue[key];
                }
            }
        });
    };
    return JSONHeroPath;
}());
exports.JSONHeroPath = JSONHeroPath;
