import {
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  PencilAltIcon,
  CheckIcon,
} from "@heroicons/react/outline";
import { ColumnViewNode } from "~/useColumnView";
import { Body } from "./Primitives/Body";
import {
  useJsonColumnViewAPI,
  useJsonColumnViewState,
} from "../hooks/useJsonColumnView";
import { useHotkeys } from "react-hotkeys-hook";
import { memo, useEffect, useRef, useState } from "react";
import { useJson } from '~/hooks/useJson';
import { JSONHeroPath } from '@jsonhero/path';

export function PathBar() {
  const [isEditable, setIsEditable] = useState(false);
  const { selectedNodes, highlightedNodeId } = useJsonColumnViewState();
  const { goToNodeId } = useJsonColumnViewAPI();
  const [json] = useJson();

  if (isEditable) {
    return (
      <PathBarText
        selectedNodes={selectedNodes}
        onConfirm={(newPath) => {
          setIsEditable(false);
          const heroPath = new JSONHeroPath(newPath);
          const node = heroPath.first(json);
          if (node) {
            goToNodeId(newPath, 'pathBar');
          }
        }}
      />
    );
  }

  return (
    <PathBarLink
      selectedNodes={selectedNodes}
      highlightedNodeId={highlightedNodeId}
      enableEdit={() => setIsEditable(true)}
    />
  );
}

export function PathBarText({ selectedNodes, onConfirm }: { selectedNodes: ColumnViewNode[], onConfirm: (newPath: string) => void; }) {
  const [path, setPath] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPath(selectedNodes.at(-1)?.id || '');
  }, [selectedNodes]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  return (
    <form
      onSubmit={(e) => {
        onConfirm(path);
        e.preventDefault();
      }}
      // onBlur={() => onConfirm(path)}
      className="flex overflow-x-hidden items-center bg-slate-300 dark:bg-slate-700 rounded-sm"
    >
      <label className="grow">
        <input
          ref={ref}
          className={
            "w-full border-none outline-none text-ellipsis text-base px-2 py-0 rounded-sm bg-transparent dark:text-slate-200"
          }
          style={{ boxShadow: 'none' }}
          type="text"
          name="title"
          spellCheck="false"
          placeholder="Name your JSON file"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
      </label>
      <button type="submit" className="flex ml-auto justify-center items-center w-[26px] h-[26px] hover:bg-slate-400 dark:text-slate-400 dark:hover:bg-white dark:hover:bg-opacity-[10%]">
        <CheckIcon className='h-5' />
      </button>
    </form>
  );
}

export type PathBarLinkProps = {
  selectedNodes: ColumnViewNode[];
  highlightedNodeId?: string;
  enableEdit: () => void;
};

export function PathBarLink({
  selectedNodes,
  highlightedNodeId,
  enableEdit,
}: PathBarLinkProps) {
  const { goToNodeId } = useJsonColumnViewAPI();

  return (
    <div
      className="flex flex-shrink-0 flex-grow-0 overflow-x-hidden"
      onClick={(event) => {
        if (event.detail == 2) {
          enableEdit();
        }
      }}
    >
      {selectedNodes.map((node, index) => {
        return (
          <PathBarItem
            key={index}
            node={node}
            isHighlighted={highlightedNodeId === node.id}
            onClick={(id) => goToNodeId(id, "pathBar")}
            isLast={index == selectedNodes.length - 1}
          />
        );
      })}
      <button
        className="flex ml-auto justify-center items-center w-[26px] h-[26px] hover:bg-slate-300 dark:text-slate-400 dark:hover:bg-white dark:hover:bg-opacity-[10%]"
        onClick={enableEdit}>
        <PencilAltIcon className='h-5' />
      </button>
    </div>
  );
}

export function PathHistoryControls() {
  const { canGoBack, canGoForward } = useJsonColumnViewState();
  const { goBack, goForward } = useJsonColumnViewAPI();

  useHotkeys(
    "[",
    () => {
      goBack();
    },
    [goBack]
  );

  useHotkeys(
    "]",
    () => {
      goForward();
    },
    [goForward]
  );

  return (
    <div className="flex h-full">
      <button
        className="flex justify-center items-center w-[26px] h-[26px] disabled:text-slate-400 disabled:text-opacity-50 text-slate-700 hover:bg-slate-300 hover:disabled:bg-transparent rounded-sm transition dark:disabled:text-slate-700 dark:text-slate-400 dark:hover:bg-white dark:hover:bg-opacity-[5%] dark:hover:disabled:bg-transparent"
        disabled={!canGoBack}
        onClick={goBack}
      >
        <ArrowLeftIcon className="w-5 h-6" />
      </button>
      <button
        className="flex justify-center items-center w-[26px] h-[26px] disabled:text-slate-400 disabled:text-opacity-50 text-slate-700 hover:bg-slate-300 hover:disabled:bg-transparent rounded-sm transition dark:disabled:text-slate-700 dark:text-slate-400 dark:hover:bg-white dark:hover:bg-opacity-[5%] dark:hover:disabled:bg-transparent"
        disabled={!canGoForward}
        onClick={goForward}
      >
        <ArrowRightIcon className="w-5 h-6" />
      </button>
    </div>
  );
}

function PathBarElement({
  node,
  isHighlighted,
  onClick,
  isLast,
}: {
  node: ColumnViewNode;
  isHighlighted: boolean;
  onClick?: (id: string) => void;
  isLast: boolean;
}) {
  return (
    <div
      className="flex items-center min-w-0"
      style={{
        flexShrink: 1,
      }}
    >
      <div
        className={`flex items-center hover:cursor-pointer min-w-0 transition ${isHighlighted
          ? "text-slate-700 bg-slate-300 px-2 py-[3px] rounded-sm dark:text-white dark:bg-slate-700"
          : "hover:bg-slate-300 px-2 py-[3px] rounded-sm transition dark:hover:bg-white dark:hover:bg-opacity-[5%]"
          }`}
        style={{
          flexShrink: 1,
        }}
        onClick={() => onClick && onClick(node.id)}
      >
        <div className="w-4 flex-shrink-[0.5] flex-grow-0 flex-col justify-items-center whitespace-nowrap overflow-x-hidden transition dark:text-slate-400">
          {node.icon && <node.icon className="h-3 w-3" />}
        </div>
        <Body className="flex-shrink flex-grow-0 whitespace-nowrap overflow-x-hidden text-ellipsis transition dark:text-slate-400">
          {node.title}
        </Body>
      </div>

      {isLast ? (
        <></>
      ) : (
        <ChevronRightIcon className="flex-grow-0 flex-shrink-[0.5] w-4 h-4 text-slate-400 whitespace-nowrap overflow-x-hidden" />
      )}
    </div>
  );
}

const PathBarItem = memo(PathBarElement);
