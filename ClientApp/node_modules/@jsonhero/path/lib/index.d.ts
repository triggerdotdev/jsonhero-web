import { PathComponent } from './path/path-component';
declare class JSONHeroPath {
    readonly components: PathComponent[];
    constructor(components: PathComponent[] | string);
    static fromPointer(pointer: string): JSONHeroPath;
    get root(): JSONHeroPath;
    get isRoot(): boolean;
    get parent(): JSONHeroPath | null;
    get lastComponent(): PathComponent | undefined;
    child(key: string): JSONHeroPath;
    replaceComponent(index: number, newKey: string): JSONHeroPath;
    toString(): string;
    jsonPointer(): string;
    first(object: any, options?: PathOptions): any;
    all(object: any, options?: PathOptions): any[];
    set(object: any, newValue: any): void;
    merge(object: any, mergeValue: any): void;
}
interface PathOptions {
    includePath: boolean;
}
export { JSONHeroPath, PathComponent };
