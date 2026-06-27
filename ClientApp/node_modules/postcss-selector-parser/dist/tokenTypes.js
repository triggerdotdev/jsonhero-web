"use strict";

exports.__esModule = true;
exports.word = exports.tilde = exports.tab = exports.str = exports.space = exports.slash = exports.singleQuote = exports.semicolon = exports.plus = exports.pipe = exports.openSquare = exports.openParenthesis = exports.newline = exports.greaterThan = exports.feed = exports.equals = exports.doubleQuote = exports.dollar = exports.cr = exports.comment = exports.comma = exports.combinator = exports.colon = exports.closeSquare = exports.closeParenthesis = exports.caret = exports.bang = exports.backslash = exports.at = exports.asterisk = exports.ampersand = void 0;
var ampersand = exports.ampersand = 38; // `&`.charCodeAt(0);
var asterisk = exports.asterisk = 42; // `*`.charCodeAt(0);
var at = exports.at = 64; // `@`.charCodeAt(0);
var comma = exports.comma = 44; // `,`.charCodeAt(0);
var colon = exports.colon = 58; // `:`.charCodeAt(0);
var semicolon = exports.semicolon = 59; // `;`.charCodeAt(0);
var openParenthesis = exports.openParenthesis = 40; // `(`.charCodeAt(0);
var closeParenthesis = exports.closeParenthesis = 41; // `)`.charCodeAt(0);
var openSquare = exports.openSquare = 91; // `[`.charCodeAt(0);
var closeSquare = exports.closeSquare = 93; // `]`.charCodeAt(0);
var dollar = exports.dollar = 36; // `$`.charCodeAt(0);
var tilde = exports.tilde = 126; // `~`.charCodeAt(0);
var caret = exports.caret = 94; // `^`.charCodeAt(0);
var plus = exports.plus = 43; // `+`.charCodeAt(0);
var equals = exports.equals = 61; // `=`.charCodeAt(0);
var pipe = exports.pipe = 124; // `|`.charCodeAt(0);
var greaterThan = exports.greaterThan = 62; // `>`.charCodeAt(0);
var space = exports.space = 32; // ` `.charCodeAt(0);
var singleQuote = exports.singleQuote = 39; // `'`.charCodeAt(0);
var doubleQuote = exports.doubleQuote = 34; // `"`.charCodeAt(0);
var slash = exports.slash = 47; // `/`.charCodeAt(0);
var bang = exports.bang = 33; // `!`.charCodeAt(0);

var backslash = exports.backslash = 92; // '\\'.charCodeAt(0);
var cr = exports.cr = 13; // '\r'.charCodeAt(0);
var feed = exports.feed = 12; // '\f'.charCodeAt(0);
var newline = exports.newline = 10; // '\n'.charCodeAt(0);
var tab = exports.tab = 9; // '\t'.charCodeAt(0);

// Expose aliases primarily for readability.
var str = exports.str = singleQuote;

// No good single character representation!
var comment = exports.comment = -1;
var word = exports.word = -2;
var combinator = exports.combinator = -3;