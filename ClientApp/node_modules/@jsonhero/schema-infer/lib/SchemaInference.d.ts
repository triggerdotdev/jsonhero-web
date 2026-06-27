import { InferredSchema } from "./inferredSchema";
import { Schema } from "@jsonhero/json-schema-fns";
export default class SchemaInferrer {
    inferredSchema: InferredSchema;
    constructor(snapshot?: InferredSchema);
    infer(value: unknown, inference?: SchemaInferrer): void;
    toJSONSchema(options?: {
        includeSchema?: boolean;
    }): Schema;
    toSnapshot(): InferredSchema;
}
