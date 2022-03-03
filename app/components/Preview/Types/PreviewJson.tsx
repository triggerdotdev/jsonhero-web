import { CodeViewer } from "~/components/CodeViewer";
import { PreviewBox } from "../PreviewBox";
import { PreviewJson } from "./preview.types";

export function PreviewJson({ preview }: { preview: PreviewJson }) {
  const jsonHeroUrl = new URL(
    `/actions/createFromUrl?jsonUrl=${encodeURIComponent(preview.url)}`,
    window.location.origin
  );

  jsonHeroUrl.searchParams.append("utm_source", "preview");

  return (
    <PreviewBox link={jsonHeroUrl.href}>
      <CodeViewer code={JSON.stringify(preview.json, null, 2)} />
    </PreviewBox>
  );
}
