import * as ES from './ecmascript';
import { GetIntrinsic } from './intrinsicclass';
import {
  GetSlot,
  INSTANT,
  ISO_YEAR,
  ISO_MONTH,
  ISO_DAY,
  ISO_HOUR,
  ISO_MINUTE,
  ISO_SECOND,
  ISO_MILLISECOND,
  ISO_MICROSECOND,
  ISO_NANOSECOND,
  CALENDAR,
  TIME_ZONE
} from './slots';
import { Temporal, Intl } from '..';
import {
  DateTimeFormatParams as Params,
  DateTimeFormatReturn as Return,
  InstantParams,
  PlainDateParams,
  PlainDateTimeParams,
  PlainMonthDayParams,
  PlainTimeParams,
  PlainYearMonthParams
} from './internaltypes';

const DATE = Symbol('date');
const YM = Symbol('ym');
const MD = Symbol('md');
const TIME = Symbol('time');
const DATETIME = Symbol('datetime');
const ZONED = Symbol('zoneddatetime');
const INST = Symbol('instant');
const ORIGINAL = Symbol('original');
const TZ_RESOLVED = Symbol('timezone');
const TZ_GIVEN = Symbol('timezone-id-given');
const CAL_ID = Symbol('calendar-id');
const LOCALE = Symbol('locale');
const OPTIONS = Symbol('options');

const descriptor = <T extends (...args: any[]) => any>(value: T) => {
  return {
    value,
    enumerable: true,
    writable: false,
    configurable: true
  };
};

const IntlDateTimeFormat = globalThis.Intl.DateTimeFormat;
const ObjectAssign = Object.assign;
const ObjectHasOwnProperty = Object.prototype.hasOwnProperty;
const ReflectApply = Reflect.apply;

interface CustomFormatters {
  [DATE]: typeof dateAmend | globalThis.Intl.DateTimeFormat;
  [YM]: typeof yearMonthAmend | typeof globalThis.Intl.DateTimeFormat;
  [MD]: typeof monthDayAmend | typeof globalThis.Intl.DateTimeFormat;
  [TIME]: typeof timeAmend | typeof globalThis.Intl.DateTimeFormat;
  [DATETIME]: typeof datetimeAmend | typeof globalThis.Intl.DateTimeFormat;
  [ZONED]: typeof zonedDateTimeAmend | typeof globalThis.Intl.DateTimeFormat;
  [INST]: typeof instantAmend | typeof globalThis.Intl.DateTimeFormat;
}

interface PrivateProps extends CustomFormatters {
  [ORIGINAL]: globalThis.Intl.DateTimeFormat;
  [TZ_RESOLVED]: Temporal.TimeZoneProtocol | string;
  [TZ_GIVEN]: Temporal.TimeZoneProtocol | string | null;
  [CAL_ID]: globalThis.Intl.ResolvedDateTimeFormatOptions['calendar'];
  [LOCALE]: globalThis.Intl.ResolvedDateTimeFormatOptions['locale'];
  [OPTIONS]: Intl.DateTimeFormatOptions;
}

type OptionsAmenderFunction = (options: Intl.DateTimeFormatOptions) => globalThis.Intl.DateTimeFormatOptions;
type FormatterOrAmender = globalThis.Intl.DateTimeFormat | OptionsAmenderFunction;

// Construction of built-in Intl.DateTimeFormat objects is sloooooow,
// so we'll only create those instances when we need them.
// See https://bugs.chromium.org/p/v8/issues/detail?id=6528
function getPropLazy<T extends PrivateProps, P extends keyof CustomFormatters>(
  obj: T,
  prop: P
): globalThis.Intl.DateTimeFormat {
  let val = obj[prop] as FormatterOrAmender;
  if (typeof val === 'function') {
    // If we get here, `val` is an "amender function". It will take the user's
    // options and transform them into suitable options to be passed into the
    // built-in (non-polyfill) Intl.DateTimeFormat constructor. These options
    // will vary depending on the Temporal type, so that's why we store separate
    // formatters in separate props on the polyfill's DateTimeFormat instances.
    // The efficiency happens because we don't create an (expensive) formatter
    // until the user calls toLocaleString for that Temporal type.
    val = new IntlDateTimeFormat(obj[LOCALE], val(obj[OPTIONS]));
    // TODO: can this be typed more cleanly?
    (obj[prop] as globalThis.Intl.DateTimeFormat) = val;
  }
  return val;
}

