"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreSnapshot = exports.inferSchema = void 0;
const SchemaInference_1 = __importDefault(require("./SchemaInference"));
function inferSchema(value, inference) {
    const schemaInferrer = new SchemaInference_1.default();
    schemaInferrer.infer(value, inference);
    return schemaInferrer;
}
exports.inferSchema = inferSchema;
function restoreSnapshot(snapshot) {
    return new SchemaInference_1.default(snapshot);
}
exports.restoreSnapshot = restoreSnapshot;
