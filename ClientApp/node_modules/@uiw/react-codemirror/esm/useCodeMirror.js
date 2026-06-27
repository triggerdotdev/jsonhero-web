import { useEffect, useLayoutEffect, useState } from 'react';
import { Annotation, EditorState, StateEffect } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { getDefaultExtensions } from "./getDefaultExtensions.js";
import { getStatistics } from "./utils.js";
import { TimeoutLatch, getScheduler } from "./timeoutLatch.js";
export var ExternalChange = Annotation.define();
var TYPING_TIMOUT = 200; // ms

var emptyExtensions = [];
export function useCodeMirror(props) {
  var value = props.value,
    selection = props.selection,
    onChange = props.onChange,
    onStatistics = props.onStatistics,
    onCreateEditor = props.onCreateEditor,
    onUpdate = props.onUpdate,
    _props$extensions = props.extensions,
    extensions = _props$extensions === void 0 ? emptyExtensions : _props$extensions,
    autoFocus = props.autoFocus,
    _props$theme = props.theme,
    theme = _props$theme === void 0 ? 'light' : _props$theme,
    _props$height = props.height,
    height = _props$height === void 0 ? null : _props$height,
    _props$minHeight = props.minHeight,
    minHeight = _props$minHeight === void 0 ? null : _props$minHeight,
    _props$maxHeight = props.maxHeight,
    maxHeight = _props$maxHeight === void 0 ? null : _props$maxHeight,
    _props$width = props.width,
    width = _props$width === void 0 ? null : _props$width,
    _props$minWidth = props.minWidth,
    minWidth = _props$minWidth === void 0 ? null : _props$minWidth,
    _props$maxWidth = props.maxWidth,
    maxWidth = _props$maxWidth === void 0 ? null : _props$maxWidth,
    _props$placeholder = props.placeholder,
    placeholderStr = _props$placeholder === void 0 ? '' : _props$placeholder,
    _props$editable = props.editable,
    editable = _props$editable === void 0 ? true : _props$editable,
    _props$readOnly = props.readOnly,
    readOnly = _props$readOnly === void 0 ? false : _props$readOnly,
    _props$indentWithTab = props.indentWithTab,
    defaultIndentWithTab = _props$indentWithTab === void 0 ? true : _props$indentWithTab,
    _props$basicSetup = props.basicSetup,
    defaultBasicSetup = _props$basicSetup === void 0 ? true : _props$basicSetup,
    root = props.root,
    initialState = props.initialState;
  var _useState = useState(),
    container = _useState[0],
    setContainer = _useState[1];
  var _useState2 = useState(),
    view = _useState2[0],
    setView = _useState2[1];
  var _useState3 = useState(),
    state = _useState3[0],
    setState = _useState3[1];
  var typingLatch = useState(() => ({
    current: null
  }))[0];
  var pendingUpdate = useState(() => ({
    current: null
  }))[0];
  var defaultThemeOption = EditorView.theme({
    '&': {
      height,
      minHeight,
      maxHeight,
      width,
      minWidth,
      maxWidth
    },
    '& .cm-scroller': {
      height: '100% !important'
    }
  });
  var updateListener = EditorView.updateListener.of(vu => {
    if (vu.docChanged && typeof onChange === 'function' &&
    // Fix echoing of the remote changes:
    // If transaction is market as remote we don't have to call `onChange` handler again
    !vu.transactions.some(tr => tr.annotation(ExternalChange))) {
      if (typingLatch.current) {
        typingLatch.current.reset();
      } else {
        typingLatch.current = new TimeoutLatch(() => {
          if (pendingUpdate.current) {
            var forceUpdate = pendingUpdate.current;
            pendingUpdate.current = null;
            forceUpdate();
          }
          typingLatch.current = null;
        }, TYPING_TIMOUT);
        getScheduler().add(typingLatch.current);
      }
      var doc = vu.state.doc;
      var _value = doc.toString();
      onChange(_value, vu);
    }
    onStatistics && onStatistics(getStatistics(vu));
  });
  var defaultExtensions = getDefaultExtensions({
    theme,
    editable,
    readOnly,
    placeholder: placeholderStr,
    indentWithTab: defaultIndentWithTab,
    basicSetup: defaultBasicSetup
  });
  var getExtensions = [updateListener, defaultThemeOption, ...defaultExtensions];
  if (onUpdate && typeof onUpdate === 'function') {
    getExtensions.push(EditorView.updateListener.of(onUpdate));
  }
  getExtensions = getExtensions.concat(extensions);
  useLayoutEffect(() => {
    if (container && !state) {
      var config = {
        doc: value,
        selection,
        extensions: getExtensions
      };
      var stateCurrent = initialState ? EditorState.fromJSON(initialState.json, config, initialState.fields) : EditorState.create(config);
      setState(stateCurrent);
      if (!view) {
        var viewCurrent = new EditorView({
          state: stateCurrent,
          parent: container,
          root
        });
        setView(viewCurrent);
        onCreateEditor && onCreateEditor(viewCurrent, stateCurrent);
      }
    }
    return () => {
      if (view) {
        setState(undefined);
        setView(undefined);
      }
    };
  }, [container, state]);
  useEffect(() => {
    if (props.container) {
      setContainer(props.container);
    }
  }, [props.container]);
  useEffect(() => () => {
    if (view) {
      view.destroy();
      setView(undefined);
    }
    if (typingLatch.current) {
      typingLatch.current.cancel();
      typingLatch.current = null;
    }
  }, [view]);
  useEffect(() => {
    if (autoFocus && view) {
      view.focus();
    }
  }, [autoFocus, view]);
  useEffect(() => {
    if (view) {
      view.dispatch({
        effects: StateEffect.reconfigure.of(getExtensions)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, extensions, height, minHeight, maxHeight, width, minWidth, maxWidth, placeholderStr, editable, readOnly, defaultIndentWithTab, defaultBasicSetup, onChange, onUpdate]);
  useEffect(() => {
    if (value === undefined) {
      return;
    }
    var currentValue = view ? view.state.doc.toString() : '';
    if (view && value !== currentValue) {
      var isTyping = typingLatch.current && !typingLatch.current.isDone;
      var forceUpdate = () => {
        if (view && value !== view.state.doc.toString()) {
          view.dispatch({
            changes: {
              from: 0,
              to: view.state.doc.toString().length,
              insert: value || ''
            },
            annotations: [ExternalChange.of(true)]
          });
        }
      };
      if (!isTyping) {
        forceUpdate();
      } else {
        pendingUpdate.current = forceUpdate;
      }
    }
  }, [value, view]);
  return {
    state,
    setState,
    view,
    setView,
    container,
    setContainer
  };
}