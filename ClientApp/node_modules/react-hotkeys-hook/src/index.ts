import { useIsHotkeyPressed } from './useIsHotkeyPressed';
import { useHotkeys, Options } from './useHotkeys';
import hotkeys from 'hotkeys-js';

const isHotkeyPressed = hotkeys.isPressed;

export { useHotkeys, useIsHotkeyPressed, isHotkeyPressed, Options };