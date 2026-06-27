## 0.19.9 (2022-02-16)

### Bug fixes

Mapping a non-empty selection range now always puts any newly inserted text on the sides of the range outside of the mapped version.

## 0.19.8 (2022-02-15)

### Bug fixes

Fix a bug where facet values with computed inputs could incorrectly retain their old value on reconfiguration.

## 0.19.7 (2022-02-11)

### Bug fixes

Avoid recomputing facets on state reconfiguration if that facet's inputs stayed precisely the same.

Selection ranges created with `EditorSelection.range` will now have an assoc pointing at their anchor, when non-empty.

## 0.19.6 (2021-11-19)

### Bug fixes

Fix a bug that caused facet compare functions to be called with an invalid value in some situations.

Fix a bug that caused dynamic facet values to be incorrectly kept unchanged when reconfiguration changed one of their dependencies.

## 0.19.5 (2021-11-10)

### Bug fixes

Fix a bug that would cause dynamic facet values influenced by a state reconfiguration to not properly recompute.

## 0.19.4 (2021-11-05)

### Bug fixes

When reconfiguring a state, effects from the reconfiguring transaction can now be seen by newly added state fields.

## 0.19.3 (2021-11-03)

### New features

The precedence levels (under `Prec`) now have more generic names, because their 'meaningful' names were entirely inappropriate in many situations.

## 0.19.2 (2021-09-13)

### New features

The editor state now has a `readOnly` property with a matching facet to control its value.

## 0.19.1 (2021-08-15)

### Bug fixes

Fix a bug where `wordAt` never returned a useful result.

## 0.19.0 (2021-08-11)

### Breaking changes

User event strings now work differently—the events emitted by the core packages follow a different system, and hierarchical event tags can be created by separating the words with dots.

### New features

`languageDataAt` now takes an optional `side` argument to specificy which side of the position you're interested in.

It is now possible to add a user event annotation with a direct `userEvent` property on a transaction spec.

Transactions now have an `isUserEvent` method that can be used to check if it is (a subtype of) some user event type.

## 0.18.7 (2021-05-04)

### Bug fixes

Fix an issue where state fields might be initialized with a state that they aren't actually part of during reconfiguration.

## 0.18.6 (2021-04-12)

### New features

The new `EditorState.wordAt` method finds the word at a given position.

## 0.18.5 (2021-04-08)

### Bug fixes

Fix an issue in the compiled output that would break the code when minified with terser.

## 0.18.4 (2021-04-06)

### New features

The new `Transaction.remote` annotation can be used to mark and recognize transactions created by other actors.

## 0.18.3 (2021-03-23)

### New features

The `ChangeDesc` class now has `toJSON` and `fromJSON` methods.

## 0.18.2 (2021-03-14)

### Bug fixes

Fix unintended ES2020 output (the package contains ES6 code again).

## 0.18.1 (2021-03-10)

### New features

The new `Compartment.get` method can be used to get the content of a compartment in a given state.

## 0.18.0 (2021-03-03)

### Breaking changes

`tagExtension` and the `reconfigure` transaction spec property have been replaced with the concept of configuration compartments and reconfiguration effects (see `Compartment`, `StateEffect.reconfigure`, and `StateEffect.appendConfig`).

## 0.17.2 (2021-02-19)

### New features

`EditorSelection.map` and `SelectionRange.map` now take an optional second argument to indicate which direction to map to.

## 0.17.1 (2021-01-06)

### New features

The package now also exports a CommonJS module.

## 0.17.0 (2020-12-29)

### Breaking changes

First numbered release.

