/// <reference lib="WebWorker" />

import Fuse from "fuse.js";
import { createSearchIndex, JsonSearchEntry } from "./utilities/search";

type SearchWorker = {
  entries?: Array<JsonSearchEntry>;
  index?: Fuse.FuseIndex<JsonSearchEntry>;
  fuse?: Fuse<JsonSearchEntry>;
};

export type {};
declare let self: DedicatedWorkerGlobalScope & SearchWorker;

type InitializeIndexEvent = {
  type: "initialize-index";
  payload: { json: unknown; fuseOptions: Fuse.IFuseOptions<JsonSearchEntry> };
};

type SearchEvent = {
  type: "search";
  payload: { query: string };
};

type SearchWorkerEvent = InitializeIndexEvent | SearchEvent;

self.onmessage = (e: MessageEvent<SearchWorkerEvent>) => {
  const { type, payload } = e.data;

  console.group(`SearchWorker: ${type}`);
  console.log(payload);

  switch (type) {
    case "initialize-index": {
      const { json, fuseOptions } = payload;

      const [index, entries] = createSearchIndex(json);

      self.entries = entries;
      self.index = index;
      self.fuse = new Fuse(entries, fuseOptions, index);

      self.postMessage({ type: "index-initialized" });

      break;
    }
    case "search": {
      const { query } = payload;

      if (!self.fuse) {
        throw new Error("Search index not initialized");
      }

      const results = self.fuse.search(query);

      console.log("results", results);

      self.postMessage({ type: "search-results", payload: { results, query } });
    }
  }

  console.groupEnd();
};
