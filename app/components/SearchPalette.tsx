import { useJsonSearchApi, useJsonSearchState } from "~/hooks/useJsonSearch";

export function SearchPalette() {
  const searchState = useJsonSearchState();
  const searchApi = useJsonSearchApi();

  return (
    <div>
      <label>Search json</label>
      <div>
        <input
          type="text"
          value={searchState.query ?? ""}
          onChange={(e) => searchApi.search(e.currentTarget.value)}
        />
      </div>
      <ul>
        {searchState.results?.map((result) => (
          <li key={result.item.path}>
            [{result.item.path}] {result.item.formattedValue}
            {" - "}
            {result.item.rawValue}
          </li>
        ))}
      </ul>
    </div>
  );
}
