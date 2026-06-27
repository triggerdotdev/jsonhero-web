/**
 * Accepts a parameter and returns it if it's a function
 * or a noop function if it's not. This allows us to
 * accept a callback, but not worry about it if it's not
 * passed.
 * @param {Function} cb the callback
 * @return {Function} a function
 */
export function cbToCb(cb: Function): Function;
/**
 * This is intended to be used to compose event handlers.
 * They are executed in order until one of them sets
 * `event.preventDownshiftDefault = true`.
 * @param {...Function} fns the event handler functions
 * @return {Function} the event handler to add to an element
 */
export function callAllEventHandlers(...fns: Function[]): Function;
export function handleRefs(...refs: any[]): (node: any) => void;
/**
 * Simple debounce implementation. Will call the given
 * function once after the time given has passed since
 * it was last called.
 * @param {Function} fn the function to call after the time
 * @param {Number} time the time to wait
 * @return {Function} the debounced function
 */
export function debounce(fn: Function, time: number): Function;
/**
 * Scroll node into view if necessary
 * @param {HTMLElement} node the element that should scroll into view
 * @param {HTMLElement} menuNode the menu element of the component
 */
export function scrollIntoView(node: HTMLElement, menuNode: HTMLElement): void;
/**
 * This generates a unique ID for an instance of Downshift
 * @return {String} the unique ID
 */
export function generateId(): string;
/**
 * Default implementation for status message. Only added when menu is open.
 * Will specify if there are results in the list, and if so, how many,
 * and what keys are relevant.
 *
 * @param {Object} param the downshift state and other relevant properties
 * @return {String} the a11y status message
 */
export function getA11yStatusMessage({ isOpen, resultCount, previousResultCount }: Object): string;
/**
 * Takes an argument and if it's an array, returns the first item in the array
 * otherwise returns the argument
 * @param {*} arg the maybe-array
 * @param {*} defaultValue the value if arg is falsey not defined
 * @return {*} the arg or it's first item
 */
export function unwrapArray(arg: any, defaultValue: any): any;
/**
 * @param {Object} element (P)react element
 * @return {Boolean} whether it's a DOM element
 */
export function isDOMElement(element: Object): boolean;
/**
 * @param {Object} element (P)react element
 * @return {Object} the props
 */
export function getElementProps(element: Object): Object;
export function noop(): void;
/**
 * Throws a helpful error message for required properties. Useful
 * to be used as a default in destructuring or object params.
 * @param {String} fnName the function name
 * @param {String} propName the prop name
 */
export function requiredProp(fnName: string, propName: string): void;
/**
 * This is only used in tests
 * @param {Number} num the number to set the idCounter to
 */
export function setIdCounter(num: number): void;
/**
 * Resets idCounter to 0. Used for SSR.
 */
export function resetIdCounter(): void;
/**
 * @param {Object} state the state object
 * @return {Object} state that is relevant to downshift
 */
export function pickState(state?: Object): Object;
/**
 * Simple check if the value passed is object literal
 * @param {*} obj any things
 * @return {Boolean} whether it's object literal
 */
export function isPlainObject(obj: any): boolean;
/**
 * Normalizes the 'key' property of a KeyboardEvent in IE/Edge
 * @param {Object} event a keyboardEvent object
 * @return {String} keyboard key
 */
export function normalizeArrowKey(event: Object): string;
/**
 * Returns the new index in the list, in a circular way. If next value is out of bonds from the total,
 * it will wrap to either 0 or itemCount - 1.
 *
 * @param {number} moveAmount Number of positions to move. Negative to move backwards, positive forwards.
 * @param {number} baseIndex The initial position to move from.
 * @param {number} itemCount The total number of items.
 * @param {Function} getItemNodeFromIndex Used to check if item is disabled.
 * @param {boolean} circular Specify if navigation is circular. Default is true.
 * @returns {number} The new index after the move.
 */
export function getNextWrappingIndex(moveAmount: number, baseIndex: number, itemCount: number, getItemNodeFromIndex: Function, circular?: boolean): number;
/**
 * Returns the next index in the list of an item that is not disabled.
 *
 * @param {number} moveAmount Number of positions to move. Negative to move backwards, positive forwards.
 * @param {number} baseIndex The initial position to move from.
 * @param {number} itemCount The total number of items.
 * @param {Function} getItemNodeFromIndex Used to check if item is disabled.
 * @param {boolean} circular Specify if navigation is circular. Default is true.
 * @returns {number} The new index. Returns baseIndex if item is not disabled. Returns next non-disabled item otherwise. If no non-disabled found it will return -1.
 */
export function getNextNonDisabledIndex(moveAmount: number, baseIndex: number, itemCount: number, getItemNodeFromIndex: Function, circular: boolean): number;
/**
 * Checks if event target is within the downshift elements.
 *
 * @param {EventTarget} target Target to check.
 * @param {HTMLElement[]} downshiftElements The elements that form downshift (list, toggle button etc).
 * @param {Window} environment The window context where downshift renders.
 * @param {boolean} checkActiveElement Whether to also check activeElement.
 *
 * @returns {boolean} Whether or not the target is within downshift elements.
 */
export function targetWithinDownshift(target: EventTarget, downshiftElements: HTMLElement[], environment: Window, checkActiveElement?: boolean): boolean;
/**
 * This will perform a shallow merge of the given state object
 * with the state coming from props
 * (for the controlled component scenario)
 * This is used in state updater functions so they're referencing
 * the right state regardless of where it comes from.
 *
 * @param {Object} state The state of the component/hook.
 * @param {Object} props The props that may contain controlled values.
 * @returns {Object} The merged controlled state.
 */
export function getState(state: Object, props: Object): Object;
/**
 * This determines whether a prop is a "controlled prop" meaning it is
 * state which is controlled by the outside of this component rather
 * than within this component.
 *
 * @param {Object} props The props that may contain controlled values.
 * @param {String} key the key to check
 * @return {Boolean} whether it is a controlled controlled prop
 */
export function isControlledProp(props: Object, key: string): boolean;
export function validateControlledUnchanged(): void;
