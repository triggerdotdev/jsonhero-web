## 0.19.9 (2022-03-09)

### Bug fixes

Fix an issue where points that are entirely covered by a point coming before them could be returend by a span iterator when it started directly at the point's position.

## 0.19.8 (2022-02-19)

### Bug fixes

Fix a bug where mapping a changeset through an empty set of changes would produce a new value.

## 0.19.7 (2022-02-15)

### Bug fixes

Fix an issue that caused the `sort` option to `RangeSet.update` to have no effect.

## 0.19.6 (2022-01-05)

### Bug fixes

Fix an issue where range sets that weren't mapped could cause `RangeSet.compare` to miss changes.

Fix a bug where a zero-length range, even when inclusive, was never mapped to cover any content.

## 0.19.5 (2021-12-21)

### New features

`RangeSet.spans` now allows the iterator to have a `filterPoint` method, which can determine which point ranges are ignored.

## 0.19.4 (2021-12-14)

### Bug fixes

Make sure non-empty point ranges at the end of another point range are covered by the bigger range.

## 0.19.3 (2021-12-14)

### Bug fixes

Fix an issue in `RangeSet.compare` where the interaction between spans and points sometimes caused points that had their wrapping spans changed to not be reported.

## 0.19.2 (2021-11-12)

### Bug fixes

Fix a bug in `RangeSet.compare` that would cause it miss changes when range sets were identical but the content under them moved.

Fix an issue where `RangeSet.eq` would consider rangesets equal even if they had a differing point range at the end of the compared range.

## 0.19.1 (2021-08-20)

### Bug fixes

Fix a bug in range set iteration that would sometimes cause ranges to report their position as NaN, breaking downstream code.

## 0.19.0 (2021-08-11)

### Breaking changes

Update dependencies to 0.19.0

## 0.18.5 (2021-08-03)

### Bug fixes

Fix a problem in rangeset comparison that caused changes in the covering of point decorations by other decorations to be missed.

## 0.18.4 (2021-06-29)

### Bug fixes

Fix an issue that caused `RangeSet.between` to incorrectly ignore ranges entirely at the start of the iterated region.

## 0.18.3 (2021-06-03)

### New features

The new static `RangeSet.eq` method can be used to efficiently check whether two groups of change sets differ in a given range.

## 0.18.2 (2021-05-27)

### Bug fixes

Adjust the logic for tracking open ranges to agree with the change in how precedence is handled in the view package.

## 0.18.1 (2021-04-30)

### Bug fixes

When iterating spans and points, don't emit point ranges when they are entirely covered by a previous point.

## 0.18.0 (2021-03-03)

### Breaking changes

Update dependencies to 0.18.

## 0.17.1 (2021-01-06)

### New features

The package now also exports a CommonJS module.

## 0.17.0 (2020-12-29)

### Breaking changes

First numbered release.

