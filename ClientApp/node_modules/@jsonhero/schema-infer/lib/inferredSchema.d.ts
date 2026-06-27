import { JSONStringFormat } from "@jsonhero/json-infer-types";
declare type NumberRange = {
    min: number;
    max: number;
};
declare type InferredUnknown = {
    type: "unknown";
};
declare type InferredAny = {
    type: "any";
    schemas: Set<InferredSchema>;
};
declare type InferredBoolean = {
    type: "boolean";
};
declare type InferredInt = {
    type: "int";
    range: NumberRange;
};
declare type InferredFloat = {
    type: "float";
    range: NumberRange;
};
declare type InferredString = {
    type: "string";
    format?: JSONStringFormat;
};
declare type InferredArray = {
    type: "array";
    items: InferredSchema;
};
declare type InferredObject = {
    type: "object";
    properties: {
        required: Record<string, InferredSchema>;
        optional: Record<string, InferredSchema>;
    };
};
declare type InferredNullable = {
    type: "nullable";
    schema: InferredSchema;
};
export declare type InferredSchema = InferredUnknown | InferredAny | InferredBoolean | InferredInt | InferredFloat | InferredString | InferredArray | InferredObject | InferredNullable;
export declare function inferRange(value: number, range?: NumberRange): NumberRange;
export {};
