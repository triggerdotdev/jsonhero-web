import { indentWithTab } from '@codemirror/commands';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorState } from '@codemirror/state';
import { defaultLightThemeOption } from "./theme/light.js";
export * from '@codemirror/theme-one-dark';
export * from "./theme/light.js";
export var getDefaultExtensions = function getDefaultExtensions(optios) {
  if (optios === void 0) {
    optios = {};
  }
  var _optios = optios,
    _optios$indentWithTab = _optios.indentWithTab,
    defaultIndentWithTab = _optios$indentWithTab === void 0 ? true : _optios$indentWithTab,
    _optios$editable = _optios.editable,
    editable = _optios$editable === void 0 ? true : _optios$editable,
    _optios$readOnly = _optios.readOnly,
    readOnly = _optios$readOnly === void 0 ? false : _optios$readOnly,
    _optios$theme = _optios.theme,
    theme = _optios$theme === void 0 ? 'light' : _optios$theme,
    _optios$placeholder = _optios.placeholder,
    placeholderStr = _optios$placeholder === void 0 ? '' : _optios$placeholder,
    _optios$basicSetup = _optios.basicSetup,
    defaultBasicSetup = _optios$basicSetup === void 0 ? true : _optios$basicSetup;
  var getExtensions = [];
  if (defaultIndentWithTab) {
    getExtensions.unshift(keymap.of([indentWithTab]));
  }
  if (defaultBasicSetup) {
    if (typeof defaultBasicSetup === 'boolean') {
      getExtensions.unshift(basicSetup());
    } else {
      getExtensions.unshift(basicSetup(defaultBasicSetup));
    }
  }
  if (placeholderStr) {
    getExtensions.unshift(placeholder(placeholderStr));
  }
  switch (theme) {
    case 'light':
      getExtensions.push(defaultLightThemeOption);
      break;
    case 'dark':
      getExtensions.push(oneDark);
      break;
    case 'none':
      break;
    default:
      getExtensions.push(theme);
      break;
  }
  if (editable === false) {
    getExtensions.push(EditorView.editable.of(false));
  }
  if (readOnly) {
    getExtensions.push(EditorState.readOnly.of(true));
  }
  return [...getExtensions];
};