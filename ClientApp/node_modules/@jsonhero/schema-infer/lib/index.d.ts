import { InferredSchema } from "./inferredSchema";
import SchemaInferrer from "./SchemaInference";
export declare function inferSchema(value: unknown, inference?: SchemaInferrer): SchemaInferrer;
export declare function restoreSnapshot(snapshot: InferredSchema): SchemaInferrer;
export type { SchemaInferrer };
