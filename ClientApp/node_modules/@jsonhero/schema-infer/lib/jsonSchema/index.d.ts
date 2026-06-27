import { Schema, SchemaBuilder } from "@jsonhero/json-schema-fns";
import { InferredSchema } from "../inferredSchema";
export declare function toJSONSchema(inferredSchema: InferredSchema): SchemaBuilder<Schema>;
