import { Temporal } from "@js-temporal/polyfill";
import { JSONDateTimeFormat, JSONStringType } from "@jsonhero/json-infer-types";
import { useMemo } from "react";
import { inferTemporal } from "~/utilities/inferredTemporal";
import { CalendarMonth } from "../CalendarMonth";

export type PreviewDateProps = {
  value: string;
  format: JSONDateTimeFormat;
};

export function PreviewDate({ value, format }: PreviewDateProps) {
  const temporal = inferTemporal(value, format);

  if (!temporal) {
    return <></>;
  }

  // Can only convert to the legacy Date class if temporal is either a ZonedDateTime or an Instant
  if ("epochMilliseconds" in temporal) {
    const date = new Date(temporal.epochMilliseconds);

    return <CalendarMonth date={date} />;
  } else if (temporal instanceof Temporal.PlainDate) {
    const date = new Date(temporal.year, temporal.month - 1, temporal.day);

    return <CalendarMonth date={date} />;
  } else if (temporal instanceof Temporal.PlainDateTime) {
    const date = new Date(
      temporal.year,
      temporal.month - 1,
      temporal.day,
      temporal.hour,
      temporal.minute,
      temporal.second,
      temporal.millisecond
    );

    return <CalendarMonth date={date} />;
  } else {
    return <></>;
  }
}
