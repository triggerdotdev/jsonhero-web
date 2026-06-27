import { PathComponent } from './path-component';
import QueryResult from './query-result';
declare class StartPathComponent implements PathComponent {
    readonly keyName = "$";
    readonly isArray: boolean;
    static fromString(string: string): StartPathComponent | null;
    toString(): string;
    jsonPointer(): string;
    query(objects: QueryResult[]): QueryResult[];
}
export default StartPathComponent;