// Similarly, lazy-init TimeZone instances.
function getResolvedTimeZoneLazy(obj: PrivateProps) {
  let val = obj[TZ_RESOLVED];
  if (typeof val === 'string') {
    val = ES.ToTemporalTimeZone(val);
    obj[TZ_RESOLVED] = val;
  }
  return val;
}

type DateTimeFormatImpl = Intl.DateTimeFormat & PrivateProps;

function DateTimeFormatImpl(
  this: Intl.DateTimeFormat & PrivateProps,
  locale: Params['constructor'][0] = undefined,
  optionsParam: Params['constructor'][1] = {}
) {
  if (!(this instanceof DateTimeFormatImpl)) {
    type Construct = new (
      locale: Params['constructor'][0],
      optionsParam: Params['constructor'][1]
    ) => Intl.DateTimeFormat;
    return new (DateTimeFormatImpl as unknown as Construct)(locale, optionsParam);
  }
  const hasOptions = typeof optionsParam !== 'undefined';
  const options = hasOptions ? ObjectAssign({}, optionsParam) : {};
  // TODO: remove type assertion after Temporal types land in TS lib types
  const original = new IntlDateTimeFormat(locale, options as globalThis.Intl.DateTimeFormatOptions);
  const ro = original.resolvedOptions();

  // DateTimeFormat instances are very expensive to create. Therefore, they will
  // be lazily created only when needed, using the locale and options provided.
  // But it's possible for callers to mutate those inputs before lazy creation
  // happens. For this reason, we clone the inputs instead of caching the
  // original objects. To avoid the complexity of deep cloning any inputs that
  // are themselves objects (e.g. the locales array, or options property values
  // that will be coerced to strings), we rely on `resolvedOptions()` to do the
  // coercion and cloning for us. Unfortunately, we can't just use the resolved
  // options as-is because our options-amending logic adds additional fields if
  // the user doesn't supply any unit fields like year, month, day, hour, etc.
  // Therefore, we limit the properties in the clone to properties that were
  // present in the original input.
  if (hasOptions) {
    const clonedResolved = ObjectAssign({}, ro);
    for (const prop in clonedResolved) {
      if (!ReflectApply(ObjectHasOwnProperty, options, [prop])) {
        delete clonedResolved[prop as keyof typeof clonedResolved];
      }
    }
    this[OPTIONS] = clonedResolved as Intl.DateTimeFormatOptions;
  } else {
    this[OPTIONS] = options;
  }

  this[TZ_GIVEN] = options.timeZone ? options.timeZone : null;
  this[LOCALE] = ro.locale;
  this[ORIGINAL] = original;
  this[TZ_RESOLVED] = ro.timeZone;
  this[CAL_ID] = ro.calendar;
  this[DATE] = dateAmend;
  this[YM] = yearMonthAmend;
  this[MD] = monthDayAmend;
  this[TIME] = timeAmend;
  this[DATETIME] = datetimeAmend;
  this[ZONED] = zonedDateTimeAmend;
  this[INST] = instantAmend;
  return undefined; // TODO: I couldn't satisfy TS without adding this. Is there another way?
}

Object.defineProperty(DateTimeFormatImpl, 'name', {
  writable: true,
  value: 'DateTimeFormat'
});

export const DateTimeFormat = DateTimeFormatImpl as unknown as typeof Intl.DateTimeFormat;

DateTimeFormatImpl.supportedLocalesOf = function (
  locales: Params['supportedLocalesOf'][0],
  options: Params['supportedLocalesOf'][1]
) {
  return IntlDateTimeFormat.supportedLocalesOf(locales, options as globalThis.Intl.DateTimeFormatOptions);
};

const properties: Partial<typeof IntlDateTimeFormat.prototype> = {
  resolvedOptions: descriptor(resolvedOptions),
  format: descriptor(format),
  formatRange: descriptor(formatRange)
};

if ('formatToParts' in IntlDateTimeFormat.prototype) {
  properties.formatToParts = descriptor(formatToParts);
}

if ('formatRangeToParts' in IntlDateTimeFormat.prototype) {
  properties.formatRangeToParts = descriptor(formatRangeToParts);
}

DateTimeFormatImpl.prototype = Object.create(IntlDateTimeFormat.prototype, properties);

