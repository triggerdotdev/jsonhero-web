# 0.3.0

This version roughly corresponds with all the changes made to the Temporal polyfill as of the October 2021 TC39 Plenary meeting.

Breaking changes:

- Timezones now require a `getOffsetNanosecondsFor` method, and no longer fall back to the intrinsic definition (previously provided by `Temporal.Timezone#getOffsetNanosecondsFor`) if not provided. ([08346dc5], see also [proposal-temporal polyfill PR](https://github.com/tc39/proposal-temporal/pull/1929))
- Disallow Z designators when parsing strings for Plain Temporal types ([f3f8a994], see also [Spec PR](https://github.com/tc39/proposal-temporal/pull/1874))
- Allow ISO strings with "Z" + a bracketed IANA name ([70bd9898], see also [Spec PR](https://github.com/tc39/proposal-temporal/pull/1749))
- Emit ES2020 builds for newer browsers, and emit ES5 for older browsers. ([2331468d], [9e95c62b])
- Temporal.Duration constructor will now throw if given a non-integer ([9df5d068], see also [Spec PR](https://github.com/tc39/proposal-temporal/pull/1872))
- Remove support for sub-minute offsets in ISO strings ([766e5037], see also [Spec PR](https://github.com/tc39/proposal-temporal/pull/1871), [Spec PR](https://github.com/tc39/proposal-temporal/pull/1862))
- Throw TypeError on missing options from Duration.total ([4ec075f0], see also [Spec PR](https://github.com/tc39/proposal-temporal/pull/1720))
- Reject non-integer Duration fields in Duration.with() ([e6b2488d], see also [Spec PR](https://github.com/tc39/proposal-temporal/pull/1735))
- Ensure an Object is returned from calendar.mergeFields() ([4e63f25f], see also [Spec PR](https://github.com/tc39/proposal-temporal/pull/1719))

Bug fixes:

- Fix GetFormatterParts for Firefox Nightly ([47f9132f])
- Fix TS types of RoundTo and TotalOf ([3008a670])
- Fix crash setting `day` outside current JPN era ([6d3588c3], see also [proposal-temporal polyfill PR](https://github.com/tc39/proposal-temporal/pull/1807))
- Copy options object for PlainYearMonth.{add,subtract} and InterpretTemporalDateTimeFields to prevent user-modified objects from interfering with later operations. ([bafa1bdf], see also [Spec PR](https://github.com/tc39/proposal-temporal/pull/1748))
- Validate input to Calendar.prototype.fields ([7ebc700e], see also [Spec PR](https://github.com/tc39/proposal-temporal/pull/1750))
- Stop observably calling into `getPossibleInstantsFor` in `InterpretISODateTimeOffset` ([5448e59f], see also [Spec PR](https://github.com/tc39/proposal-temporal/pull/1688))
- Call `CalendarEquals` correctly ([07ea694e], see also [proposal-temporal polyfill PR](https://github.com/tc39/proposal-temporal/pull/1858))
- Fix arithmetic issues when using non-ISO months ([079a3325], see also [proposal-temporal polyfill PR](https://github.com/tc39/proposal-temporal/pull/1761))
- Regex: tighten matching of month and day values in datesplit ([b5736546], see also [proposal-temporal polyfill PR](https://github.com/tc39/proposal-temporal/pull/1836))
- Fix TS types for required CalendarProtocol methods ([0ee4581f], see also [proposal-temporal polyfill PR](https://github.com/tc39/proposal-temporal/pull/1964))

Non-breaking changes:

- Various `#round` and `#total` methods now accept string parameters or options bags. Strings are interpreted as the `smallestUnit` option (or `unit` for `Temporal.Duration#total`). ([068e801f], see also [Spec PR](https://github.com/tc39/proposal-temporal/pull/1875))
- Add @@toStringTag to TS types ([41ab6bc0])
- Accept string Calendar names in PlainMonthDay and PlainYearMonth constructors ([27b4c7e8])
- Make options optional in Calendar method TS types ([3a09d00d])
- Align implementation of RoundDuration with adjusted spec text ([4a0d0264], see also [Spec PR](https://github.com/tc39/proposal-temporal/pull/1968/files))

Other:

- Bump various dependencies ([47701107], [f5427de9], [310d9d8b])
- Allow launching and debugging tests (both Demitasse and Test262 suites) from the VSCode debug panel ([960d9b76], [7f7c19a1], [4ec6568e], [edcc668b])
- Run the Test262 test suite against this polyfill, for various configurations of the resulting build artifact ([2331468d], [666c69da], [429273ec], [ff937782], [f885253f])
- Remove various pieces of unused code, and add CI testing to detect unused code in PR review ([67f9f6bb], [63bdfcd1])
- Drop the dependency on es-abstract ([d24575f2], [ad7e2e3a], [5b1bc5e2])
- The polyfill's source was ported to TypeScript ([12e4d529], [ac78fd9d], [53f32e0f], [06b806c9], [66fdc765], [50b1c34b], [4724b017], [947a8a5e], [fdbf7e01], [fa60af6a], [da753f2f], [f4db8b0b], [4a38420d])
- Document the release process for this polyfill ([c55818b6])

[08346dc5]: https://github.com/js-temporal/temporal-polyfill/commit/08346dc5bc809e7575eacde3200f9775fe19c378
[f3f8a994]: https://github.com/js-temporal/temporal-polyfill/commit/f3f8a994c05603ddf1f4ebad09f191a8e847566e
[70bd9898]: https://github.com/js-temporal/temporal-polyfill/commit/70bd98989d79da847c479b1a3ff05a6a4dc045b2
[2331468d]: https://github.com/js-temporal/temporal-polyfill/commit/2331468dc809b1abefab5d3c6d0901baf298f9fa
[9e95c62b]: https://github.com/js-temporal/temporal-polyfill/commit/9e95c62b4346f89b79a8be66a8767bf120230cf8
[9df5d068]: https://github.com/js-temporal/temporal-polyfill/commit/9df5d068165cce79cbdf5b047674e4156a3acb28
[766e5037]: https://github.com/js-temporal/temporal-polyfill/commit/766e5037a7943ed30f4e7d106bd74fb68509008e
[4ec075f0]: https://github.com/js-temporal/temporal-polyfill/commit/4ec075f0b8d3e58cc1a6632157696dc76901835a
[e6b2488d]: https://github.com/js-temporal/temporal-polyfill/commit/e6b2488d668c72e73f2d0052439bca4eca48536c
[4e63f25f]: https://github.com/js-temporal/temporal-polyfill/commit/4e63f25f4adcb3230ae18d75aca878eadff7ab91
[47f9132f]: https://github.com/js-temporal/temporal-polyfill/commit/47f9132f1c56658e40bb1f268a9ac542a897a9ca
[3008a670]: https://github.com/js-temporal/temporal-polyfill/commit/3008a670b3758abe1b2341d54da4217b251bc234
[6d3588c3]: https://github.com/js-temporal/temporal-polyfill/commit/6d3588c33fec99d18c403229cff19375a7726dea
[bafa1bdf]: https://github.com/js-temporal/temporal-polyfill/commit/bafa1bdf2dbfc28513d7e39b0c0d1c3d075d9db5
[7ebc700e]: https://github.com/js-temporal/temporal-polyfill/commit/7ebc700ea92d660f42b6397f7e400122630c2e76
[5448e59f]: https://github.com/js-temporal/temporal-polyfill/commit/5448e59f461e7a56f8d5af4eb5353b2284cbab93
[07ea694e]: https://github.com/js-temporal/temporal-polyfill/commit/07ea694e0e44bffae021b537facf80def78d94cf
[079a3325]: https://github.com/js-temporal/temporal-polyfill/commit/079a33254af4e6610b409e33a3cc7fa22d116796
[b5736546]: https://github.com/js-temporal/temporal-polyfill/commit/b5736546a193478cd4b8f491f8a7c7d9763c322a
[0ee4581f]: https://github.com/js-temporal/temporal-polyfill/commit/0ee4581f8068fdd433040b17c7a2580733c55039
[068e801f]: https://github.com/js-temporal/temporal-polyfill/commit/068e801ff507aa1176dba2283e526900cdc6d0c1
[41ab6bc0]: https://github.com/js-temporal/temporal-polyfill/commit/41ab6bc01dc66b6f20ba7bc39f681aeebb64068a
[27b4c7e8]: https://github.com/js-temporal/temporal-polyfill/commit/27b4c7e89d617434bddf9b4240c57ab732233dba
[3a09d00d]: https://github.com/js-temporal/temporal-polyfill/commit/3a09d00de02918362b1530cc4121047c9e7495bb
[4a0d0264]: https://github.com/js-temporal/temporal-polyfill/commit/4a0d02648592439840345820b80f6d6f45e773aa
[47701107]: https://github.com/js-temporal/temporal-polyfill/commit/477011079f6e69e4d6fb18127d9cb0db2ee29ea6
[f5427de9]: https://github.com/js-temporal/temporal-polyfill/commit/f5427de92d4e4f015ea1374368b6594295597af3
[310d9d8b]: https://github.com/js-temporal/temporal-polyfill/commit/310d9d8b329de46e83fb2de75b997c7d28ac65f6
[960d9b76]: https://github.com/js-temporal/temporal-polyfill/commit/960d9b76d7acb24f017eb6ad58c72cb89905f804
[7f7c19a1]: https://github.com/js-temporal/temporal-polyfill/commit/7f7c19a11fc16bdd8aed52cd9e074d06be14c1ae
[4ec6568e]: https://github.com/js-temporal/temporal-polyfill/commit/4ec6568e1dc64f219b8b9aeddc9655f2728157b5
[edcc668b]: https://github.com/js-temporal/temporal-polyfill/commit/edcc668b680321aea0ceb20f041e7831cbb3b041
[2331468d]: https://github.com/js-temporal/temporal-polyfill/commit/2331468dc809b1abefab5d3c6d0901baf298f9fa
[666c69da]: https://github.com/js-temporal/temporal-polyfill/commit/666c69dab69655940ed712ca40d1ea7b1a6f3a4c
[429273ec]: https://github.com/js-temporal/temporal-polyfill/commit/429273ec7ced0eb85bfd736d07c01e7c31d871e8
[ff937782]: https://github.com/js-temporal/temporal-polyfill/commit/ff9377829f27895ee5d31f02d2b442fea827e399
[f885253f]: https://github.com/js-temporal/temporal-polyfill/commit/f885253fdc0d16115b0a9d986a47e3fa35e50878
[67f9f6bb]: https://github.com/js-temporal/temporal-polyfill/commit/67f9f6bbb7c3252144d6267cd1cf25f53e253d56
[63bdfcd1]: https://github.com/js-temporal/temporal-polyfill/commit/63bdfcd11f62d85796761c6397369b900db35a84
[d24575f2]: https://github.com/js-temporal/temporal-polyfill/commit/d24575f21b127c7889f1fa49ce41fc2f5e100618
[ad7e2e3a]: https://github.com/js-temporal/temporal-polyfill/commit/ad7e2e3a5b7a9f136c0ef551753b7381a5d16301
[5b1bc5e2]: https://github.com/js-temporal/temporal-polyfill/commit/5b1bc5e2e8635626993a65dadfecab45125f4f96
[12e4d529]: https://github.com/js-temporal/temporal-polyfill/commit/12e4d5294ffe6c847ca0a98e752fbf25a68b973d
[ac78fd9d]: https://github.com/js-temporal/temporal-polyfill/commit/ac78fd9ddff96dd792703a4948d11196d52fbbed
[53f32e0f]: https://github.com/js-temporal/temporal-polyfill/commit/53f32e0f868d2ddcaf09643c87a09df2ed158b78
[06b806c9]: https://github.com/js-temporal/temporal-polyfill/commit/06b806c9c1831eca649d5398399f862ea539a5ed
[66fdc765]: https://github.com/js-temporal/temporal-polyfill/commit/66fdc76589578b349ae2df63d9c79972f311ff0f
[50b1c34b]: https://github.com/js-temporal/temporal-polyfill/commit/50b1c34b3f54073fe50ce56998767a3bb0f4c763
[4724b017]: https://github.com/js-temporal/temporal-polyfill/commit/4724b017f86ef8c7b51d6291594604bff24a81f3
[947a8a5e]: https://github.com/js-temporal/temporal-polyfill/commit/947a8a5e0bfbfaf534fb943d8bd46d676dd5b5e6
[fdbf7e01]: https://github.com/js-temporal/temporal-polyfill/commit/fdbf7e0167be4413b39d3ea9c1e41c5323ab97c1
[fa60af6a]: https://github.com/js-temporal/temporal-polyfill/commit/fa60af6af015dbefba11de488e7f6be707c953a7
[da753f2f]: https://github.com/js-temporal/temporal-polyfill/commit/da753f2fedd80f4894ab5d1d9522b2820eb39f56
[f4db8b0b]: https://github.com/js-temporal/temporal-polyfill/commit/f4db8b0bb47584da0ecf5ab138242836924f052f
[4a38420d]: https://github.com/js-temporal/temporal-polyfill/commit/4a38420de406f35439c937eafbdc5783cda9c2b9
[c55818b6]: https://github.com/js-temporal/temporal-polyfill/commit/c55818b6458cfd4ea0efd7259f593fc2ec8dcda9
