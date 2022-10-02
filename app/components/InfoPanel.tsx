import { PreviewValue } from "./Preview/PreviewValue";
import { RelatedValues } from "./RelatedValues";
import { PropertiesValue } from "./Properties/PropertiesValue";
import { InfoHeader } from "./InfoHeader";
import { ContainerInfo } from "./ContainerInfo";
import { useSelectedInfo } from "~/hooks/useSelectedInfo";
import { useRelatedPaths } from "~/hooks/useRelatedPaths";
import { useJsonDoc } from "~/hooks/useJsonDoc";

export function InfoPanel() {
  const { minimal } = useJsonDoc();
  const selectedInfo = useSelectedInfo();
  const relatedPaths = useRelatedPaths();

  if (!selectedInfo) {
    return <></>;
  }

  return (
    <>
      <div
        className={`${
          minimal ? "h-inspectorHeightMinimal" : "h-inspectorHeight"
        } p-4 bg-white border-l-[1px] border-slate-300 overflow-y-auto no-scrollbar transition dark:bg-slate-800 dark:border-slate-600`}
      >
        <InfoHeader relatedPaths={relatedPaths} />

        <div className="mb-4">
          <PreviewValue />
        </div>
        <PropertiesValue />

        <ContainerInfo />

        <RelatedValues relatedPaths={relatedPaths} />
      </div>
    </>
  );
}
