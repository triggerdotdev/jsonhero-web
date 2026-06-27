import { PathComponent } from './path-component';
import QueryResult from './query-result';
declare class WildcardPathComponent implements PathComponent {
    readonly keyName = "*";
    readonly isArray: boolean;
    static fromString(string: string): WildcardPathComponent | null;
    toString(): string;
    jsonPointer(): string;
    query(results: QueryResult[]): QueryResult[];
}
export { WildcardPathComponent };
