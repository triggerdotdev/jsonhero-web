import * as ES from './ecmascript';
import { GetIntrinsic } from './intrinsicclass';
import { Temporal } from '..';

const instant: typeof Temporal.Now['instant'] = () => {
  const Instant = GetIntrinsic('%Temporal.Instant%');
  return new Instant(ES.SystemUTCEpochNanoSeconds());
};
const plainDateTime: typeof Temporal.Now['plainDateTime'] = (calendarLike, temporalTimeZoneLike = timeZone()) => {
  const tZ = ES.ToTemporalTimeZone(temporalTimeZoneLike);
  const calendar = ES.ToTemporalCalendar(calendarLike);
  const inst = instant();
  return ES.BuiltinTimeZoneGetPlainDateTimeFor(tZ, inst, calendar);
};
const plainDateTimeISO: typeof Temporal.Now['plainDateTimeISO'] = (temporalTimeZoneLike = timeZone()) => {
  const tZ = ES.ToTemporalTimeZone(temporalTimeZoneLike);
  const calendar = ES.GetISO8601Calendar();
  const inst = instant();
  return ES.BuiltinTimeZoneGetPlainDateTimeFor(tZ, inst, calendar);
};
const zonedDateTime: typeof Temporal.Now['zonedDateTime'] = (calendarLike, temporalTimeZoneLike = timeZone()) => {
  const tZ = ES.ToTemporalTimeZone(temporalTimeZoneLike);
  const calendar = ES.ToTemporalCalendar(calendarLike);
  return ES.CreateTemporalZonedDateTime(ES.SystemUTCEpochNanoSeconds(), tZ, calendar);
};
const zonedDateTimeISO: typeof Temporal.Now['zonedDateTimeISO'] = (temporalTimeZoneLike = timeZone()) => {
  return zonedDateTime(ES.GetISO8601Calendar(), temporalTimeZoneLike);
};
const plainDate: typeof Temporal.Now['plainDate'] = (calendarLike, temporalTimeZoneLike = timeZone()) => {
  return ES.TemporalDateTimeToDate(plainDateTime(calendarLike, temporalTimeZoneLike));
};
const plainDateISO: typeof Temporal.Now['plainDateISO'] = (temporalTimeZoneLike = timeZone()) => {
  return ES.TemporalDateTimeToDate(plainDateTimeISO(temporalTimeZoneLike));
};
const plainTimeISO: typeof Temporal.Now['plainTimeISO'] = (temporalTimeZoneLike = timeZone()) => {
  return ES.TemporalDateTimeToTime(plainDateTimeISO(temporalTimeZoneLike));
};
const timeZone: typeof Temporal.Now['timeZone'] = () => {
  return ES.SystemTimeZone();
};

export const Now: typeof Temporal.Now = {
  instant,
  plainDateTime,
  plainDateTimeISO,
  plainDate,
  plainDateISO,
  plainTimeISO,
  timeZone,
  zonedDateTime,
  zonedDateTimeISO,
  [Symbol.toStringTag]: 'Temporal.Now'
};
Object.defineProperty(Now, Symbol.toStringTag, {
  value: 'Temporal.Now',
  writable: false,
  enumerable: false,
  configurable: true
});
