import { JSONStringType, JSONURIFormat } from "@jsonhero/json-infer-types";
import {
  JSONColorFormat,
  JSONDateTimeFormat,
  JSONJWTStringFormat,
  JSONTimestampFormat,
} from "@jsonhero/json-infer-types/lib/formats";
import Color from "color";
import { DataTableRow, DataTable } from "../DataTable";

export type PropertiesStringProps = {
  type: JSONStringType;
};

export function PropertiesString({ type }: { type: JSONStringType }) {
  if (type.format == null) {
    return <></>;
  }

  switch (type.format.name) {
    case "uri":
      return <PropertiesUri value={type.value} format={type.format} />;
    case "color":
      return <PropertiesColor value={type.value} format={type.format} />;
    case "datetime":
      return <PropertiesDateTime value={type.value} format={type.format} />;
    case "timestamp":
      return <PropertiesTimestamp value={type.value} format={type.format} />;
    case "jwt":
      return <PropertiesJwt value={type.value} format={type.format} />;
    default:
      return <></>;
  }
}

import jwtDecode from "jwt-decode";
import { inferTemporal } from "~/utilities/inferredTemporal";

function PropertiesJwt({
  value,
  format,
}: {
  value: string;
  format: JSONJWTStringFormat;
}) {
  const properties: DataTableRow[] = [];

  const decodedPayload = jwtDecode(value) as Record<string, any>;

  for (const [key, value] of Object.entries(decodedPayload)) {
    properties.push({
      key: key,
      value,
    });
  }

  const decodedHeader = jwtDecode(value, { header: true }) as Record<
    string,
    any
  >;

  for (const [key, value] of Object.entries(decodedHeader)) {
    properties.push({
      key: key,
      value,
    });
  }

  return <DataTable rows={properties} />;
}

function PropertiesTimestamp({
  value,
  format,
}: {
  value: string;
  format: JSONTimestampFormat;
}) {
  const date =
    format.variant === "millisecondsSinceEpoch"
      ? new Date(parseInt(value))
      : format.variant === "secondsSinceEpoch"
      ? new Date(parseInt(value) * 1000)
      : new Date(parseInt(value) / 1000000);

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

function PropertiesDateTime({
  value,
  format,
}: {
  value: string;
  format: JSONDateTimeFormat;
}) {
  if (format.parts === "time") {
    return <></>;
  }

  const temporal = inferTemporal(value, format);

  if (!temporal) {
    return <></>;
  }

  const properties = [
    {
      key: "rfc3339",
      value: temporal.toString(),
    },
    // {
    //   key: "unix",
    //   value: (date.getTime() / 1000).toFixed(0),
    // },
    // {
    //   key: "unix ms",
    //   value: date.getTime().toString(),
    // },
    // {
    //   key: "date",
    //   value: date.toDateString(),
    // },
    // {
    //   key: "time",
    //   value: date.toTimeString(),
    // },
  ];

  if ("epochSeconds" in temporal) {
    properties.push({
      key: "unix",
      value: temporal.epochSeconds.toString(),
    });
  }

  if ("epochMilliseconds" in temporal) {
    properties.push({
      key: "unix ms",
      value: temporal.epochMilliseconds.toString(),
    });
  }

  properties.push({
    key: "date",
    value: temporal.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  });

  return <DataTable rows={properties} />;
}

function PropertiesColor({
  value,
  format,
}: {
  value: string;
  format: JSONColorFormat;
}) {
  const color = new Color(value);

  const properties = [
    {
      key: "hex",
      value: color.hex(),
    },
    {
      key: "rgb",
      value: color.rgb().string(),
    },
    {
      key: "hsl",
      value: color.hsl().string(),
    },
    {
      key: "luminosity",
      value: color.luminosity().toFixed(4),
    },
    {
      key: "contrastRatio",
      value: color.isLight() ? "light" : "dark",
    },
  ];

  return <DataTable rows={properties} />;
}

function PropertiesUri({
  value,
  format,
}: {
  value: string;
  format: JSONURIFormat;
}) {
  let uri = new URL(value);

  let standardProperties: DataTableRow[] = [
    {
      key: "href",
      value: uri.href,
    },
    {
      key: "origin",
      value: uri.origin,
    },
    {
      key: "protocol",
      value: uri.protocol,
    },
    {
      key: "hostname",
      value: uri.hostname,
    },
    {
      key: "pathname",
      value: uri.pathname,
    },
  ];

  if (uri.search) {
    standardProperties.push({
      key: "search",
      value: uri.search,
    });
  }

  if (uri.hash) {
    standardProperties.push({
      key: "hash",
      value: uri.hash,
    });
  }

  if (format.contentType != null) {
    standardProperties.push({
      key: "mimeType",
      value: format.contentType,
    });
  }

  return <DataTable rows={standardProperties} />;
}
