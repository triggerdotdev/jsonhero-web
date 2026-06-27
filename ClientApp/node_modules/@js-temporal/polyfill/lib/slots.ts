import bigInt from 'big-integer';
import type { Temporal } from '..';
import type { BuiltinCalendarId, AnyTemporalType } from './internaltypes';

// Instant
export const EPOCHNANOSECONDS = 'slot-epochNanoSeconds';

// TimeZone
export const TIMEZONE_ID = 'slot-timezone-identifier';

// DateTime, Date, Time, YearMonth, MonthDay
export const ISO_YEAR = 'slot-year';
export const ISO_MONTH = 'slot-month';
export const ISO_DAY = 'slot-day';
export const ISO_HOUR = 'slot-hour';
export const ISO_MINUTE = 'slot-minute';
export const ISO_SECOND = 'slot-second';
export const ISO_MILLISECOND = 'slot-millisecond';
export const ISO_MICROSECOND = 'slot-microsecond';
export const ISO_NANOSECOND = 'slot-nanosecond';
export const CALENDAR = 'slot-calendar';
// Date, YearMonth, and MonthDay all have the same slots, disambiguation needed:
export const DATE_BRAND = 'slot-date-brand';
export const YEAR_MONTH_BRAND = 'slot-year-month-brand';
export const MONTH_DAY_BRAND = 'slot-month-day-brand';

// ZonedDateTime
export const INSTANT = 'slot-cached-instant';
export const TIME_ZONE = 'slot-time-zone';

// Duration
export const YEARS = 'slot-years';
export const MONTHS = 'slot-months';
export const WEEKS = 'slot-weeks';
export const DAYS = 'slot-days';
export const HOURS = 'slot-hours';
export const MINUTES = 'slot-minutes';
export const SECONDS = 'slot-seconds';
export const MILLISECONDS = 'slot-milliseconds';
export const MICROSECONDS = 'slot-microseconds';
export const NANOSECONDS = 'slot-nanoseconds';

// Calendar
export const CALENDAR_ID = 'slot-calendar-identifier';

interface SlotInfo<ValueType, UsedByType extends AnyTemporalType> {
  value: ValueType;
  usedBy: UsedByType;
}

interface SlotInfoRecord {
  [k: string]: SlotInfo<unknown, AnyTemporalType>;
}

interface Slots extends SlotInfoRecord {
  // Instant
  [EPOCHNANOSECONDS]: SlotInfo<bigInt.BigInteger, Temporal.Instant | Temporal.ZonedDateTime>; // number? JSBI?

  // TimeZone
  [TIMEZONE_ID]: SlotInfo<string, Temporal.TimeZone>;

  // DateTime, Date, Time, YearMonth, MonthDay
  [ISO_YEAR]: SlotInfo<number, TypesWithCalendarUnits>;
  [ISO_MONTH]: SlotInfo<number, TypesWithCalendarUnits>;
  [ISO_DAY]: SlotInfo<number, TypesWithCalendarUnits>;
  [ISO_HOUR]: SlotInfo<number, TypesWithCalendarUnits>;
  [ISO_MINUTE]: SlotInfo<number, TypesWithCalendarUnits>;
  [ISO_SECOND]: SlotInfo<number, TypesWithCalendarUnits>;
  [ISO_MILLISECOND]: SlotInfo<number, TypesWithCalendarUnits>;
  [ISO_MICROSECOND]: SlotInfo<number, TypesWithCalendarUnits>;
  [ISO_NANOSECOND]: SlotInfo<number, TypesWithCalendarUnits>;
  [CALENDAR]: SlotInfo<Temporal.CalendarProtocol, TypesWithCalendarUnits | Temporal.ZonedDateTime>;

  // Date, YearMonth, MonthDay common slots
  [DATE_BRAND]: SlotInfo<true, Temporal.PlainDate>;
  [YEAR_MONTH_BRAND]: SlotInfo<true, Temporal.PlainYearMonth>;
  [MONTH_DAY_BRAND]: SlotInfo<true, Temporal.PlainMonthDay>;

  // ZonedDateTime
  [INSTANT]: SlotInfo<Temporal.Instant, Temporal.ZonedDateTime>;
  [TIME_ZONE]: SlotInfo<Temporal.TimeZoneProtocol, Temporal.ZonedDateTime>;

