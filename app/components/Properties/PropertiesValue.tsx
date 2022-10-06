import { useSelectedInfo } from "~/hooks/useSelectedInfo";
import { PropertiesInt } from "./PropertiesInt";
import { PropertiesFloat } from "./PropertiesFloat";
import { PropertiesString } from "./PropertiesString";

export function PropertiesValue() {
  const info = useSelectedInfo();

  if (!info) {
    return <></>;
  }

  switch (info.name) {
    case "float":
      return <PropertiesFloat type={info} />;
    case "int":
      return <PropertiesInt type={info} />;
    case "string":
      return <PropertiesString type={info} />;
    default:
      return <></>;
  }
}
