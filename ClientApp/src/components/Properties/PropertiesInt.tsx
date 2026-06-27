import { JSONIntType } from "@jsonhero/json-infer-types";
import {
  JSONTimestampFormat,
} from "@jsonhero/json-infer-types/lib/formats";
import { formatValue } from "~/utilities/formatter";
import { DataTable } from "../DataTable";
import { ValueIcon } from "../ValueIcon";

export type PropertiesNumberProps = {
  type: JSONIntType;
};

export function PropertiesInt({ type }: { type: JSONIntType }) {
  if (type.format == null) {
    return (
      <DataTable
        rows={[
          {
            key: "Formatted value",
            value: formatValue(type) ?? "",
            icon: <ValueIcon type={type} />,
          },
          {
            key: "Type",
            value: type.name,
          },
        ]}
      />
    );
  }
  switch (type.format.name) {
    case "timestamp":
      return <PropertiesTimestamp value={type.value} format={type.format} />;
    default:
      return <></>;
  }
}

function PropertiesTimestamp({
  value,
  format,
}: {
  value: number;
  format: JSONTimestampFormat;
}) {
  const date =
    format.variant === "millisecondsSinceEpoch"
      ? new Date(value)
      : format.variant === "secondsSinceEpoch"
      ? new Date(value * 1000)
      : new Date(value / 1000000);

  const properties = [
    {
      key: "rfc3339",
      value: date.toISOString(),
    },
    {
      key: "rfc2822",
      value: date.toUTCString(),
    },
    {
      key: "unix",
      value: (date.getTime() / 1000).toFixed(0),
    },
    {
      key: "unix ms",
      value: date.getTime().toString(),
    },
    {
      key: "date",
      value: date.toDateString(),
    },
    {
      key: "time",
      value: date.toTimeString(),
    },
  ];

  return <DataTable rows={properties} />;
}