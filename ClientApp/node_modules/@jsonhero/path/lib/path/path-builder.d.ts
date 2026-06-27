import { PathComponent } from './path-component';
declare class PathBuilder {
    private static readonly pathPattern;
    private static readonly pointerPattern;
    parse(path: string): PathComponent[];
    parsePointer(pointer: string): PathComponent[];
    parseComponent(string: string): PathComponent;
}
export default PathBuilder;
