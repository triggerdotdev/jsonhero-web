import { A11yStatusMessageOptions } from '../../types';
import { GetItemIndexByCharacterKeyOptions } from './types';
export declare function getItemIndexByCharacterKey<Item>({ keysSoFar, highlightedIndex, items, itemToString, getItemNodeFromIndex, }: GetItemIndexByCharacterKeyOptions<Item>): number;
/**
 * Default implementation for status message. Only added when menu is open.
 * Will specift if there are results in the list, and if so, how many,
 * and what keys are relevant.
 *
 * @param {Object} param the downshift state and other relevant properties
 * @return {String} the a11y status message
 */
declare function getA11yStatusMessage<Item>({ isOpen, resultCount, previousResultCount, }: A11yStatusMessageOptions<Item>): string;
export declare const defaultProps: {
    getA11yStatusMessage: typeof getA11yStatusMessage;
    itemToString: (item: any) => string;
    stateReducer: (s: Object, a: Object) => Object;
    getA11ySelectionMessage: (selectionParameters: Object) => string;
    scrollIntoView: typeof import("../../utils").scrollIntoView;
    circularNavigation: boolean;
    environment: {};
};
export declare let validatePropTypes: (options: unknown, caller: Function) => void;
export {};
