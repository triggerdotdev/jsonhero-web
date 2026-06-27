"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simple_key_path_component_1 = require("./simple-key-path-component");
var wildcard_path_component_1 = require("./wildcard-path-component");
var start_path_component_1 = require("./start-path-component");
var slice_path_component_1 = require("./slice-path-component");
var PathBuilder = /** @class */ (function () {
    function PathBuilder() {
    }
    PathBuilder.prototype.parse = function (path) {
        PathBuilder.pathPattern.lastIndex = 0;
        var subPaths = path.match(PathBuilder.pathPattern);
        var components = [new start_path_component_1.default()];
        if (subPaths == null || subPaths.length == 0 || (subPaths.length == 1 && subPaths[0] == '')) {
            return components;
        }
        //if there's a $ at the start we want to skip adding another StartPathComponent()
        var startIndex = 0;
        if (subPaths[0] == '$') {
            startIndex = 1;
        }
        for (var i = startIndex; i < subPaths.length; i++) {
            var subPath = subPaths[i];
            var pathComponent = this.parseComponent(subPath);
            components.push(pathComponent);
        }
        return components;
    };
    PathBuilder.prototype.parsePointer = function (pointer) {
        PathBuilder.pathPattern.lastIndex = 0;
        var subPaths = pointer.match(PathBuilder.pointerPattern);
        var components = [new start_path_component_1.default()];
        if (subPaths == null || subPaths.length == 0 || (subPaths.length == 1 && subPaths[0] == '')) {
            return components;
        }
        for (var _i = 0, subPaths_1 = subPaths; _i < subPaths_1.length; _i++) {
            var subPath = subPaths_1[_i];
            components.push(this.parseComponent(subPath));
        }
        return components;
    };
    PathBuilder.prototype.parseComponent = function (string) {
        var wildcardComponent = wildcard_path_component_1.WildcardPathComponent.fromString(string);
        if (wildcardComponent != null) {
            return wildcardComponent;
        }
        if (string == null) {
            throw new SyntaxError('Cannot create a path from null');
        }
        if (string == '') {
            throw new SyntaxError('Cannot create a path from an empty string');
        }
        var sliceComponent = slice_path_component_1.SlicePathComponent.fromString(string);
        if (sliceComponent != null) {
            return sliceComponent;
        }
        return simple_key_path_component_1.SimpleKeyPathComponent.fromString(string);
    };
    //Match a dot but not if preceeded by a backslash
    PathBuilder.pathPattern = /(?:[^\.\\]|\\.)+/g;
    PathBuilder.pointerPattern = /(?:[^\/\\]|\\\/)+/g;
    return PathBuilder;
}());
exports.default = PathBuilder;