function resolvedOptions(this: DateTimeFormatImpl): Return['resolvedOptions'] {
  return this[ORIGINAL].resolvedOptions();
}

function adjustFormatterTimeZone(
  formatter: globalThis.Intl.DateTimeFormat,
  timeZone?: string
): globalThis.Intl.DateTimeFormat {
  if (!timeZone) return formatter;
  const options = formatter.resolvedOptions();
  if (options.timeZone === timeZone) return formatter;
  // Existing Intl isn't typed to accept Temporal-specific options, but will not
  // break at runtime if we pass them. Also, the lib types for resolved options
  // are less restrictive than the types for options. For example, `weekday` is
  // `'long' | 'short' | 'narrow'` in options but `string` in resolved options.
  // TODO: investigate why, and file an issue against TS if it's a bug.
  return new IntlDateTimeFormat(options.locale, { ...(options as globalThis.Intl.DateTimeFormatOptions), timeZone });
}

// TODO: investigate why there's a rest parameter here. Does this function really need to accept extra params?
// And if so, why doesn't formatRange also accept extra params?
function format<P extends readonly unknown[]>(
  this: DateTimeFormatImpl,
  datetime: Params['format'][0],
  ...rest: P
): Return['format'] {
  let { instant, formatter, timeZone } = extractOverrides(datetime, this);
  if (instant && formatter) {
    formatter = adjustFormatterTimeZone(formatter, timeZone);
    return formatter.format(instant.epochMilliseconds);
  }
  // Support spreading additional args for future expansion of this Intl method
  type AllowExtraParams = (datetime: Parameters<Intl.DateTimeFormat['format']>[0], ...rest: P) => Return['format'];
  return (this[ORIGINAL].format as unknown as AllowExtraParams)(datetime, ...rest);
}

function formatToParts<P extends readonly unknown[]>(
  this: DateTimeFormatImpl,
  datetime: Params['formatToParts'][0],
  ...rest: P
): Return['formatToParts'] {
  let { instant, formatter, timeZone } = extractOverrides(datetime, this);
  if (instant && formatter) {
    formatter = adjustFormatterTimeZone(formatter, timeZone);
    return formatter.formatToParts(instant.epochMilliseconds);
  }
  // Support spreading additional args for future expansion of this Intl method
  type AllowExtraParams = (
    datetime: Parameters<Intl.DateTimeFormat['formatToParts']>[0],
    ...rest: P
  ) => Return['formatToParts'];
  return (this[ORIGINAL].formatToParts as unknown as AllowExtraParams)(datetime, ...rest);
}

function formatRange(this: DateTimeFormatImpl, a: Params['formatRange'][0], b: Params['formatRange'][1]) {
  if (isTemporalObject(a) || isTemporalObject(b)) {
    if (!sameTemporalType(a, b)) {
      throw new TypeError('Intl.DateTimeFormat.formatRange accepts two values of the same type');
    }
    const {
      instant: aa,
      formatter: aformatter,
      timeZone: atz
    } = extractOverrides(a as unknown as TypesWithToLocaleString, this);
    const {
      instant: bb,
      formatter: bformatter,
      timeZone: btz
    } = extractOverrides(b as unknown as TypesWithToLocaleString, this);
    if (atz && btz && atz !== btz) {
      throw new RangeError('cannot format range between different time zones');
    }
    if (aa && bb && aformatter && bformatter && aformatter === bformatter) {
      const formatter = adjustFormatterTimeZone(aformatter, atz);
      // TODO: Remove type assertion after this method lands in TS lib types
      return (formatter as Intl.DateTimeFormat).formatRange(aa.epochMilliseconds, bb.epochMilliseconds);
    }
  }
  // TODO: Remove type assertion after this method lands in TS lib types
  return (this[ORIGINAL] as Intl.DateTimeFormat).formatRange(a, b);
}

