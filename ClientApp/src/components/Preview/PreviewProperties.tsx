import { Body } from "../Primitives/Body";

export type PreviewPropertyProps = {
  properties: Array<PreviewProperty>;
};

export type PreviewProperty = {
  key: string;
  title: string;
  icon?: JSX.Element;
};

export function PreviewProperties({ properties }: PreviewPropertyProps) {
  return (
    <div className="-mb-1">
      {properties.map((property) => {
        return (
          <Body
            className="text-slate-500 mr-2 inline-flex items-center"
            key={property.key}
          >
            {property.icon && (
              <span className="w-4 h-4 inline-block text-slate-500 mr-1 flex-none">
                {property.icon}
              </span>
            )}
            <span>{property.title}</span>
          </Body>
        );
      })}
    </div>
  );
}
