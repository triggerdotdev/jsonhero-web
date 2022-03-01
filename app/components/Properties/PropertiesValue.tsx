import { useSelectedInfo } from "~/hooks/useSelectedInfo";
import { PropertiesNumber } from "./PropertiesNumber";
import { PropertiesString } from "./PropertiesString";

export function PropertiesValue() {
  const info = useSelectedInfo();

  if (!info) {
    return <></>;
  }

  switch (info.name) {
    case "float":
    case "int":
      return <PropertiesNumber type={info} />;
    case "string":
      return <PropertiesString type={info} />;
    default:
      return <></>;
  }
}
