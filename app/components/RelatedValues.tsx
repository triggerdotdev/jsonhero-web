import { useMemo, useState } from "react";
import { Title } from "~/components/Primitives/Title";
import { useJson } from "../hooks/useJson";
import { Mono } from "./Primitives/Mono";
import { SmallBody } from "./Primitives/SmallBody";
import { generateNodesToPath } from "~/utilities/jsonColumnView";
import { useJsonColumnViewState } from "../hooks/useJsonColumnView";
import {
  RelatedValuesGroup,
  groupRelatedValues,
} from "~/utilities/relatedValues";
import { PathPreview } from "./PathPreview";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/outline";

export type RelatedValuesProps = {
  relatedPaths: string[];
};

export function RelatedValues({ relatedPaths }: RelatedValuesProps) {
  const [json] = useJson();
  const { selectedNodeId } = useJsonColumnViewState();
  const [openId, setOpenId] = useState<string | null>(null);

  const relatedValuesGroups = useMemo<Array<RelatedValuesGroup>>(() => {
    if (!selectedNodeId) {
      return [];
    }
    return groupRelatedValues(relatedPaths, json);
  }, [json, relatedPaths]);

  const toggleOpen = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <>
      {relatedValuesGroups.length > 0 && (
        <div className="my-4">
          <Title className="mb-2 text-slate-700 transition dark:text-slate-400">
            Related values
          </Title>
          {relatedValuesGroups.map((relatedValuesGroup, i) => {
            return (
              <RelatedValuesGroupItem
                group={relatedValuesGroup}
                key={relatedValuesGroup.value}
                isOpen={relatedValuesGroup.value === openId}
                toggleOpen={() => toggleOpen(relatedValuesGroup.value)}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

function RelatedValuesGroupItem({
  group,
  isOpen,
  toggleOpen,
}: {
  group: RelatedValuesGroup;
  isOpen: boolean;
  toggleOpen: () => void;
}) {
  const isLinkable = group.value !== "undefined";
  const isHighlighted = group.value === "undefined" || group.value === "null";

  return (
    <div className="mb-1 transition dark:text-slate-300">
      <div
        className={`flex rounded-sm transition hover:cursor-pointer ${
          isOpen
            ? "bg-slate-200 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-700"
            : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700"
        }`}
        onClick={() => toggleOpen()}
      >
        <div className="flex items-center rounded-sm px-1 bg-slate-200 dark:bg-slate-700">
          {isOpen ? (
            <ChevronDownIcon className="w-3 h-3" />
          ) : (
            <ChevronRightIcon className="w-3 h-3" />
          )}
          <SmallBody className="ml-1">{group.paths.length}</SmallBody>
        </div>
        <Mono
          className={`truncate px-2 text-slate-700 dark:text-slate-200 ${
            isHighlighted ? "italic" : ""
          }`}
        >
          {group.value}
        </Mono>
      </div>
      {isOpen &&
        group.paths.map((path) => {
          return (
            <div
              className="p-0.5 bg-slate-100 dark:bg-slate-700 dark:bg-opacity-60"
              key={path}
            >
              <PathLink path={path} enabled={isLinkable} />
            </div>
          );
        })}
    </div>
  );
}

function PathLink({ path, enabled }: { path: string; enabled: boolean }) {
  const [json] = useJson();

  const selectedNodes = useMemo(() => {
    return generateNodesToPath(json, path);
  }, [json, path]);

  return (
    <PathPreview nodes={selectedNodes} maxComponents={4} enabled={enabled} />
  );
}
