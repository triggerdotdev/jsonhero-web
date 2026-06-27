import { Intl, Temporal } from '..';

export type BuiltinCalendarId =
  | 'iso8601'
  | 'hebrew'
  | 'islamic'
  | 'islamic-umalqura'
  | 'islamic-tbla'
  | 'islamic-civil'
  | 'islamic-rgsa'
  | 'islamicc'
  | 'persian'
  | 'ethiopic'
  | 'ethioaa'
  | 'coptic'
  | 'chinese'
  | 'dangi'
  | 'roc'
  | 'indian'
  | 'buddhist'
  | 'japanese'
  | 'gregory';

export type AnyTemporalType =
  | Temporal.Calendar
  | Temporal.Duration
  | Temporal.Instant
  | Temporal.PlainDate
  | Temporal.PlainDateTime
  | Temporal.PlainMonthDay
  | Temporal.PlainTime
  | Temporal.PlainYearMonth
  | Temporal.TimeZone
  | Temporal.ZonedDateTime;

/*
// unused, but uncomment if this is needed later
export type AnyTemporalConstructor =
  | typeof Temporal.Calendar
  | typeof Temporal.Duration
  | typeof Temporal.Instant
  | typeof Temporal.PlainDate
  | typeof Temporal.PlainDateTime
  | typeof Temporal.PlainMonthDay
  | typeof Temporal.PlainTime
  | typeof Temporal.PlainYearMonth
  | typeof Temporal.TimeZone
  | typeof Temporal.ZonedDateTime;
*/

export type AnyTemporalLikeType =
  | Temporal.DurationLike
  | Temporal.PlainDateLike
  | Temporal.PlainDateTimeLike
  | Temporal.PlainMonthDayLike
  | Temporal.PlainTimeLike
  | Temporal.PlainYearMonthLike
  | Temporal.ZonedDateTimeLike;

// The properties below are all the names of Temporal properties that can be set with `with`.
// `timeZone` and `calendar` are not on the list because they have special methods to set them.
export type PrimitivePropertyNames =
  | 'year'
  | 'month'
  | 'monthCode'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond'
  | 'microsecond'
  | 'nanosecond'
  | 'years'
  | 'months'
  | 'weeks'
  | 'days'
  | 'hours'
  | 'minutes'
  | 'seconds'
  | 'milliseconds'
  | 'microseconds'
  | 'nanoseconds'
  | 'era'
  | 'eraYear'
  | 'offset';

export type UnitSmallerThanOrEqualTo<T extends Temporal.DateTimeUnit> = T extends 'year'
  ? Temporal.DateTimeUnit
  : T extends 'month'
  ? Exclude<Temporal.DateTimeUnit, 'year'>
  : T extends 'week'
  ? Exclude<Temporal.DateTimeUnit, 'year' | 'month'>
  : T extends 'day'
  ? Exclude<Temporal.DateTimeUnit, 'year' | 'month' | 'week'>
  : T extends 'hour'
  ? Temporal.TimeUnit
  : T extends 'minute'
  ? Exclude<Temporal.TimeUnit, 'hour'>
  : T extends 'second'
  ? Exclude<Temporal.TimeUnit, 'hour' | 'minute'>
  : T extends 'millisecond'
  ? Exclude<Temporal.TimeUnit, 'hour' | 'minute' | 'second'>
  : T extends 'microsecond'
  ? 'nanosecond'
  : never;

export type FieldRecord<B extends AnyTemporalLikeType> = readonly [keyof B, 0 | undefined] | readonly [keyof B];

// ts-prune complains about the type definitions below, even though they're used
// by exported types Not sure why and don't have time to investigate, so just
// disabling the warnings for now.

// ts-prune-ignore-next
type Method = (...args: any) => any;
// ts-prune-ignore-next
type NonObjectKeys<T> = Exclude<keyof T, 'toString' | 'toLocaleString' | 'prototype'>;

