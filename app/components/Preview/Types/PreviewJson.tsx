import { CodeViewer } from "~/components/CodeViewer";
import { CopyText } from "~/components/CopyText";
import { OpenInNewWindow } from "~/components/OpenInWindow";
import { Body } from "~/components/Primitives/Body";
import { PreviewBox } from "../PreviewBox";
import { PreviewJson } from "./preview.types";

export function PreviewJson({ preview }: { preview: PreviewJson }) {
  const jsonHeroUrl = new URL(
    `/actions/createFromUrl?jsonUrl=${encodeURIComponent(preview.url)}`,
    window.location.origin
  );

  jsonHeroUrl.searchParams.append("utm_source", "preview");

  const code = JSON.stringify(preview.json, null, 2);

  return (
    <PreviewBox className="relative">
      <div className="absolute flex justify-end pt-1 pr-1 z-10 h-full w-full opacity-0 hover:opacity-100 transition">
        <CopyText
          value={code}
          className="bg-slate-700 h-fit mr-1 px-2 rounded-sm"
        >
          <Body>Copy</Body>
        </CopyText>
        <OpenInNewWindow
          url={jsonHeroUrl.href}
          className="bg-slate-700 h-fit px-2 rounded-sm"
        >
          <Body>Open in tab</Body>
        </OpenInNewWindow>
      </div>
      <CodeViewer code={code} />
    </PreviewBox>
  );
}
