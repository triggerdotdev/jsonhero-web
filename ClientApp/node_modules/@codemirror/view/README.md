# @codemirror/view [![NPM version](https://img.shields.io/npm/v/@codemirror/view.svg)](https://www.npmjs.org/package/@codemirror/view)

[ [**WEBSITE**](https://codemirror.net/) | [**DOCS**](https://codemirror.net/docs/ref/#view) | [**ISSUES**](https://code.haverbeke.berlin/codemirror/dev/issues) | [**FORUM**](https://discuss.codemirror.net/) | [**CHANGELOG**](https://code.haverbeke.berlin/codemirror/view/src/branch/main/CHANGELOG.md) ]

This package implements the DOM view component for the
[CodeMirror](https://codemirror.net/) code editor.

The [project page](https://codemirror.net/) has more information, a
number of [examples](https://codemirror.net/examples/) and the
[documentation](https://codemirror.net/docs/).

This code is released under an
[MIT license](https://code.haverbeke.berlin/codemirror/view/tree/main/LICENSE).

We aim to be an inclusive, welcoming community. To make that explicit,
we have a [code of
conduct](http://contributor-covenant.org/version/1/1/0/) that applies
to communication around the project.

## Usage

```javascript
import {EditorView} from "@codemirror/view"
import {basicSetup} from "codemirror"

const view = new EditorView({
  parent: document.querySelector("#some-node"),
  doc: "Content text",
  extensions: [basicSetup /* ... */]
})
```

Add additional extensions, such as a [language
mode](https://codemirror.net/#languages), to configure the editor.
Call
[`view.dispatch`](https://codemirror.net/docs/ref/#view.EditorView.dispatch)
to update the editor's state.
