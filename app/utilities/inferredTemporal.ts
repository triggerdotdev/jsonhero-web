import { Temporal } from "@js-temporal/polyfill";
import { JSONDateTimeFormat } from "@jsonhero/json-infer-types";

export type InferredTemporal =
  | Temporal.Instant
  | Temporal.ZonedDateTime
  | Temporal.PlainDateTime
  | Temporal.PlainDate
  | Temporal.PlainTime;

export function inferTemporal(
  value: string,
  format: JSONDateTimeFormat
): InferredTemporal | undefined {
  if (format.variant === "rfc2822") {
    return;
  }

  try {
    switch (format.parts) {
      case "datetime": {
        if (format.extensions && format.extensions.includes("timezone")) {
          return Temporal.ZonedDateTime.from(value);
        }

        try {
          return Temporal.Instant.from(value);
        } catch {
          return Temporal.PlainDateTime.from(value);
        }
      }
      case "date": {
        try {
          return Temporal.Instant.from(value);
        } catch {
          return Temporal.PlainDate.from(value);
        }
      }
      case "time": {
        try {
          return Temporal.Instant.from(value);
        } catch {
          return Temporal.PlainTime.from(value);
        }
      }
    }
  } catch (e) {
    console.error(e);

    return;
  }
}
