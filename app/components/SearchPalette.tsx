import { useJsonSearchApi, useJsonSearchState } from "~/hooks/useJsonSearch";
import {
  ChevronRightIcon,
  ExclamationIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { EscapeKeyIcon } from "./Icons/EscapeKeyIcon";
import { ArrowKeysUpDownIcon } from "./Icons/ArrowKeysUpDownIcon";
import { LoadingIcon } from "./Icons/LoadingIcon";
import { Body } from "./Primitives/Body";
import { ShortcutIcon } from "./Icons/ShortcutIcon";
import { Mono } from "./Primitives/Mono";
import {
  useCombobox,
  UseComboboxState,
  UseComboboxStateChangeOptions,
} from "downshift";
import {
  getComponentSlices,
  getStringSlices,
  JsonSearchEntry,
} from "~/utilities/search";
import Fuse from "fuse.js";
import classnames from "~/utilities/classnames";
import { iconForValue } from "~/utilities/icons";
import { useRef, useCallback } from "react";
import { useVirtual } from "react-virtual";
import { sortedLastIndex, truncate } from "lodash-es";
import { JSONHeroPath } from "@jsonhero/path";
import { useHotkeys } from "react-hotkeys-hook";
import { useJson } from "~/hooks/useJson";

export function SearchPalette({
  onSelect,
  onClose,
}: {
  onSelect?: (entry: JsonSearchEntry) => void;
  onClose?: () => void;
}) {
  const searchState = useJsonSearchState();
  const searchApi = useJsonSearchApi();

  useHotkeys(
    "esc",
    (e) => {
      e.preventDefault();
      searchApi.reset();
      onClose?.();
    },
    [onClose]
  );

  const listRef = useRef<HTMLElement>(null);

  const rowVirtualizer = useVirtual({
    size: (searchState.results ?? []).length,
    parentRef: listRef,
    estimateSize: useCallback(() => 70, []),
    overscan: 6,
  });

  function comboboxReducer(
    state: UseComboboxState<Fuse.FuseResult<JsonSearchEntry>>,
    actionAndChanges: UseComboboxStateChangeOptions<
      Fuse.FuseResult<JsonSearchEntry>
    >
  ): Partial<UseComboboxState<Fuse.FuseResult<JsonSearchEntry>>> {
    const { changes, ...action } = actionAndChanges;

    // Don't update the input field when selecting an item
    switch (action.type) {
      case useCombobox.stateChangeTypes.ItemClick:
      case useCombobox.stateChangeTypes.InputKeyDownEnter: {
        return {
          ...changes,
          inputValue: state.inputValue,
        };
      }
      default:
        return changes;
    }
  }

  const cb = useCombobox({
    items: searchState.results ?? [],
    stateReducer: comboboxReducer,
    circularNavigation: false,
    scrollIntoView: () => {},
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        onSelect?.(selectedItem.item);
        searchApi.reset();
      }
    },
    onHighlightedIndexChange: ({ highlightedIndex }) =>
      highlightedIndex && rowVirtualizer.scrollToIndex(highlightedIndex),
    onInputValueChange: ({ inputValue }) =>
      inputValue ? searchApi.search(inputValue) : searchApi.reset(),
  });

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape" && onClose && cb.inputValue.length === 0) {
        searchApi.reset();
        onClose?.();
      }
    },
    [onClose, cb.inputValue]
  );

  return (
    <>
      <div
        {...cb.getComboboxProps()}
        className="max-h-[60vh] px-4 pt-4 overflow-hidden"
      >
        <label
          {...cb.getLabelProps()}
          className="relative text-slate-400 focus-within:text-slate-600 block"
        >
          <SearchIcon className="absolute w-7 h-7 top-1/2 transform -translate-y-1/2 left-3 text-slate-700 transition dark:text-white pointer-events-none" />
          <input
            {...cb.getInputProps({ onKeyDown: handleInputKeyDown })}
            type="text"
            placeholder="Search the JSON…"
            className="w-full pl-12 pr-4 py-4 rounded-sm text-slate-900 bg-slate-100 text-2xl caret-indigo-700 border-indigo-700 transition dark:text-white dark:bg-slate-900 focus:outline-none focus:ring focus:ring-indigo-700"
          />
        </label>
        <div className="flex flex-col mt-4 mb-2">
          <div className="results flex">
            {searchState.status !== "idle" &&
              (!searchState.results || searchState.results.length === 0) && (
                <div className="results-loading flex">
                  <LoadingIcon className="animate-spin h-5 w-5 mr-1"></LoadingIcon>
                  <Body className="text-slate-400">Loading…</Body>
                </div>
              )}
            {searchState.results && searchState.results.length > 0 && (
              <div className="results-returned">
                <Body className="text-slate-400">
                  {searchState.results.length === 1
                    ? "1 result"
                    : `${searchState.results.length} results`}
                </Body>
              </div>
            )}
            {searchState.status === "idle" &&
              searchState.query &&
              searchState.query.length > 1 &&
              (!searchState.results || searchState.results.length === 0) && (
                <div className="results-none flex">
                  <ExclamationIcon className="h-5 w-5 mr-1 text-white"></ExclamationIcon>
                  <Body className="text-slate-400">
                    No results for "{cb.inputValue}"
                  </Body>
                </div>
              )}
          </div>
        </div>
        <ul
          {...cb.getMenuProps({ ref: listRef })}
          className="w-full max-h-[calc(60vh-120px)] overflow-y-auto relative"
        >
          <li
            key="total-size"
            style={{ height: rowVirtualizer.totalSize }}
            className="mb-[1rem]"
          />
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const result = (searchState.results ?? [])[virtualRow.index];

            return (
              <SearchItem
                key={result.item.path}
                itemProps={cb.getItemProps({
                  item: result,
                  index: virtualRow.index,
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: virtualRow.size,
                    transform: `translateY(${virtualRow.start}px)`,
                  },
                })}
                result={result}
                isHighlighted={virtualRow.index === cb.highlightedIndex}
              />
            );
          })}
        </ul>
      </div>
      <div className="flex items-center w-full gap-4 px-3 py-2 border-t-[1px] bg-slate-100 border-slate-200 rounded-br-lg rounded-bl-lg transition dark:bg-slate-900 dark:border-slate-700">
        <div className="flex items-center gap-1">
          <ShortcutIcon className="w-4 h-4 text-sm text-slate-900 bg-slate-300 transition duration-75 group-hover:bg-slate-100 dark:bg-slate-500 dark:group-hover:bg-slate-600">
            ⏎
          </ShortcutIcon>
          <Body className="text-slate-700 dakr:text-slate-500">to select</Body>
        </div>
        <div className="flex items-center gap-1">
          <ArrowKeysUpDownIcon className="transition text-slate-300 dark:text-slate-500" />
          <Body className="text-slate-700 dakr:text-slate-500">
            to navigate
          </Body>
        </div>
        <div className="flex items-center gap-1">
          <EscapeKeyIcon className="transition text-slate-300 dark:text-slate-500" />
          <Body className="text-slate-700 dakr:text-slate-500">to close</Body>
        </div>
      </div>
    </>
  );
}

