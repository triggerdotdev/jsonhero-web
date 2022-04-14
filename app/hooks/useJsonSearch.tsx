import { useJson } from "./useJson";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";

import { SearchResult } from "@jsonhero/fuzzy-json-search";

export type InitializeIndexEvent = {
  type: "initialize-index";
  payload: { json: unknown };
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
  payload: { results: Array<SearchResult<string>>; query: string };
};

export type SearchReceiveWorkerEvent =
  | IndexInitializedEvent
  | SearchResultsEvent;

export type JsonSearchApi = {
  search: (query: string) => void;
  reset: () => void;
};

const JsonSearchStateContext = createContext<JsonSearchState>(
  {} as JsonSearchState
);

const JsonSearchApiContext = createContext<JsonSearchApi>({} as JsonSearchApi);

export type JsonSearchState = {
  status: "initializing" | "idle" | "searching";
  query?: string;
  results?: Array<SearchResult<string>>;
};

type SearchAction = {
  type: "search";
  payload: { query: string };
};

type ResetAction = {
  type: "reset";
};

type JsonSearchAction = SearchReceiveWorkerEvent | SearchAction | ResetAction;

function reducer(
  state: JsonSearchState,
  action: JsonSearchAction
): JsonSearchState {
  switch (state.status) {
    case "initializing": {
      if (action.type === "index-initialized") {
        return {
          ...state,
          status: "idle",
          results: undefined,
        };
      }

      return state;
    }
    case "idle": {
      if (action.type === "reset") {
        return {
          ...state,
          query: undefined,
          results: undefined,
        };
      }

      if (action.type === "search") {
        return {
          ...state,
          status: "searching",
          query: action.payload.query,
        };
      }

      return state;
    }
    case "searching": {
      if (action.type === "reset") {
        return {
          ...state,
          status: "idle",
          query: undefined,
          results: undefined,
        };
      }

      if (
        action.type === "search-results" &&
        state.query === action.payload.query
      ) {
        return {
          ...state,
          status: "idle",
          results: action.payload.results,
        };
      }

      return state;
    }
  }
}

let lastAction: any | undefined;

function wrapReducer<S, A extends { type: string }>(
  name: string,
  reducer: React.Reducer<S, A>
): React.Reducer<S, A> {
  return (state, action) => {
    const next = reducer(state, action);

    if (process.env.NODE_ENV !== "production") {
      if (!lastAction) {
        console.groupCollapsed(
          `%cAction: %c${
            name + " " + action.type
          } %cat ${getCurrentTimeFormatted()}`,
          "color: lightgreen; font-weight: bold;",
          "color: white; font-weight: bold;",
          "color: lightblue; font-weight: lighter;"
        );
        console.log(
          "%cPrevious State:",
          "color: #9E9E9E; font-weight: 700;",
          state
        );
        console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
        console.log("%cNext State:", "color: #47B04B; font-weight: 700;", next);
        console.groupEnd();
        lastAction = action;
      } else {
        lastAction = undefined;
      }
    }

    return next;
  };
}

const getCurrentTimeFormatted = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const milliseconds = currentTime.getMilliseconds();
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export function JsonSearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [json] = useJson();

  const [state, dispatch] = useReducer<
    React.Reducer<JsonSearchState, JsonSearchAction>
  >(wrapReducer("jsonSearch", reducer), { status: "initializing" });

  const search = useCallback(
    (query: string) => {
      dispatch({ type: "search", payload: { query } });
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    dispatch({ type: "reset" });
  }, [dispatch]);

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
      <JsonSearchApiContext.Provider value={{ search, reset }}>
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
