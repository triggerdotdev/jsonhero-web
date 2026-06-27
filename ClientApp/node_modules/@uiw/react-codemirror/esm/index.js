import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["className", "value", "selection", "extensions", "onChange", "onStatistics", "onCreateEditor", "onUpdate", "autoFocus", "theme", "height", "minHeight", "maxHeight", "width", "minWidth", "maxWidth", "basicSetup", "placeholder", "indentWithTab", "editable", "readOnly", "root", "initialState"];
import React, { useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import { useCodeMirror } from "./useCodeMirror.js";
import { jsx as _jsx } from "react/jsx-runtime";
export * from '@codemirror/view';
export * from '@codemirror/state';
export * from '@uiw/codemirror-extensions-basic-setup';
export * from "./useCodeMirror.js";
export * from "./getDefaultExtensions.js";
export * from "./utils.js";
var ReactCodeMirror = /*#__PURE__*/forwardRef((props, ref) => {
  var className = props.className,
    _props$value = props.value,
    value = _props$value === void 0 ? '' : _props$value,
    selection = props.selection,
    _props$extensions = props.extensions,
    extensions = _props$extensions === void 0 ? [] : _props$extensions,
    onChange = props.onChange,
    onStatistics = props.onStatistics,
    onCreateEditor = props.onCreateEditor,
    onUpdate = props.onUpdate,
    autoFocus = props.autoFocus,
    _props$theme = props.theme,
    theme = _props$theme === void 0 ? 'light' : _props$theme,
    height = props.height,
    minHeight = props.minHeight,
    maxHeight = props.maxHeight,
    width = props.width,
    minWidth = props.minWidth,
    maxWidth = props.maxWidth,
    basicSetup = props.basicSetup,
    placeholder = props.placeholder,
    indentWithTab = props.indentWithTab,
    editable = props.editable,
    readOnly = props.readOnly,
    root = props.root,
    initialState = props.initialState,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  var editor = useRef(null);
  var _useCodeMirror = useCodeMirror({
      root,
      value,
      autoFocus,
      theme,
      height,
      minHeight,
      maxHeight,
      width,
      minWidth,
      maxWidth,
      basicSetup,
      placeholder,
      indentWithTab,
      editable,
      readOnly,
      selection,
      onChange,
      onStatistics,
      onCreateEditor,
      onUpdate,
      extensions,
      initialState
    }),
    state = _useCodeMirror.state,
    view = _useCodeMirror.view,
    container = _useCodeMirror.container,
    setContainer = _useCodeMirror.setContainer;
  useImperativeHandle(ref, () => ({
    editor: editor.current,
    state: state,
    view: view
  }), [editor, container, state, view]);
  var setEditorRef = useCallback(el => {
    editor.current = el;
    setContainer(el);
  }, [setContainer]);

  // check type of value
  if (typeof value !== 'string') {
    throw new Error("value must be typeof string but got " + typeof value);
  }
  var defaultClassNames = typeof theme === 'string' ? "cm-theme-" + theme : 'cm-theme';
  return /*#__PURE__*/_jsx("div", _extends({
    ref: setEditorRef,
    className: "" + defaultClassNames + (className ? " " + className : '')
  }, other));
});
ReactCodeMirror.displayName = 'CodeMirror';
export default ReactCodeMirror;