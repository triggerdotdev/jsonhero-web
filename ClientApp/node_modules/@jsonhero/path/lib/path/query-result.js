"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryResult = /** @class */ (function () {
    function QueryResult(depth, path, object) {
        this.depth = 0;
        this.depth = depth;
        this.path = path;
        this.object = object;
    }
    QueryResult.prototype.flatten = function () {
        var flattenedObject = this.object;
        if (typeof this.object === 'object' && Array.isArray(this.object) && this.depth > 0) {
            flattenedObject = this.object.flat(this.depth);
        }
        return new QueryResult(0, this.path, flattenedObject);
    };
    return QueryResult;
}());
exports.default = QueryResult;