type SearchItemProps = {
  itemProps: React.HTMLAttributes<HTMLLIElement>;
  result: Fuse.FuseResult<JsonSearchEntry>;
  isHighlighted: boolean;
};

export function SearchItem({
  itemProps,
  result,
  isHighlighted,
}: SearchItemProps) {
  const heroPath = new JSONHeroPath(result.item.path);
  const [json] = useJson();

  const itemValue = heroPath.first(json);
  const ItemIcon = iconForValue(itemValue);

  return (
    <li
      {...itemProps}
      className={classnames("flex w-full hover:cursor-pointer")}
    >
      <div
        className={classnames(
          "w-full h-[calc(100%-4px)] mb-2 rounded-sm group",
          isHighlighted ? "bg-indigo-700" : "bg-slate-100 dark:bg-slate-900"
        )}
      >
        <div className="flex items-center w-full p-2 pl-4 pr-3">
          <ItemIcon
            className={classnames(
              "h-6 w-6",
              isHighlighted
                ? "text-white"
                : "text-slate-500 dark:text-slate-400"
            )}
          ></ItemIcon>
          <div className="flex flex-col ml-3">
            <div className="flex w-full items-center">
              <SearchPathResult
                path={heroPath}
                searchResult={result}
                isHighlighted={isHighlighted}
              />
            </div>
            <div className="key-value flex justify-between">
              {result.item.rawValue && (
                <SearchResultValue
                  isHighlighted={isHighlighted}
                  keyName="rawValue"
                  stringValue={result.item.rawValue}
                  searchResult={result}
                />
              )}
              {result.item.formattedValue &&
                result.item.formattedValue !== result.item.rawValue && (
                  <SearchResultValue
                    isHighlighted={isHighlighted}
                    keyName="formattedValue"
                    stringValue={result.item.formattedValue}
                    searchResult={result}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

// Outputs the following pair for each component except for the last one:
// <Body className="text-lg">{component}</Body>,
// <ChevronRightIcon className="w-4 h-4" />,
//
// Highlights parts of the component that match the search query.
// The match indices match against the stringified version of the path (e.g. $.foo.bar.0.details.description)
//
// If combined component strings are too long, then we need to choose some components to hide behind an ellipsis, making sure we don't hide matches
function SearchPathResult({
  path,
  searchResult,
  isHighlighted,
  maxWeight = 90,
}: {
  path: JSONHeroPath;
  isHighlighted: boolean;
  searchResult: Fuse.FuseResult<JsonSearchEntry>;
  maxWeight?: number;
}) {
  const components = path.components.slice(1);

  const match = (searchResult.matches ?? []).find(
    (match) => match.key === "path" && match.indices.length > 0
  );

  const matchingIndices = (match?.indices ?? []) as [number, number][];

  const displayPath = components.join(".");

  const slices = getComponentSlices(
    displayPath,
    matchingIndices.map(([start, end]) => [start - 2, end - 2]),
    maxWeight
  );

  return (
    <>
      {slices.map((slice, i) =>
        slice.type === "component" ? (
          <span
            key={i}
            className={
              slice.slice.isMatch
                ? classnames(
                    "font-sans text-xl",
                    isHighlighted
                      ? "text-white underline underline-offset-1"
                      : "text-indigo-600 dark:text-indigo-400"
                  )
                : classnames(
                    "font-sans text-xl",
                    isHighlighted
                      ? "text-white"
                      : "text-slate-800 dark:text-white"
                  )
            }
          >
            {slice.slice.slice}
          </span>
        ) : slice.type === "ellipsis" ? (
          <Body key={i} className="text-lg mx-1">
            …
          </Body>
        ) : (
          <ChevronRightIcon
            key={i}
            className={classnames(
              "w-4 h-4 mx-1",
              isHighlighted ? "text-white" : "text-slate-800 dark:text-white"
            )}
          />
        )
      )}
    </>
  );
}

function SearchResultValue({
  isHighlighted,
  keyName,
  stringValue,
  searchResult,
}: {
  isHighlighted: boolean;
  keyName: string;
  stringValue: string;
  searchResult: Fuse.FuseResult<JsonSearchEntry>;
}) {
  const match = (searchResult.matches ?? []).find(
    (match) => match.key === keyName
  );

  const output = createOutputForMatch(stringValue, isHighlighted, match);

  return (
    <Mono
      className={classnames(
        "",
        isHighlighted ? "text-white" : "text-slate-600 dark:text-slate-500"
      )}
    >
      {output}
    </Mono>
  );
}

function createOutputForMatch(
  stringValue: string,
  isHighlighted: boolean,
  match?: Fuse.FuseResultMatch,
  maxLength: number = 68
): JSX.Element {
  if (!match) {
    return <>{truncate(stringValue, { length: maxLength })}</>;
  }

  const stringSlices = getStringSlices(stringValue, match.indices, maxLength);

  return (
    <>
      {stringSlices.map((s, index) => {
        return (
          <span
            key={index}
            className={
              s.isMatch
                ? classnames(
                    "",
                    isHighlighted
                      ? "text-white underline underline-offset-1"
                      : "text-indigo-600 dark:text-indigo-400"
                  )
                : ""
            }
          >
            {s.slice}
          </span>
        );
      })}
    </>
  );
}
