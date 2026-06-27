<!-- NOTE: README.md is generated from src/README.md -->

# @codemirror/lang-json [![NPM version](https://img.shields.io/npm/v/@codemirror/lang-json.svg)](https://www.npmjs.org/package/@codemirror/lang-json)

[ [**WEBSITE**](https://codemirror.net/6/) | [**ISSUES**](https://github.com/codemirror/codemirror.next/issues) | [**FORUM**](https://discuss.codemirror.net/c/next/) | [**CHANGELOG**](https://github.com/codemirror/lang-json/blob/main/CHANGELOG.md) ]

This package implements JSON language support for the
[CodeMirror](https://codemirror.net/6/) code editor.

The [project page](https://codemirror.net/6/) has more information, a
number of [examples](https://codemirror.net/6/examples/) and the
[documentation](https://codemirror.net/6/docs/).

This code is released under an
[MIT license](https://github.com/codemirror/lang-json/tree/main/LICENSE).

We aim to be an inclusive, welcoming community. To make that explicit,
we have a [code of
conduct](http://contributor-covenant.org/version/1/1/0/) that applies
to communication around the project.

## API Reference
<dl>
<dt id="user-content-json">
  <code><strong><a href="#user-content-json">json</a></strong>() → <a href="https://codemirror.net/6/docs/ref#language.LanguageSupport">LanguageSupport</a></code></dt>

<dd><p>JSON language support.</p>
</dd>
<dt id="user-content-jsonlanguage">
  <code><strong><a href="#user-content-jsonlanguage">jsonLanguage</a></strong>: <a href="https://codemirror.net/6/docs/ref#language.LezerLanguage">LezerLanguage</a></code></dt>

<dd><p>A language provider that provides JSON parsing.</p>
</dd>
<dt id="user-content-jsonparselinter">
  <code><strong><a href="#user-content-jsonparselinter">jsonParseLinter</a></strong>() → fn(<a id="user-content-jsonparselinter^returns^view" href="#user-content-jsonparselinter^returns^view">view</a>: <a href="https://codemirror.net/6/docs/ref#view.EditorView">EditorView</a>) → <a href="https://codemirror.net/6/docs/ref#lint.Diagnostic">Diagnostic</a>[]</code></dt>

<dd><p>Calls
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse"><code>JSON.parse</code></a>
on the document and, if that throws an error, reports it as a
single diagnostic.</p>
</dd>
</dl>

