import { IconComponent } from "~/useColumnView";
import { Body } from "../Primitives/Body";
import { Title } from "../Primitives/Title";

export type HomeGridFeatureItemProps = {
  icon: IconComponent;
  title: string;
  className?: string;
  titleClassName?: string;
  children: React.ReactNode;
};

export function HomeGridFeatureItem(props: HomeGridFeatureItemProps) {
  return (
    <div className="flex lg:basis-1/4 basis-1 md:basis-1/4 flex-grow flex-col p-6 rounded-sm bg-white bg-opacity-[7%]">
      <props.icon className="w-10 h-10 min-h-[44px] text-indigo-700 mb-3" />
      <Title className={props.titleClassName}>{props.title}</Title>
      {props.children}
    </div>
  );
}
