"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_pattern_1 = require("ts-pattern");
const json_infer_types_1 = require("@jsonhero/json-infer-types");
const inferredSchema_1 = require("./inferredSchema");
const jsonSchema_1 = require("./jsonSchema");
const lodash_omit_1 = __importDefault(require("lodash.omit"));
function convertToAnySchema(schema, value) {
    const schemas = new Set([schema]);
    schemas.add(infer({ type: "unknown" }, value));
    return {
        type: "any",
        schemas,
    };
}
function infer(inferredSchema, value) {
    const inferredValueType = (0, json_infer_types_1.inferType)(value);
    const result = (0, ts_pattern_1.match)([
        inferredSchema,
        inferredValueType,
    ])
        .with([ts_pattern_1.__, { name: "null" }], ([subSchema]) => ({
        type: "nullable",
        schema: subSchema,
    }))
        .with([{ type: "nullable" }, ts_pattern_1.__], ([nullable, { value }]) => {
        const subSchema = infer(nullable.schema, value);
        return {
            type: "nullable",
            schema: subSchema,
        };
    })
        .with([{ type: "unknown" }, { name: "bool" }], () => ({ type: "boolean" }))
        .with([{ type: "unknown" }, { name: "int" }], ([, inferredInt]) => ({
        type: "int",
        range: (0, inferredSchema_1.inferRange)(inferredInt.value),
    }))
        .with([{ type: "unknown" }, { name: "float" }], ([, inferredFloat]) => ({
        type: "float",
        range: (0, inferredSchema_1.inferRange)(inferredFloat.value),
    }))
        .with([{ type: "unknown" }, { name: "string" }], ([, { format }]) => ({
        type: "string",
        format: format,
    }))
        .with([{ type: "unknown" }, { name: "array" }], ([, inferredArray]) => {
        let itemInferredSchema = {
            type: "unknown",
        };
        for (const item of inferredArray.value) {
            itemInferredSchema = infer(itemInferredSchema, item);
        }
        return {
            type: "array",
            items: itemInferredSchema,
        };
    })
        .with([{ type: "array" }, { name: "array" }], ([arraySchema, inferredArray]) => {
        let itemInferredSchema = arraySchema.items;
        for (const item of inferredArray.value) {
            itemInferredSchema = infer(itemInferredSchema, item);
        }
        return {
            type: "array",
            items: itemInferredSchema,
        };
    })
        .with([{ type: "array" }, ts_pattern_1.__], ([inferredArray]) => convertToAnySchema(inferredArray, value))
        .with([{ type: "unknown" }, { name: "object" }], ([, inferredType]) => {
        const required = Object.entries(inferredType.value).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: infer({ type: "unknown" }, value),
        }), {});
        return {
            type: "object",
            properties: {
                required,
                optional: {},
            },
        };
    })
        .with([{ type: "object" }, { name: "object" }], ([{ properties }, { value }]) => {
        const { required, optional } = properties;
        const missingRequiredKeys = Object.keys(required).filter((key) => !Object.prototype.hasOwnProperty.call(value, key));
        for (const missingRequiredKey of missingRequiredKeys) {
            optional[missingRequiredKey] = required[missingRequiredKey];
        }
        const nextRequired = (0, lodash_omit_1.default)(required, missingRequiredKeys);
        for (const [k, v] of Object.entries(value)) {
            if (Object.prototype.hasOwnProperty.call(nextRequired, k)) {
                nextRequired[k] = infer(required[k], v);
            }
            else if (Object.prototype.hasOwnProperty.call(optional, k)) {
                optional[k] = infer(optional[k], v);
            }
            else {
                optional[k] = infer({ type: "unknown" }, v);
            }
        }
        return {
            type: "object",
            properties: {
                required: nextRequired,
                optional,
            },
        };
    })
        .with([{ type: "object" }, ts_pattern_1.__], ([inferredObject]) => convertToAnySchema(inferredObject, value))
        .with([{ type: "any" }, ts_pattern_1.__], ([anySchema]) => {
        const schemas = new Set(anySchema.schemas);
        schemas.add(infer({ type: "unknown" }, value));
        return {
            type: "any",
            schemas,
        };
    })
        .with([{ type: "boolean" }, { name: "bool" }], () => ({ type: "boolean" }))
        .with([{ type: "boolean" }, ts_pattern_1.__], ([inferredBool]) => convertToAnySchema(inferredBool, value))
        .with([{ type: "int" }, { name: "int" }], ([intSchema, inferredInt]) => ({
        type: "int",
        range: (0, inferredSchema_1.inferRange)(inferredInt.value, intSchema.range),
    }))
        .with([{ type: "int" }, { name: "float" }], ([intSchema, inferredFloat]) => ({
        type: "float",
        range: (0, inferredSchema_1.inferRange)(inferredFloat.value, intSchema.range),
    }))
        .with([{ type: "int" }, ts_pattern_1.__], ([inferredInt]) => convertToAnySchema(inferredInt, value))
        .with([{ type: "float" }, { name: "float" }], ([floatSchema, inferredFloat]) => ({
        type: "float",
        range: (0, inferredSchema_1.inferRange)(inferredFloat.value, floatSchema.range),
    }))
        .with([{ type: "float" }, { name: "int" }], ([floatSchema, inferredInt]) => ({
        type: "float",
        range: (0, inferredSchema_1.inferRange)(inferredInt.value, floatSchema.range),
    }))
        .with([{ type: "float" }, ts_pattern_1.__], ([inferredFloat]) => convertToAnySchema(inferredFloat, value))
        .with([
        { type: "string", format: ts_pattern_1.__.nullish },
        { name: "string", format: ts_pattern_1.__.nullish },
    ], () => ({ type: "string" }))
        .with([
        { type: "string", format: ts_pattern_1.__.nullish },
        { name: "string", format: { name: ts_pattern_1.__.string } },
    ], () => ({ type: "string" }))
        .with([
        { type: "string", format: { name: ts_pattern_1.__.string } },
        { name: "string", format: ts_pattern_1.__.nullish },
    ], () => ({ type: "string" }))
        .with([
        { type: "string", format: { name: ts_pattern_1.__.string } },
        { name: "string", format: { name: ts_pattern_1.__.string } },
    ], ([{ format: schemaFormat }, { format }]) => {
        if (schemaFormat.name !== format.name) {
            return {
                type: "string",
            };
        }
        return { type: "string", format };
    })
        .with([{ type: "string" }, { name: "string" }], () => ({
        type: "string",
    }))
        .with([{ type: "string" }, ts_pattern_1.__], ([inferredString]) => convertToAnySchema(inferredString, value))
        .exhaustive();
    return result;
}
class SchemaInferrer {
    constructor(snapshot) {
        this.inferredSchema = { type: "unknown" };
        if (snapshot) {
            this.inferredSchema = snapshot;
        }
    }
    infer(value, inference) {
        this.inferredSchema = infer(inference ? inference.inferredSchema : this.inferredSchema, value);
    }
    toJSONSchema(options) {
        if (options?.includeSchema) {
            return (0, jsonSchema_1.toJSONSchema)(this.inferredSchema).toSchemaDocument();
        }
        else {
            return (0, jsonSchema_1.toJSONSchema)(this.inferredSchema).toSchema();
        }
    }
    toSnapshot() {
        return this.inferredSchema;
    }
}
exports.default = SchemaInferrer;