// ts-prune-ignore-next
type MethodParams<Type extends new (...args: any) => any> = {
  // constructor parameters
  constructor: ConstructorParameters<Type>;
} & {
  // static method parameters
  [Key in NonObjectKeys<Type>]: Type[Key] extends Method ? Parameters<Type[Key]> : never;
} & {
  // prototype method parameters
  [Key in keyof InstanceType<Type>]: InstanceType<Type>[Key] extends Method
    ? Parameters<InstanceType<Type>[Key]>
    : never;
};

// ts-prune-ignore-next
type MethodReturn<Type extends new (...args: any) => any> = {
  constructor: InstanceType<Type>;
} & {
  [Key in NonObjectKeys<Type>]: Type[Key] extends Method ? ReturnType<Type[Key]> : Type[Key];
} & {
  [Key in keyof InstanceType<Type>]: InstanceType<Type>[Key] extends Method
    ? ReturnType<InstanceType<Type>[Key]>
    : InstanceType<Type>[Key];
};

/* Currently unused, but may use later
type InterfaceReturn<Type> = {
  [Key in keyof Type]: Type[Key] extends Method ? ReturnType<Type[Key]> : Type[Key];
};
*/

// ts-prune-ignore-next
type InterfaceParams<Type> = {
  [Key in keyof Type]: Type[Key] extends Method ? Parameters<Type[Key]> : never;
};

// Parameters of each Temporal type. Examples:
// * InstantParams['compare'][1] - static methods
// * PlainDateParams['since'][0] - prototype methods
// * DurationParams['constructor'][3] - constructors
export interface ZonedDateTimeParams extends MethodParams<typeof Temporal.ZonedDateTime> {}
export interface CalendarParams extends MethodParams<typeof Temporal.Calendar> {}
export interface DurationParams extends MethodParams<typeof Temporal.Duration> {}
export interface InstantParams extends MethodParams<typeof Temporal.Instant> {}
export interface PlainDateParams extends MethodParams<typeof Temporal.PlainDate> {}
export interface PlainDateTimeParams extends MethodParams<typeof Temporal.PlainDateTime> {}
export interface PlainMonthDayParams extends MethodParams<typeof Temporal.PlainMonthDay> {}
export interface PlainTimeParams extends MethodParams<typeof Temporal.PlainTime> {}
export interface PlainYearMonthParams extends MethodParams<typeof Temporal.PlainYearMonth> {}
export interface TimeZoneParams extends MethodParams<typeof Temporal.TimeZone> {}
export interface ZonedDateTimeParams extends MethodParams<typeof Temporal.ZonedDateTime> {}

// Return types of static or instance methods
export interface ZonedDateTimeReturn extends MethodReturn<typeof Temporal.ZonedDateTime> {}
export interface CalendarReturn extends MethodReturn<typeof Temporal.Calendar> {}
export interface DurationReturn extends MethodReturn<typeof Temporal.Duration> {}
export interface InstantReturn extends MethodReturn<typeof Temporal.Instant> {}
export interface PlainDateReturn extends MethodReturn<typeof Temporal.PlainDate> {}
export interface PlainDateTimeReturn extends MethodReturn<typeof Temporal.PlainDateTime> {}
export interface PlainMonthDayReturn extends MethodReturn<typeof Temporal.PlainMonthDay> {}
export interface PlainTimeReturn extends MethodReturn<typeof Temporal.PlainTime> {}
export interface PlainYearMonthReturn extends MethodReturn<typeof Temporal.PlainYearMonth> {}
export interface TimeZoneReturn extends MethodReturn<typeof Temporal.TimeZone> {}
export interface ZonedDateTimeReturn extends MethodReturn<typeof Temporal.ZonedDateTime> {}

export interface CalendarProtocolParams extends InterfaceParams<Temporal.CalendarProtocol> {}
export interface TimeZoneProtocolParams extends InterfaceParams<Temporal.TimeZoneProtocol> {}
// UNUSED, BUT MAY USE LATER
// export interface TimeZoneProtocolReturn extends InterfaceReturn<Temporal.TimeZoneProtocol> {}
// export interface CalendarProtocolReturn extends InterfaceReturn<Temporal.CalendarProtocol> {}

export interface DateTimeFormatParams extends MethodParams<typeof Intl.DateTimeFormat> {}
export interface DateTimeFormatReturn extends MethodReturn<typeof Intl.DateTimeFormat> {}