function formatRangeToParts(
  this: DateTimeFormatImpl,
  a: Params['formatRangeToParts'][0],
  b: Params['formatRangeToParts'][1]
) {
  if (isTemporalObject(a) || isTemporalObject(b)) {
    if (!sameTemporalType(a, b)) {
      throw new TypeError('Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type');
    }
    const { instant: aa, formatter: aformatter, timeZone: atz } = extractOverrides(a, this);
    const { instant: bb, formatter: bformatter, timeZone: btz } = extractOverrides(b, this);
    if (atz && btz && atz !== btz) {
      throw new RangeError('cannot format range between different time zones');
    }
    if (aa && bb && aformatter && bformatter && aformatter === bformatter) {
      const formatter = adjustFormatterTimeZone(aformatter, atz);
      // TODO: Remove type assertion after this method lands in TS lib types
      return (formatter as Intl.DateTimeFormat).formatRangeToParts(aa.epochMilliseconds, bb.epochMilliseconds);
    }
  }
  // TODO: Remove type assertion after this method lands in TS lib types
  return (this[ORIGINAL] as Intl.DateTimeFormat).formatRangeToParts(a, b);
}

// "false" is a signal to delete this option
type MaybeFalseOptions = {
  [K in keyof Intl.DateTimeFormatOptions]?: Intl.DateTimeFormatOptions[K] | false;
};

function amend(optionsParam: Intl.DateTimeFormatOptions = {}, amended: MaybeFalseOptions = {}) {
  const options = ObjectAssign({}, optionsParam);
  for (const opt of [
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'weekday',
    'dayPeriod',
    'timeZoneName',
    'dateStyle',
    'timeStyle'
  ] as const) {
    // TODO: can this be typed more cleanly?
    type OptionMaybeFalse = typeof options[typeof opt] | false;
    (options[opt] as OptionMaybeFalse) = opt in amended ? amended[opt] : options[opt];
    if ((options[opt] as OptionMaybeFalse) === false || options[opt] === undefined) delete options[opt];
  }
  return options as globalThis.Intl.DateTimeFormatOptions;
}

