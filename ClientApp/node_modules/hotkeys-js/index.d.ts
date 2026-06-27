export interface HotkeysEvent {
  key: string;
  method: KeyHandler;
  mods: number[];
  scope: string;
  shortcut: string;
}

export interface KeyHandler {
  (keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent): void | boolean;
}

type Options = {
  scope?: string;
  element?: HTMLElement | null;
  keyup?: boolean | null;
  keydown?: boolean | null;
  capture?: boolean
  splitKey?: string;
}

export interface Hotkeys {
  (key: string, method: KeyHandler): void;
  (key: string, scope: string, method: KeyHandler): void;
  (key: string, options: Options, method: KeyHandler): void;

  shift: boolean;
  ctrl: boolean;
  alt: boolean;
  option: boolean;
  control: boolean;
  cmd: boolean;
  command: boolean;

  keyMap: Record<string, number>;
  modifier: Record<string, number>;
  modifierMap: Record<string, number | string>;

  setScope(scopeName: string): void;
  getScope(): string;
  deleteScope(scopeName: string, newScopeName?: string): void;

  noConflict(): Hotkeys;

  trigger(shortcut: string, scope?: string): void;

  unbind(key?: string): void;
  unbind(key: string, scopeName: string): void;
  unbind(key: string, scopeName: string, method: KeyHandler): void;
  unbind(key: string, method: KeyHandler): void;

  isPressed(keyCode: number): boolean;
  isPressed(keyCode: string): boolean;
  getPressedKeyCodes(): number[];

  filter(event: KeyboardEvent): boolean;
}
// https://github.com/eiriklv/react-masonry-component/issues/57
declare var hotkeys: Hotkeys;
export default hotkeys;
