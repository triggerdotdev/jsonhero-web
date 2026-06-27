interface GlobalDebugInfo {
  __debug__?: boolean;
}

export const DEBUG = !!(globalThis as GlobalDebugInfo).__debug__;
