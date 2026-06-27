declare type TypeName = "string" | "number" | "integer" | "boolean" | "object" | "array" | "null";
declare type AnnotationSchema = {
    $id?: string;
    $comment?: string;
    default?: any;
    title?: string;
    description?: string;
    examples?: any[];
    deprecated?: boolean;
    readOnly?: boolean;
    writeOnly?: boolean;
};
declare type BaseSchema = AnnotationSchema & {
    $schema?: string;
    $ref?: string;
    $anchor?: string;
    $defs?: {
        [key: string]: Schema;
    };
    type?: TypeName | TypeName[];
    enum?: any[];
    const?: any;
    allOf?: Schema[];
    anyOf?: Schema[];
    oneOf?: Schema[];
    not?: Schema;
    if?: Schema;
    then?: Schema;
    else?: Schema;
};
export declare type Schema = boolean | SchemaDocument | AnySchema;
export declare type SchemaDocument = StringSchema | NumberSchema | IntSchema | ObjectSchema | ArraySchema | BooleanSchema | NullSchema;
export declare type AnySchema = BaseSchema;
export declare type StringFormat = "date-time" | "time" | "date" | "duration" | "email" | "idn-email" | "hostname" | "idn-hostname" | "ipv4" | "ipv6" | "uuid" | "uri" | "uri-reference" | "iri" | "iri-reference" | "uri-template" | "json-pointer" | "relative-json-pointer" | "regex";
declare type MimeType = "application/json" | "application/xml" | "text/xml" | "text/html" | "text/plain" | "application/octet-stream" | "text/css" | "text/csv" | "text/javascript" | "image/jpeg" | "image/png" | "image/gif" | "image/webp" | "image/bmp" | "image/apng" | "image/svg+xml" | "image/avif" | "video/webm" | "video/mp4" | "video/ogg" | "multipart/form-data";
declare type Encoding = "7bit" | "8bit" | "binary" | "quoted-printable" | "base16" | "base32" | "base64";
export declare type StringSchema = BaseSchema & {
    type: "string";
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    format?: StringFormat;
    contentMediaType?: MimeType;
    contentEncoding?: Encoding;
};
declare type NumericSchema = BaseSchema & {
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number;
    exclusiveMaximum?: number;
    multipleOf?: number;
};
export declare type IntSchema = NumericSchema & {
    type: "integer";
};
export declare type NumberSchema = NumericSchema & {
    type: "number";
};
export declare type PropertiesSchema = {
    properties?: Record<string, Schema>;
    required?: string[];
    patternProperties?: Record<string, Schema>;
    additionalProperties?: Schema;
    unevaluatedProperties?: boolean;
    propertyNames?: {
        pattern: string;
    };
    minProperties?: number;
    maxProperties?: number;
};
export declare type ObjectSchema = BaseSchema & PropertiesSchema & {
    type: "object" | undefined;
    dependentRequired?: Record<string, string[]>;
    dependentSchemas?: Record<string, PropertiesSchema>;
};
export declare type ArraySchema = BaseSchema & {
    type: "array" | undefined;
    items?: Schema;
    prefixItems?: Schema[];
    unevaluatedItems?: Schema;
    minItems?: number;
    maxItems?: number;
    uniqueItems?: boolean;
    contains?: Schema;
    maxContains?: number;
    minContains?: number;
};
export declare type BooleanSchema = BaseSchema & {
    type: "boolean";
};
export declare type NullSchema = BaseSchema & {
    type: "null";
};
export declare const $schema = "https://json-schema.org/draft/2020-12/schema";
export declare class SchemaBuilder<S extends Schema> {
    schema: S;
    constructor(s: S);
    apply(builder: SchemaBuilder<S>): void;
    toSchema(): S;
    toSchemaDocument(): Schema;
}
declare type ObjectOptions = {
    properties?: Array<SchemaBuilder<ObjectSchema>>;
    propertyNames?: string;
    additionalProperties?: SchemaBuilder<Schema>;
    minProperties?: number;
    maxProperties?: number;
    unevaluatedProperties?: boolean;
    defs?: Array<SchemaBuilder<Schema>>;
} & AnnotationSchema;
declare function object(options?: ObjectOptions): SchemaBuilder<ObjectSchema>;
declare function properties(...props: Array<SchemaBuilder<ObjectSchema>>): SchemaBuilder<ObjectSchema>;
declare type RequiredPropertyOptions = {
    dependentSchema?: SchemaBuilder<ObjectSchema>;
};
declare function requiredProperty(name: string, schema: SchemaBuilder<Schema>, options?: RequiredPropertyOptions): SchemaBuilder<ObjectSchema>;
declare type OptionalPropertyOptions = RequiredPropertyOptions & {
    dependsOn?: string[];
};
declare function property(name: string, schema: SchemaBuilder<Schema>, options?: OptionalPropertyOptions): SchemaBuilder<ObjectSchema>;
declare function patternProperty(pattern: string, schema: SchemaBuilder<Schema>): SchemaBuilder<ObjectSchema>;
declare type ArrayOptions = {
    items?: SchemaBuilder<Schema> | boolean;
    prefixItems?: Array<SchemaBuilder<Schema>>;
    unevaluatedItems?: SchemaBuilder<Schema> | boolean;
    minItems?: number;
    maxItems?: number;
    uniqueItems?: boolean;
    contains?: {
        schema: SchemaBuilder<Schema>;
        max?: number;
        min?: number;
    };
    defs?: Array<SchemaBuilder<Schema>>;
} & AnnotationSchema;
declare function array(options?: ArrayOptions): SchemaBuilder<ArraySchema>;
declare function string(options?: Omit<StringSchema, "type">): SchemaBuilder<StringSchema>;
declare function integer(options?: Omit<IntSchema, "type">): SchemaBuilder<IntSchema>;
declare function number(options?: Omit<NumberSchema, "type">): SchemaBuilder<NumberSchema>;
declare function nil(options?: Omit<NullSchema, "type">): SchemaBuilder<NullSchema>;
declare function boolean(options?: Omit<BooleanSchema, "type">): SchemaBuilder<BooleanSchema>;
declare function nullable(schema: SchemaBuilder<Schema>): SchemaBuilder<Schema>;
declare function anyOf(...schemas: SchemaBuilder<Schema>[]): SchemaBuilder<Schema>;
declare function allOf(...schemas: SchemaBuilder<Schema>[]): SchemaBuilder<Schema>;
declare function oneOf(...schemas: SchemaBuilder<Schema>[]): SchemaBuilder<Schema>;
declare function not(schema: SchemaBuilder<Schema>): SchemaBuilder<Schema>;
declare function concat(...schemas: SchemaBuilder<Schema>[]): SchemaBuilder<Schema>;
declare function ifThenElse(condition: SchemaBuilder<Schema>, then: SchemaBuilder<Schema>, thenElse: SchemaBuilder<Schema>): SchemaBuilder<Schema>;
declare function ifThen(condition: SchemaBuilder<Schema>, then: SchemaBuilder<Schema>): SchemaBuilder<Schema>;
declare function def(name: string, schema: SchemaBuilder<Schema>): SchemaBuilder<Schema>;
declare function ref(def: string): SchemaBuilder<Schema>;
declare function constant(value: any): SchemaBuilder<Schema>;
declare function enumerator(...values: any[]): SchemaBuilder<Schema>;
declare function $false(): SchemaBuilder<Schema>;
declare function $true(): SchemaBuilder<Schema>;
export declare const s: {
    object: typeof object;
    properties: typeof properties;
    requiredProperty: typeof requiredProperty;
    property: typeof property;
    patternProperty: typeof patternProperty;
    array: typeof array;
    string: typeof string;
    integer: typeof integer;
    number: typeof number;
    nil: typeof nil;
    boolean: typeof boolean;
    nullable: typeof nullable;
    anyOf: typeof anyOf;
    allOf: typeof allOf;
    oneOf: typeof oneOf;
    not: typeof not;
    concat: typeof concat;
    ifThenElse: typeof ifThenElse;
    ifThen: typeof ifThen;
    def: typeof def;
    ref: typeof ref;
    constant: typeof constant;
    enumerator: typeof enumerator;
    $false: typeof $false;
    $true: typeof $true;
};
export {};
