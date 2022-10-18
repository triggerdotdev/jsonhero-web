import {
  ArrowRightIcon,
  CalendarIcon,
  EyeIcon,
  ThumbUpIcon,
} from "@heroicons/react/outline";
import { inferType } from "@jsonhero/json-infer-types";
import { Body } from "~/components/Primitives/Body";
import { Title } from "~/components/Primitives/Title";
import { formatNumber, formatValue } from "~/utilities/formatter";
import { PreviewBox } from "../PreviewBox";
import { PreviewProperties, PreviewProperty } from "../PreviewProperties";
import { PreviewHtml } from "./preview.types";
import { RetweetIcon } from "./RetweetIcon";

export type PreviewHtmlProps = {
  info: PreviewHtml;
};

export function PreviewHtml({ info }: PreviewHtmlProps) {
  const formatDate = (dateString: string): string => {
    return formatValue(inferType(dateString)) ?? dateString;
  };

  const details = () => {
    if (!info.details) {
      return <></>;
    }

    switch (info.details.type) {
      case "youtube": {
        const properties: Array<PreviewProperty> = [
          {
            key: "likeCount",
            title: formatNumber(info.details.likeCount),
            icon: <ThumbUpIcon />,
          },
          {
            key: "viewCount",
            title: formatNumber(info.details.viewCount),
            icon: <EyeIcon />,
          },
          {
            key: "date",
            title: formatDate(info.details.publishedAt),
            icon: <CalendarIcon />,
          },
        ];
        return <PreviewProperties properties={properties} />;
      }
      case "twitter": {
        const properties: Array<PreviewProperty> = [
          {
            key: "likeCount",
            title: formatNumber(info.details.likesCount),
            icon: <ThumbUpIcon />,
          },
          {
            key: "retweetCount",
            title: formatNumber(info.details.retweetCount),
            icon: <RetweetIcon />,
          },
          {
            key: "date",
            title: formatDate(info.details.publishedAt),
            icon: <CalendarIcon />,
          },
        ];
        return <PreviewProperties properties={properties} />;
      }
    }

    return <></>;
  };

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
          <img className="block" src={info.image?.url} alt="" />
        </div>
      )}
      {details()}
    </PreviewBox>
  );
}
