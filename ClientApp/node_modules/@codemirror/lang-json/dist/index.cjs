'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var json$1 = require('@lezer/json');
var language = require('@codemirror/language');
var highlight = require('@codemirror/highlight');

/**
Calls
[`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
on the document and, if that throws an error, reports it as a
single diagnostic.
*/
const jsonParseLinter = () => (view) => {
    try {
        JSON.parse(view.state.doc.toString());
    }
    catch (e) {
        if (!(e instanceof SyntaxError))
            throw e;
        const pos = getErrorPosition(e, view.state.doc);
        return [{
                from: pos,
                message: e.message,
                severity: 'error',
                to: pos
            }];
    }
    return [];
};
function getErrorPosition(error, doc) {
    let m;
    if (m = error.message.match(/at position (\d+)/))
        return Math.min(+m[1], doc.length);
    if (m = error.message.match(/at line (\d+) column (\d+)/))
        return Math.min(doc.line(+m[1]).from + (+m[2]) - 1, doc.length);
    return 0;
}

/**
A language provider that provides JSON parsing.
*/
const jsonLanguage = language.LRLanguage.define({
    parser: json$1.parser.configure({
        props: [
            language.indentNodeProp.add({
                Object: language.continuedIndent({ except: /^\s*\}/ }),
                Array: language.continuedIndent({ except: /^\s*\]/ })
            }),
            language.foldNodeProp.add({
                "Object Array": language.foldInside
            }),
            highlight.styleTags({
                String: highlight.tags.string,
                Number: highlight.tags.number,
                "True False": highlight.tags.bool,
                PropertyName: highlight.tags.propertyName,
                Null: highlight.tags.null,
                ",": highlight.tags.separator,
                "[ ]": highlight.tags.squareBracket,
                "{ }": highlight.tags.brace
            })
        ]
    }),
    languageData: {
        closeBrackets: { brackets: ["[", "{", '"'] },
        indentOnInput: /^\s*[\}\]]$/
    }
});
/**
JSON language support.
*/
function json() {
    return new language.LanguageSupport(jsonLanguage);
}

exports.json = json;
exports.jsonLanguage = jsonLanguage;
exports.jsonParseLinter = jsonParseLinter;
