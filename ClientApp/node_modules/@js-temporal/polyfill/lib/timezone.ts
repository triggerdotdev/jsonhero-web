import { DEBUG } from './debug';
import * as ES from './ecmascript';
import { GetIntrinsic, MakeIntrinsicClass } from './intrinsicclass';
import {
  TIMEZONE_ID,
  EPOCHNANOSECONDS,
  ISO_YEAR,
  ISO_MONTH,
  ISO_DAY,
  ISO_HOUR,
  ISO_MINUTE,
  ISO_SECOND,
  ISO_MILLISECOND,
  ISO_MICROSECOND,
  ISO_NANOSECOND,
  CreateSlots,
  GetSlot,
  SetSlot
} from './slots';
import { Temporal } from '..';
import type { TimeZoneParams as Params, TimeZoneReturn as Return } from './internaltypes';

export class TimeZone implements Temporal.TimeZone {
  constructor(timeZoneIdentifierParam: string) {
    // Note: if the argument is not passed, GetCanonicalTimeZoneIdentifier(undefined) will throw.
    //       This check exists only to improve the error message.
    if (arguments.length < 1) {
      throw new RangeError('missing argument: identifier is required');
    }

    const timeZoneIdentifier = ES.GetCanonicalTimeZoneIdentifier(timeZoneIdentifierParam);
    CreateSlots(this);
    SetSlot(this, TIMEZONE_ID, timeZoneIdentifier);

    if (DEBUG) {
      Object.defineProperty(this, '_repr_', {
        value: `${this[Symbol.toStringTag]} <${timeZoneIdentifier}>`,
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
  get id(): Return['id'] {
    return ES.ToString(this);
  }
  getOffsetNanosecondsFor(instantParam: Params['getOffsetNanosecondsFor'][0]): Return['getOffsetNanosecondsFor'] {
    if (!ES.IsTemporalTimeZone(this)) throw new TypeError('invalid receiver');
    const instant = ES.ToTemporalInstant(instantParam);
    const id = GetSlot(this, TIMEZONE_ID);

    const offsetNs = ES.ParseOffsetString(id);
    if (offsetNs !== null) return offsetNs;

    return ES.GetIANATimeZoneOffsetNanoseconds(GetSlot(instant, EPOCHNANOSECONDS), id);
  }
  getOffsetStringFor(instantParam: Params['getOffsetStringFor'][0]): Return['getOffsetStringFor'] {
    if (!ES.IsTemporalTimeZone(this)) throw new TypeError('invalid receiver');
    const instant = ES.ToTemporalInstant(instantParam);
    return ES.BuiltinTimeZoneGetOffsetStringFor(this, instant);
  }
  getPlainDateTimeFor(
    instantParam: Params['getPlainDateTimeFor'][0],
    calendarParam: Params['getPlainDateTimeFor'][1] = ES.GetISO8601Calendar()
  ): Return['getPlainDateTimeFor'] {
    const instant = ES.ToTemporalInstant(instantParam);
    const calendar = ES.ToTemporalCalendar(calendarParam);
    return ES.BuiltinTimeZoneGetPlainDateTimeFor(this, instant, calendar);
  }
  getInstantFor(
    dateTimeParam: Params['getInstantFor'][0],
    optionsParam: Params['getInstantFor'][1] = undefined
  ): Return['getInstantFor'] {
    if (!ES.IsTemporalTimeZone(this)) throw new TypeError('invalid receiver');
    const dateTime = ES.ToTemporalDateTime(dateTimeParam);
    const options = ES.GetOptionsObject(optionsParam);
    const disambiguation = ES.ToTemporalDisambiguation(options);
    return ES.BuiltinTimeZoneGetInstantFor(this, dateTime, disambiguation);
  }
  getPossibleInstantsFor(dateTimeParam: Params['getPossibleInstantsFor'][0]): Return['getPossibleInstantsFor'] {
    if (!ES.IsTemporalTimeZone(this)) throw new TypeError('invalid receiver');
    const dateTime = ES.ToTemporalDateTime(dateTimeParam);
    const Instant = GetIntrinsic('%Temporal.Instant%');
    const id = GetSlot(this, TIMEZONE_ID);

    const offsetNs = ES.ParseOffsetString(id);
    if (offsetNs !== null) {
      const epochNs = ES.GetEpochFromISOParts(
        GetSlot(dateTime, ISO_YEAR),
        GetSlot(dateTime, ISO_MONTH),
        GetSlot(dateTime, ISO_DAY),
        GetSlot(dateTime, ISO_HOUR),
        GetSlot(dateTime, ISO_MINUTE),
        GetSlot(dateTime, ISO_SECOND),
        GetSlot(dateTime, ISO_MILLISECOND),
        GetSlot(dateTime, ISO_MICROSECOND),
        GetSlot(dateTime, ISO_NANOSECOND)
      );
      if (epochNs === null) throw new RangeError('DateTime outside of supported range');
      return [new Instant(epochNs.minus(offsetNs))];
    }

    const possibleEpochNs = ES.GetIANATimeZoneEpochValue(
      id,
      GetSlot(dateTime, ISO_YEAR),
      GetSlot(dateTime, ISO_MONTH),
      GetSlot(dateTime, ISO_DAY),
      GetSlot(dateTime, ISO_HOUR),
      GetSlot(dateTime, ISO_MINUTE),
      GetSlot(dateTime, ISO_SECOND),
      GetSlot(dateTime, ISO_MILLISECOND),
      GetSlot(dateTime, ISO_MICROSECOND),
      GetSlot(dateTime, ISO_NANOSECOND)
    );
    return possibleEpochNs.map((ns) => new Instant(ns));
  }
  getNextTransition(startingPointParam: Params['getNextTransition'][0]): Return['getNextTransition'] {
    if (!ES.IsTemporalTimeZone(this)) throw new TypeError('invalid receiver');
    const startingPoint = ES.ToTemporalInstant(startingPointParam);
    const id = GetSlot(this, TIMEZONE_ID);

    // Offset time zones or UTC have no transitions
    if (ES.ParseOffsetString(id) !== null || id === 'UTC') {
      return null;
    }

    let epochNanoseconds = GetSlot(startingPoint, EPOCHNANOSECONDS);
    const Instant = GetIntrinsic('%Temporal.Instant%');
    epochNanoseconds = ES.GetIANATimeZoneNextTransition(epochNanoseconds, id);
    return epochNanoseconds === null ? null : new Instant(epochNanoseconds);
  }
  getPreviousTransition(startingPointParam: Params['getPreviousTransition'][0]): Return['getPreviousTransition'] {
    if (!ES.IsTemporalTimeZone(this)) throw new TypeError('invalid receiver');
    const startingPoint = ES.ToTemporalInstant(startingPointParam);
    const id = GetSlot(this, TIMEZONE_ID);

    // Offset time zones or UTC have no transitions
    if (ES.ParseOffsetString(id) !== null || id === 'UTC') {
      return null;
    }

    let epochNanoseconds = GetSlot(startingPoint, EPOCHNANOSECONDS);
    const Instant = GetIntrinsic('%Temporal.Instant%');
    epochNanoseconds = ES.GetIANATimeZonePreviousTransition(epochNanoseconds, id);
    return epochNanoseconds === null ? null : new Instant(epochNanoseconds);
  }
  toString(): string {
    if (!ES.IsTemporalTimeZone(this)) throw new TypeError('invalid receiver');
    return ES.ToString(GetSlot(this, TIMEZONE_ID));
  }
  toJSON(): Return['toJSON'] {
    return ES.ToString(this);
  }
  static from(item: Params['from'][0]): Return['from'] {
    return ES.ToTemporalTimeZone(item);
  }
  [Symbol.toStringTag]!: 'Temporal.TimeZone';
}

MakeIntrinsicClass(TimeZone, 'Temporal.TimeZone');
