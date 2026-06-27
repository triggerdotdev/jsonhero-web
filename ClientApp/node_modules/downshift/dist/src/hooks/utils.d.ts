export let useControlPropsValidator: typeof noop;
export function useScrollIntoView({ highlightedIndex, isOpen, itemRefs, getItemNodeFromIndex, menuElement, scrollIntoView, }: {
    highlightedIndex: any;
    isOpen: any;
    itemRefs: any;
    getItemNodeFromIndex: any;
    menuElement: any;
    scrollIntoView: any;
}): import("react").MutableRefObject<boolean>;
export function useA11yMessageSetter(getA11yMessage: any, dependencyArray: any, { isInitialMount, highlightedIndex, items, environment, ...rest }: {
    [x: string]: any;
    isInitialMount: any;
    highlightedIndex: any;
    items: any;
    environment: any;
}): void;
export function useGetterPropsCalledChecker(): typeof noop;
/**
 * Reuse the movement tracking of mouse and touch events.
 *
 * @param {boolean} isOpen Whether the dropdown is open or not.
 * @param {Array<Object>} downshiftElementRefs Downshift element refs to track movement (toggleButton, menu etc.)
 * @param {Object} environment Environment where component/hook exists.
 * @param {Function} handleBlur Handler on blur from mouse or touch.
 * @returns {Object} Ref containing whether mouseDown or touchMove event is happening
 */
export function useMouseAndTouchTracker(isOpen: boolean, downshiftElementRefs: Array<Object>, environment: Object, handleBlur: Function): Object;
export function getHighlightedIndexOnOpen(props: any, state: any, offset: any, getItemNodeFromIndex: any): any;
export function getInitialState(props: any): {
    highlightedIndex: any;
    isOpen: any;
    selectedItem: any;
    inputValue: any;
};
export function getInitialValue(props: any, propKey: any, defaultStateValues?: {
    highlightedIndex: number;
    isOpen: boolean;
    selectedItem: null;
    inputValue: string;
}): any;
export function getDefaultValue(props: any, propKey: any, defaultStateValues?: {
    highlightedIndex: number;
    isOpen: boolean;
    selectedItem: null;
    inputValue: string;
}): any;
export namespace defaultProps {
    export { itemToString };
    export { stateReducer };
    export { getA11ySelectionMessage };
    export { scrollIntoView };
    export const circularNavigation: boolean;
    export const environment: {};
}
/**
 * Wraps the useEnhancedReducer and applies the controlled prop values before
 * returning the new state.
 *
 * @param {Function} reducer Reducer function from downshift.
 * @param {Object} initialState Initial state of the hook.
 * @param {Object} props The hook props.
 * @returns {Array} An array with the state and an action dispatcher.
 */
export function useControlledReducer(reducer: Function, initialState: Object, props: Object): any[];
/**
 * Computes the controlled state using a the previous state, props,
 * two reducers, one from downshift and an optional one from the user.
 * Also calls the onChange handlers for state values that have changed.
 *
 * @param {Function} reducer Reducer function from downshift.
 * @param {Object} initialState Initial state of the hook.
 * @param {Object} props The hook props.
 * @returns {Array} An array with the state and an action dispatcher.
 */
export function useEnhancedReducer(reducer: Function, initialState: Object, props: Object): any[];
export function useLatestRef(val: any): import("react").MutableRefObject<any>;
export function capitalizeString(string: any): string;
export function isAcceptedCharacterKey(key: any): boolean;
export function getItemIndex(index: any, item: any, items: any): any;
export function useElementIds({ id, labelId, menuId, getItemId, toggleButtonId, inputId, }: {
    id?: string | undefined;
    labelId: any;
    menuId: any;
    getItemId: any;
    toggleButtonId: any;
    inputId: any;
}): {
    labelId: any;
    menuId: any;
    getItemId: any;
    toggleButtonId: any;
    inputId: any;
};
import { noop } from "../utils";
declare function itemToString(item: any): string;
/**
 * Default state reducer that returns the changes.
 *
 * @param {Object} s state.
 * @param {Object} a action with changes.
 * @returns {Object} changes.
 */
declare function stateReducer(s: Object, a: Object): Object;
/**
 * Returns a message to be added to aria-live region when item is selected.
 *
 * @param {Object} selectionParameters Parameters required to build the message.
 * @returns {string} The a11y message.
 */
declare function getA11ySelectionMessage(selectionParameters: Object): string;
import { scrollIntoView } from "../utils";
export {};
