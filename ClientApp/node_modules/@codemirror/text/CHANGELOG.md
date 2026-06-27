## 0.19.6 (2022-01-14)

### New features

`findClusterBreak` now takes an optional `includeExtending` argument that determines whether it skips over extending characters.

## 0.19.5 (2021-10-26)

### Bug fixes

Fix the return type of `iterLines`.

## 0.19.4 (2021-10-01)

### New features

`TextIterator`s are now iterable.

`findColumn` now takes an optional `strict` argument that makes it report -1 for columns outside of the string.

## 0.19.3 (2021-09-04)

### Bug fixes

Fix an issue where a partial text cursor would sometimes not appropriately report it was done.

## 0.19.2 (2021-08-25)

### New features

`Text.children` is now public, and can be used to iterate over the `Text` objects in a tree.

## 0.19.1 (2021-08-23)

### New features

`Text` objects now expose an `iterLines` method to create an iterator over their lines.

## 0.19.0 (2021-08-11)

### Breaking changes

`countColumn` now takes different arguments.

## 0.18.1 (2021-07-06)

### Breaking changes

`findColumn` now takes only three arguments. (The old argument list will be supported until the next breaking version.)

## 0.18.0 (2021-03-03)

### Breaking changes

Update dependencies to 0.18.

## 0.17.2 (2021-01-06)

### New features

The package now also exports a CommonJS module.

## 0.17.1 (2021-01-02)

### Bug fixes

Fix a bug in `Text.replace` where deleting the entire document would produce an invalid instance.

## 0.17.0 (2020-12-29)

### Breaking changes

First numbered release.

