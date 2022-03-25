import { useJson } from "./useJson";
import Fuse from "fuse.js";
import { JsonSearchEntry } from "~/utilities/search";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";

export type InitializeIndexEvent = {
  type: "initialize-index";
  payload: { json: unknown; fuseOptions: Fuse.IFuseOptions<JsonSearchEntry> };
};

export type SearchEvent = {
  type: "search";
  payload: { query: string };
};

export type SearchSendWorkerEvent = InitializeIndexEvent | SearchEvent;

export type IndexInitializedEvent = {
  type: "index-initialized";
};

export type SearchResultsEvent = {
  type: "search-results";
  payload: { results: Fuse.FuseResult<JsonSearchEntry>[] };
};

export type SearchReceiveWorkerEvent =
  | IndexInitializedEvent
  | SearchResultsEvent;

export type JsonSearchApi = {
  search: (query: string) => void;
};

const JsonSearchStateContext = createContext<JsonSearchState>(
  {} as JsonSearchState
);

const JsonSearchApiContext = createContext<JsonSearchApi>({} as JsonSearchApi);

export type JsonSearchState = {
  status: "initializing" | "idle" | "searching";
  query?: string;
  results?: Fuse.FuseResult<JsonSearchEntry>[];
};

type SearchAction = {
  type: "search";
  payload: { query: string };
};

type JsonSearchAction = SearchReceiveWorkerEvent | SearchAction;

function reducer(
  state: JsonSearchState,
  action: JsonSearchAction
): JsonSearchState {
  switch (action.type) {
    case "index-initialized":
      return {
        ...state,
        status: "idle",
        results: undefined,
      };
    case "search-results":
      return {
        ...state,
        status: "idle",
        results: action.payload.results,
      };
    case "search":
      return {
        ...state,
        status: "searching",
        query: action.payload.query,
      };
    default:
      return state;
  }
}

export function JsonSearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [json] = useJson();

  const [state, dispatch] = useReducer<
    React.Reducer<JsonSearchState, JsonSearchAction>
  >(reducer, { status: "initializing" });

  const search = useCallback(
    (query: string) => {
      dispatch({ type: "search", payload: { query } });
    },
    [dispatch]
  );

  const handleWorkerMessage = useCallback(
    (e: MessageEvent<SearchReceiveWorkerEvent>) => dispatch(e.data),
    [dispatch]
  );

  const workerRef = useRef<Worker | null>();

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.Worker === "undefined") {
      return;
    }

    if (workerRef.current) {
      return;
    }

    const worker = new Worker("/entry.worker.js");
    worker.onmessage = handleWorkerMessage;

    workerRef.current = worker;

    workerRef.current.postMessage({
      type: "initialize-index",
      payload: {
        json,
        fuseOptions: {
          includeScore: true,
          includeMatches: true,
          minMatchCharLength: 1,
          isCaseSensitive: false,
          threshold: 0.6,
          distance: 200,
        },
      },
    });
  }, [json, workerRef.current]);

  useEffect(() => {
    if (state.status !== "searching") {
      return;
    }

    workerRef.current?.postMessage({
      type: "search",
      payload: { query: state.query },
    });
  }, [state.status, workerRef.current]);

  return (
    <JsonSearchStateContext.Provider value={state}>
      <JsonSearchApiContext.Provider value={{ search }}>
        {children}
      </JsonSearchApiContext.Provider>
    </JsonSearchStateContext.Provider>
  );
}

export function useJsonSearchState(): JsonSearchState {
  return useContext(JsonSearchStateContext);
}

export function useJsonSearchApi(): JsonSearchApi {
  return useContext(JsonSearchApiContext);
}
