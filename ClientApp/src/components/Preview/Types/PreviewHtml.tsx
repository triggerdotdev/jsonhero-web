import { Body } from "~/components/Primitives/Body";
import { Title } from "~/components/Primitives/Title";
import { PreviewBox } from "../PreviewBox";
import { PreviewHtml } from "./preview.types";

export type PreviewHtmlProps = {
  info: PreviewHtml;
};

export function PreviewHtml({ info }: PreviewHtmlProps) {
  return (
    <PreviewBox link={info.url}>
      <div>
        {info.title && (
          <Title>
            {info.icon && (
              <img src={info.icon.url} className="w-4 h-4 inline mr-1" alt="" />
            )}
            <span className="inline">{info.title}</span>
          </Title>
        )}
        {info.description && <Body>{info.description}</Body>}
      </div>
      {info.image && (
        <div>
          <img className="block" src={info.image?.url} alt={info.image?.alt} />
        </div>
      )}
    </PreviewBox>
  );
}
