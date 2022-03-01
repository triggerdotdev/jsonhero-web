import { useSelectedInfo } from "~/hooks/useSelectedInfo";
import { PreviewString } from "./Types/PreviewString";

export function PreviewValue() {
  const info = useSelectedInfo();

  if (!info) {
    return <></>;
  }

  switch (info.name) {
    case "string":
      return <PreviewString info={info} />;
    default:
      return <></>;
  }
}