function timeAmend(optionsParam: Intl.DateTimeFormatOptions) {
  let options = amend(optionsParam, {
    year: false,
    month: false,
    day: false,
    weekday: false,
    timeZoneName: false,
    dateStyle: false
  });
  if (!hasTimeOptions(options)) {
    options = ObjectAssign({}, options, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }
  return options;
}

function yearMonthAmend(optionsParam: PlainYearMonthParams['toLocaleString'][1]) {
  let options = amend(optionsParam, {
    day: false,
    hour: false,
    minute: false,
    second: false,
    weekday: false,
    dayPeriod: false,
    timeZoneName: false,
    dateStyle: false,
    timeStyle: false
  });
  if (!('year' in options || 'month' in options)) {
    options = ObjectAssign(options, { year: 'numeric', month: 'numeric' });
  }
  return options;
}

function monthDayAmend(optionsParam: PlainMonthDayParams['toLocaleString'][1]) {
  let options = amend(optionsParam, {
    year: false,
    hour: false,
    minute: false,
    second: false,
    weekday: false,
    dayPeriod: false,
    timeZoneName: false,
    dateStyle: false,
    timeStyle: false
  });
  if (!('month' in options || 'day' in options)) {
    options = ObjectAssign({}, options, { month: 'numeric', day: 'numeric' });
  }
  return options;
}

function dateAmend(optionsParam: PlainDateParams['toLocaleString'][1]) {
  let options = amend(optionsParam, {
    hour: false,
    minute: false,
    second: false,
    dayPeriod: false,
    timeZoneName: false,
    timeStyle: false
  });
  if (!hasDateOptions(options)) {
    options = ObjectAssign({}, options, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  }
  return options;
}

function datetimeAmend(optionsParam: PlainDateTimeParams['toLocaleString'][1]) {
  let options = amend(optionsParam, { timeZoneName: false });
  if (!hasTimeOptions(options) && !hasDateOptions(options)) {
    options = ObjectAssign({}, options, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }
  return options;
}

function zonedDateTimeAmend(optionsParam: PlainTimeParams['toLocaleString'][1]) {
  let options = optionsParam;
  if (!hasTimeOptions(options) && !hasDateOptions(options)) {
    options = ObjectAssign({}, options, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
    if (options.timeZoneName === undefined) options.timeZoneName = 'short';
  }
  return options;
}

function instantAmend(optionsParam: InstantParams['toLocaleString'][1]) {
  let options = optionsParam;
  if (!hasTimeOptions(options) && !hasDateOptions(options)) {
    options = ObjectAssign({}, options, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }
  return options;
}

function hasDateOptions(options: Parameters<TypesWithToLocaleString['toLocaleString']>[1]) {
  return 'year' in options || 'month' in options || 'day' in options || 'weekday' in options || 'dateStyle' in options;
}

function hasTimeOptions(options: Parameters<TypesWithToLocaleString['toLocaleString']>[1]) {
  return (
    'hour' in options || 'minute' in options || 'second' in options || 'timeStyle' in options || 'dayPeriod' in options
  );
}

function isTemporalObject(
  obj: unknown
): obj is
  | Temporal.PlainDate
  | Temporal.PlainTime
  | Temporal.PlainDateTime
  | Temporal.ZonedDateTime
  | Temporal.PlainYearMonth
  | Temporal.PlainMonthDay
  | Temporal.Instant {
  return (
    ES.IsTemporalDate(obj) ||
    ES.IsTemporalTime(obj) ||
    ES.IsTemporalDateTime(obj) ||
    ES.IsTemporalZonedDateTime(obj) ||
    ES.IsTemporalYearMonth(obj) ||
    ES.IsTemporalMonthDay(obj) ||
    ES.IsTemporalInstant(obj)
  );
}

function sameTemporalType(x: unknown, y: unknown) {
  if (!isTemporalObject(x) || !isTemporalObject(y)) return false;
  if (ES.IsTemporalTime(x) && !ES.IsTemporalTime(y)) return false;
  if (ES.IsTemporalDate(x) && !ES.IsTemporalDate(y)) return false;
  if (ES.IsTemporalDateTime(x) && !ES.IsTemporalDateTime(y)) return false;
  if (ES.IsTemporalZonedDateTime(x) && !ES.IsTemporalZonedDateTime(y)) return false;
  if (ES.IsTemporalYearMonth(x) && !ES.IsTemporalYearMonth(y)) return false;
  if (ES.IsTemporalMonthDay(x) && !ES.IsTemporalMonthDay(y)) return false;
  if (ES.IsTemporalInstant(x) && !ES.IsTemporalInstant(y)) return false;
  return true;
}

type TypesWithToLocaleString =
  | Temporal.PlainDateTime
  | Temporal.PlainDate
  | Temporal.PlainTime
  | Temporal.PlainYearMonth
  | Temporal.PlainMonthDay
  | Temporal.ZonedDateTime;

function extractOverrides(temporalObj: Params['format'][0], main: DateTimeFormatImpl) {
  const DateTime = GetIntrinsic('%Temporal.PlainDateTime%');

  if (ES.IsTemporalTime(temporalObj)) {
    const hour = GetSlot(temporalObj, ISO_HOUR);
    const minute = GetSlot(temporalObj, ISO_MINUTE);
    const second = GetSlot(temporalObj, ISO_SECOND);
    const millisecond = GetSlot(temporalObj, ISO_MILLISECOND);
    const microsecond = GetSlot(temporalObj, ISO_MICROSECOND);
    const nanosecond = GetSlot(temporalObj, ISO_NANOSECOND);
    const datetime = new DateTime(1970, 1, 1, hour, minute, second, millisecond, microsecond, nanosecond, main[CAL_ID]);
    return {
      instant: ES.BuiltinTimeZoneGetInstantFor(getResolvedTimeZoneLazy(main), datetime, 'compatible'),
      formatter: getPropLazy(main, TIME)
    };
  }

  if (ES.IsTemporalYearMonth(temporalObj)) {
    const isoYear = GetSlot(temporalObj, ISO_YEAR);
    const isoMonth = GetSlot(temporalObj, ISO_MONTH);
    const referenceISODay = GetSlot(temporalObj, ISO_DAY);
    const calendar = ES.ToString(GetSlot(temporalObj, CALENDAR));
    if (calendar !== main[CAL_ID]) {
      throw new RangeError(
        `cannot format PlainYearMonth with calendar ${calendar} in locale with calendar ${main[CAL_ID]}`
      );
    }
    const datetime = new DateTime(isoYear, isoMonth, referenceISODay, 12, 0, 0, 0, 0, 0, calendar);
    return {
      instant: ES.BuiltinTimeZoneGetInstantFor(getResolvedTimeZoneLazy(main), datetime, 'compatible'),
      formatter: getPropLazy(main, YM)
    };
  }

  if (ES.IsTemporalMonthDay(temporalObj)) {
    const referenceISOYear = GetSlot(temporalObj, ISO_YEAR);
    const isoMonth = GetSlot(temporalObj, ISO_MONTH);
    const isoDay = GetSlot(temporalObj, ISO_DAY);
    const calendar = ES.ToString(GetSlot(temporalObj, CALENDAR));
    if (calendar !== main[CAL_ID]) {
      throw new RangeError(
        `cannot format PlainMonthDay with calendar ${calendar} in locale with calendar ${main[CAL_ID]}`
      );
    }
    const datetime = new DateTime(referenceISOYear, isoMonth, isoDay, 12, 0, 0, 0, 0, 0, calendar);
    return {
      instant: ES.BuiltinTimeZoneGetInstantFor(getResolvedTimeZoneLazy(main), datetime, 'compatible'),
      formatter: getPropLazy(main, MD)
    };
  }

  if (ES.IsTemporalDate(temporalObj)) {
    const isoYear = GetSlot(temporalObj, ISO_YEAR);
    const isoMonth = GetSlot(temporalObj, ISO_MONTH);
    const isoDay = GetSlot(temporalObj, ISO_DAY);
    const calendar = ES.ToString(GetSlot(temporalObj, CALENDAR));
    if (calendar !== 'iso8601' && calendar !== main[CAL_ID]) {
      throw new RangeError(`cannot format PlainDate with calendar ${calendar} in locale with calendar ${main[CAL_ID]}`);
    }
    const datetime = new DateTime(isoYear, isoMonth, isoDay, 12, 0, 0, 0, 0, 0, main[CAL_ID]);
    return {
      instant: ES.BuiltinTimeZoneGetInstantFor(getResolvedTimeZoneLazy(main), datetime, 'compatible'),
      formatter: getPropLazy(main, DATE)
    };
  }

  if (ES.IsTemporalDateTime(temporalObj)) {
    const isoYear = GetSlot(temporalObj, ISO_YEAR);
    const isoMonth = GetSlot(temporalObj, ISO_MONTH);
    const isoDay = GetSlot(temporalObj, ISO_DAY);
    const hour = GetSlot(temporalObj, ISO_HOUR);
    const minute = GetSlot(temporalObj, ISO_MINUTE);
    const second = GetSlot(temporalObj, ISO_SECOND);
    const millisecond = GetSlot(temporalObj, ISO_MILLISECOND);
    const microsecond = GetSlot(temporalObj, ISO_MICROSECOND);
    const nanosecond = GetSlot(temporalObj, ISO_NANOSECOND);
    const calendar = ES.ToString(GetSlot(temporalObj, CALENDAR));
    if (calendar !== 'iso8601' && calendar !== main[CAL_ID]) {
      throw new RangeError(
        `cannot format PlainDateTime with calendar ${calendar} in locale with calendar ${main[CAL_ID]}`
      );
    }
    let datetime = temporalObj;
    if (calendar === 'iso8601') {
      datetime = new DateTime(
        isoYear,
        isoMonth,
        isoDay,
        hour,
        minute,
        second,
        millisecond,
        microsecond,
        nanosecond,
        main[CAL_ID]
      );
    }
    return {
      instant: ES.BuiltinTimeZoneGetInstantFor(getResolvedTimeZoneLazy(main), datetime, 'compatible'),
      formatter: getPropLazy(main, DATETIME)
    };
  }

  if (ES.IsTemporalZonedDateTime(temporalObj)) {
    const calendar = ES.ToString(GetSlot(temporalObj, CALENDAR));
    if (calendar !== 'iso8601' && calendar !== main[CAL_ID]) {
      throw new RangeError(
        `cannot format ZonedDateTime with calendar ${calendar} in locale with calendar ${main[CAL_ID]}`
      );
    }

    const timeZone = GetSlot(temporalObj, TIME_ZONE);
    const objTimeZone = ES.ToString(timeZone);
    if (main[TZ_GIVEN] && main[TZ_GIVEN] !== objTimeZone) {
      throw new RangeError(`timeZone option ${main[TZ_GIVEN]} doesn't match actual time zone ${objTimeZone}`);
    }

    return {
      instant: GetSlot(temporalObj, INSTANT),
      formatter: getPropLazy(main, ZONED),
      timeZone: objTimeZone
    };
  }

  if (ES.IsTemporalInstant(temporalObj)) {
    return {
      instant: temporalObj,
      formatter: getPropLazy(main, INST)
    };
  }

  return {};
}