  // Duration
  [YEARS]: SlotInfo<number, Temporal.Duration>;
  [MONTHS]: SlotInfo<number, Temporal.Duration>;
  [WEEKS]: SlotInfo<number, Temporal.Duration>;
  [DAYS]: SlotInfo<number, Temporal.Duration>;
  [HOURS]: SlotInfo<number, Temporal.Duration>;
  [MINUTES]: SlotInfo<number, Temporal.Duration>;
  [SECONDS]: SlotInfo<number, Temporal.Duration>;
  [MILLISECONDS]: SlotInfo<number, Temporal.Duration>;
  [MICROSECONDS]: SlotInfo<number, Temporal.Duration>;
  [NANOSECONDS]: SlotInfo<number, Temporal.Duration>;

  // Calendar
  [CALENDAR_ID]: SlotInfo<BuiltinCalendarId, Temporal.Calendar>;
}

type TypesWithCalendarUnits =
  | Temporal.PlainDateTime
  | Temporal.PlainDate
  | Temporal.PlainTime
  | Temporal.PlainYearMonth
  | Temporal.PlainMonthDay
  | Temporal.ZonedDateTime;

interface SlotsToTypes {
  // Instant
  [EPOCHNANOSECONDS]: Temporal.Instant;

  // TimeZone
  [TIMEZONE_ID]: Temporal.TimeZone;

  // DateTime, Date, Time, YearMonth, MonthDay
  [ISO_YEAR]: TypesWithCalendarUnits;
  [ISO_MONTH]: TypesWithCalendarUnits;
  [ISO_DAY]: TypesWithCalendarUnits;
  [ISO_HOUR]: TypesWithCalendarUnits;
  [ISO_MINUTE]: TypesWithCalendarUnits;
  [ISO_SECOND]: TypesWithCalendarUnits;
  [ISO_MILLISECOND]: TypesWithCalendarUnits;
  [ISO_MICROSECOND]: TypesWithCalendarUnits;
  [ISO_NANOSECOND]: TypesWithCalendarUnits;
  [CALENDAR]: TypesWithCalendarUnits;

  // Date, YearMonth, MonthDay common slots
  [DATE_BRAND]: Temporal.PlainDate;
  [YEAR_MONTH_BRAND]: Temporal.PlainYearMonth;
  [MONTH_DAY_BRAND]: Temporal.PlainMonthDay;

  // ZonedDateTime
  [INSTANT]: Temporal.ZonedDateTime;
  [TIME_ZONE]: Temporal.ZonedDateTime;

  // Duration
  [YEARS]: Temporal.Duration;
  [MONTHS]: Temporal.Duration;
  [WEEKS]: Temporal.Duration;
  [DAYS]: Temporal.Duration;
  [HOURS]: Temporal.Duration;
  [MINUTES]: Temporal.Duration;
  [SECONDS]: Temporal.Duration;
  [MILLISECONDS]: Temporal.Duration;
  [MICROSECONDS]: Temporal.Duration;
  [NANOSECONDS]: Temporal.Duration;

  // Calendar
  [CALENDAR_ID]: Temporal.Calendar;
}

type SlotKey = keyof SlotsToTypes;

const slots = new WeakMap();
export function CreateSlots(container: AnyTemporalType): void {
  slots.set(container, Object.create(null));
}

function GetSlots<T extends AnyTemporalType>(container: T) {
  return slots.get(container);
}
// TODO: is there a better way than 9 overloads to make HasSlot into a type
// guard that takes a variable number of parameters?
export function HasSlot<ID1 extends SlotKey>(container: unknown, id1: ID1): container is Slots[ID1]['usedBy'];
export function HasSlot<ID1 extends SlotKey, ID2 extends SlotKey>(
  container: unknown,
  id1: ID1,
  id2: ID2
): container is Slots[ID1]['usedBy'] | Slots[ID2]['usedBy'];
export function HasSlot<ID1 extends SlotKey, ID2 extends SlotKey, ID3 extends SlotKey>(
  container: unknown,
  id1: ID1,
  id2: ID2,
  id3: ID3
): container is Slots[ID1]['usedBy'] | Slots[ID2]['usedBy'] | Slots[ID3]['usedBy'];
export function HasSlot<ID1 extends SlotKey, ID2 extends SlotKey, ID3 extends SlotKey, ID4 extends SlotKey>(
  container: unknown,
  id1: ID1,
  id2: ID2,
  id3: ID3,
  id4: ID4
): container is Slots[ID1 | ID2 | ID3 | ID4]['usedBy'];
export function HasSlot<
  ID1 extends SlotKey,
  ID2 extends SlotKey,
  ID3 extends SlotKey,
  ID4 extends SlotKey,
  ID5 extends SlotKey
