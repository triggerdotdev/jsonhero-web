declare module "json-source-map" {
  export interface ParseOptions {
    bigint?: boolean;
  }

  export type PointerProp = "value" | "valueEnd" | "key" | "keyEnd";

  export interface Location {
    line: number;
    column: number;
    pos: number;
  }

  export type Pointers = Record<string, Record<PointerProp, Location>>;

  export interface ParseResult {
    data: any;
    pointers: Pointers;
  }

  export function parse(
    source: string,
    _reviver?: any,
    options?: ParseOptions
  ): ParseResult;

  export interface StringifyOptions {
    space?: string | number;
    es6?: boolean;
  }

  export interface StringifyResult {
    json: string;
    pointers: Pointers;
  }

  export function stringify(
    data: any,
    _replacer?: any,
    options?: string | number | StringifyOptions
  ): StringifyResult;
}
