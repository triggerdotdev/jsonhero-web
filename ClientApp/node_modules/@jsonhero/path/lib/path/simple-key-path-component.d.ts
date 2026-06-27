import { PathComponent } from './path-component';
import QueryResult from './query-result';
declare class SimpleKeyPathComponent implements PathComponent {
    readonly keyName: string;
    readonly isArray: boolean;
    constructor(keyName: string);
    static fromString(string: string): SimpleKeyPathComponent;
    toString(): string;
    jsonPointer(): string;
    private static escapeExpressions;
    private static unescapeExpressions;
    query(results: QueryResult[]): QueryResult[];
}
export { SimpleKeyPathComponent };
