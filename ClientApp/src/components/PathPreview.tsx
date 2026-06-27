import { ChevronRightIcon, EyeIcon } from "@heroicons/react/outline";
import { useMemo } from "react";
import { useJsonColumnViewAPI } from "~/hooks/useJsonColumnView";
import { ColumnViewNode, IconComponent } from "~/useColumnView";
import { Body } from "./Primitives/Body";

import eyeIcon from "~/assets/svgs/EyeIcon.svg";

export type PathPreviewProps = {
  nodes: ColumnViewNode[];
  maxComponents?: number;
  enabled?: boolean;
};

type ValueComponent = {
  type: "value";
  id: string;
  title: string;
  icon?: IconComponent;
};

type EllipsisComponent = {
  type: "ellipsis";
  id: "ellipsis";
};

type Component = ValueComponent | EllipsisComponent;

export function PathPreview({
  nodes,
  maxComponents,
  enabled,
}: PathPreviewProps) {
  const isEnabled = useMemo(() => {
    if (enabled === undefined) {
      return true;
    }
    return enabled;
  }, [enabled]);

  const { goToNodeId } = useJsonColumnViewAPI();

  const components = useMemo<Array<Component>>(() => {
    if (maxComponents == null || nodes.length <= maxComponents) {
      return nodes.map((n) => {
        return { type: "value", id: n.id, title: n.title, icon: n.icon };
      });
    }

    let components = Array<Component>();

    //add the elements up to the ellipsis
    for (let index = 0; index < maxComponents - 1; index++) {
      const node = nodes[index];
      components.push({
        type: "value",
        id: node.id,
        title: node.title,
        icon: node.icon,
      });
    }

    //add ellipsis
    components.push({ type: "ellipsis", id: "ellipsis" });

    //add final element
    const lastNode = nodes[nodes.length - 1];
    components.push({
      type: "value",
      id: lastNode.id,
      title: lastNode.title,
      icon: lastNode.icon,
    });

    return components;
  }, [nodes, maxComponents]);

  return (
    <div
      className={`flex select-none pl-7 ${
        isEnabled
          ? `relative transition hover:bg-slate-200 hover:cursor-pointer dark:hover:bg-slate-600 after:transition after:absolute after:h-3 after:w-3 after:opacity-0 hover:after:opacity-100 after:top-1 after:left-1 after:content-[''] after:bg-[url('${eyeIcon}')] after:bg-no-repeat`
          : "disabled"
      }`}
      onClick={() =>
        isEnabled &&
        goToNodeId(components[components.length - 1].id, "relatedValues")
      }
    >
      <div
        className={`flex rounded-sm px-2 ${
          isEnabled
            ? ""
            : "hover:bg-slate-100 hover:cursor-pointer dark:hover:bg-slate-600"
        }`}
      >
        {components.map((node, index) => {
          if (node.type === "ellipsis") {
            return (
              <div
                key={node.id}
                className="flex flex-none items-center min-w-0"
              >
                <div className="flex-none text-md">…</div>
                <ChevronRightIcon className="flex-none w-4 h-4 text-slate-400 whitespace-nowrap overflow-x-hidden" />
              </div>
            );
          } else {
            return (
              <div className="flex items-center min-w-0" key={node.id}>
                <div className="flex items-center min-w-0">
                  <div className="w-4 flex-shrink-[0.5] flex-grow-0 flex-col justify-items-center whitespace-nowrap overflow-x-hidden transition dark:text-slate-300">
                    {node.icon && <node.icon className="h-3 w-3" />}
                  </div>
                  <Body className="flex-shrink flex-grow-0 whitespace-nowrap overflow-x-hidden text-ellipsis transition dark:text-slate-300">
                    {node.title}
                  </Body>
                </div>

                {index == components.length - 1 ? (
                  <></>
                ) : (
                  <ChevronRightIcon className="flex-grow-0 flex-shrink-[0.5] w-4 h-4 text-slate-400 whitespace-nowrap overflow-x-hidden" />
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
