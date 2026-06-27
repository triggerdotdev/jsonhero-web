## 0.19.8 (2022-03-27)

### New features

Highlight styles can now set a `themeType` option to make them only apply to dark or light themed editors.

## 0.19.7 (2022-01-03)

### Bug fixes

Make `classHighlightStyle` emit classes for `tag.className` and `tags.definition(tags.propertyName)`. Follow precedence level rename

### New features

Add a new highlighting tag `moduleKeyword`.

## 0.19.6 (2021-09-23)

### New features

Add two additional tags, `attributeName` and `attributeValue`, to make it easier to style XML/HTML languages in a specific way.

## 0.19.5 (2021-09-16)

### New features

`highlightTree` now takes `from` and `to` arguments to allow highlighting only a part of the tree.

## 0.19.4 (2021-09-03)

### Bug fixes

Fix a regression in 0.19.3 in highlighting over overlay trees.

## 0.19.3 (2021-09-03)

### Bug fixes

Fix a crash in the highlighter when there were multiple visible ranges in the view and the gaps between them overlap with a tree overlay.

## 0.19.2 (2021-08-19)

### Bug fixes

Fix a bug where old highlighting could stick around when switching language parser configuration.

## 0.19.1 (2021-08-11)

### Bug fixes

Fix incorrect versions for @lezer dependencies.

## 0.19.0 (2021-08-11)

### Breaking changes

Update dependencies to 0.19.0

## 0.18.4 (2021-05-18)

### New features

Add a `strikethrough` style tag to `tags`.

## 0.18.3 (2021-03-04)

### New features

The `HighlightStyle.get` function can now be used to find the classes that the active highlighters assign to a given style tag.

## 0.18.1 (2021-03-04)

### Bug fixes

Fix a regression where the highlighter would walk the entire tree, not just the viewport, making editing of large documents slow.

## 0.18.0 (2021-03-03)

### Breaking changes

When multiple highlight styles are available in an editor, they will be combined, instead of the highest-precedence one overriding the others.

`HighlightStyle.define` now expects an array, not a variable list of arguments.

### New features

Highlight styles now have a `fallback` property that installs them as a fallback highlighter, which only takes effect if no other style is available.

It is now possible to map style tags to static class names in `HighlightStyle` definitions with the `class` property.

The new `classHighlightStyle` assigns a set of static classes to highlight tags, for use with external CSS.

Highlight styles can now be scoped per language.

## 0.17.3 (2021-02-25)

### New features

There is now a separate style tag for (XML-style) tag names (still a subtag of `typeName`).

## 0.17.2 (2021-01-28)

### Bug fixes

Fix an issue where the highlighter wouldn't re-highlight the code when the highlight style configuration changed.

## 0.17.1 (2021-01-06)

### New features

The package now also exports a CommonJS module.

## 0.17.0 (2020-12-29)

### Breaking changes

First numbered release.

