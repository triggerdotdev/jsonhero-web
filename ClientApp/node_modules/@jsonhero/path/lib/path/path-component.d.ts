import QueryResult from './query-result';
interface PathComponent {
    readonly isArray: boolean;
    toString(): string;
    jsonPointer(): string;
    query(objects: QueryResult[]): QueryResult[];
}
export { PathComponent };
