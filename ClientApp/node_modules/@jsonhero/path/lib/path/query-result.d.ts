import { JSONHeroPath } from '../index';
declare class QueryResult {
    readonly depth: number;
    readonly path: JSONHeroPath;
    readonly object: any;
    constructor(depth: number, path: JSONHeroPath, object: any);
    flatten(): QueryResult;
}
export default QueryResult;
