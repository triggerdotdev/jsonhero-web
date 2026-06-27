# @codemirror/commands [![NPM version](https://img.shields.io/npm/v/@codemirror/commands.svg)](https://www.npmjs.org/package/@codemirror/commands)

[ [**WEBSITE**](https://codemirror.net/) | [**DOCS**](https://codemirror.net/docs/ref/#commands) | [**ISSUES**](https://code.haverbeke.berlin/codemirror/dev/issues) | [**FORUM**](https://discuss.codemirror.net/) | [**CHANGELOG**](https://code.haverbeke.berlin/codemirror/commands/src/branch/main/CHANGELOG.md) ]

This package implements a collection of editing commands for the
[CodeMirror](https://codemirror.net/) code editor.

The [project page](https://codemirror.net/) has more information, a
number of [examples](https://codemirror.net/examples/) and the
[documentation](https://codemirror.net/docs/).

This code is released under an
[MIT license](https://code.haverbeke.berlin/codemirror/commands/tree/main/LICENSE).

We aim to be an inclusive, welcoming community. To make that explicit,
we have a [code of
conduct](http://contributor-covenant.org/version/1/1/0/) that applies
to communication around the project.

## Usage

```javascript
import {EditorView, keymap} from "@codemirror/view"
import {standardKeymap, selectLine} from "@codemirror/commands"

const view = new EditorView({
  parent: document.body,
  extensions: [
    keymap.of([
      ...standardKeymap,
      {key: "Alt-l", mac: "Ctrl-l", run: selectLine}
    ])
  ]
})
```