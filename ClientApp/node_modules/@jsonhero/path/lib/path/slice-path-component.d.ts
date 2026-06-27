import { PathComponent } from './path-component';
import QueryResult from './query-result';
declare class SlicePathComponent implements PathComponent {
    readonly startIndex: number;
    readonly endIndex: number | null;
    readonly isArray: boolean;
    private static regex;
    constructor(startIndex: number, endIndex: number | null);
    static fromString(string: string): SlicePathComponent | null;
    toString(): string;
    jsonPointer(): string;
    query(results: QueryResult[]): QueryResult[];
}
export { SlicePathComponent };
