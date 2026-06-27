import hotkeys from 'hotkeys-js';

/**
 * @deprecated Use isHotkeyPressed instead. Will be removed version 4.
 */
export function useIsHotkeyPressed() {
  return hotkeys.isPressed;
}