import { useIsHotkeyPressed } from './useIsHotkeyPressed';
import { useHotkeys, Options } from './useHotkeys';
declare const isHotkeyPressed: {
    (keyCode: number): boolean;
    (keyCode: string): boolean;
};
export { useHotkeys, useIsHotkeyPressed, isHotkeyPressed, Options };