>(
  container: unknown,
  id1: ID1,
  id2: ID2,
  id3: ID3,
  id4: ID4,
  id5: ID5
): container is Slots[ID1 | ID2 | ID3 | ID4 | ID5]['usedBy'];
export function HasSlot<
  ID1 extends SlotKey,
  ID2 extends SlotKey,
  ID3 extends SlotKey,
  ID4 extends SlotKey,
  ID5 extends SlotKey,
  ID6 extends SlotKey
>(
  container: unknown,
  id1: ID1,
  id2: ID2,
  id3: ID3,
  id4: ID4,
  id5: ID5,
  id6: ID6
): container is Slots[ID1 | ID2 | ID3 | ID4 | ID5 | ID6]['usedBy'];
export function HasSlot<
  ID1 extends SlotKey,
  ID2 extends SlotKey,
  ID3 extends SlotKey,
  ID4 extends SlotKey,
  ID5 extends SlotKey,
  ID6 extends SlotKey,
  ID7 extends SlotKey
>(
  container: unknown,
  id1: ID1,
  id2: ID2,
  id3: ID3,
  id4: ID4,
  id5: ID5,
  id6: ID6,
  id7: ID7
): container is Slots[ID1 | ID2 | ID3 | ID4 | ID5 | ID6 | ID7]['usedBy'];
export function HasSlot<
  ID1 extends SlotKey,
  ID2 extends SlotKey,
  ID3 extends SlotKey,
  ID4 extends SlotKey,
  ID5 extends SlotKey,
  ID6 extends SlotKey,
  ID7 extends SlotKey,
  ID8 extends SlotKey
>(
  container: unknown,
  id1: ID1,
  id2: ID2,
  id3: ID3,
  id4: ID4,
  id5: ID5,
  id6: ID6,
  id7: ID7,
  id8: ID8
): container is Slots[ID1 | ID2 | ID3 | ID4 | ID5 | ID6 | ID7 | ID8]['usedBy'];
export function HasSlot<
  ID1 extends SlotKey,
  ID2 extends SlotKey,
  ID3 extends SlotKey,
  ID4 extends SlotKey,
  ID5 extends SlotKey,
  ID6 extends SlotKey,
  ID7 extends SlotKey,
  ID8 extends SlotKey,
  ID9 extends SlotKey
>(
  container: unknown,
  id1: ID1,
  id2: ID2,
  id3: ID3,
  id4: ID4,
  id5: ID5,
  id6: ID6,
  id7: ID7,
  id8: ID8,
  id9: ID9
): container is Slots[ID1 | ID2 | ID3 | ID4 | ID5 | ID6 | ID7 | ID8 | ID9]['usedBy'];
export function HasSlot(container: unknown, ...ids: (keyof Slots)[]): boolean {
  if (!container || 'object' !== typeof container) return false;
  const myslots = GetSlots(container as AnyTemporalType);
  return !!myslots && ids.reduce((all: boolean, id) => all && id in myslots, true);
}
export function GetSlot<KeyT extends keyof Slots>(
  container: Slots[typeof id]['usedBy'],
  id: KeyT
): Slots[KeyT]['value'] {
  const value = GetSlots(container)[id];
  if (value === undefined) throw new TypeError(`Missing internal slot ${id}`);
  return value;
}
export function SetSlot<KeyT extends SlotKey>(
  container: Slots[KeyT]['usedBy'],
  id: KeyT,
  value: Slots[KeyT]['value']
): void {
  GetSlots(container)[id] = value;
}
