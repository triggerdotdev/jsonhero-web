import { ExampleDoc } from "./ExampleDoc";

export function SampleUrls() {
  return (
    <div className="flex justify-start flex-wrap gap-2">
      <ExampleDoc
        id="d9udW60cLOok"
        title="Tweet JSON"
        path="data.0.entities.urls.0.expanded_url"
      />
      <ExampleDoc id="PjHo1o5MVeH4" title="Github API" />
      <ExampleDoc
        id="XKqIsPgCssUN"
        title="Airtable API"
        path="records.3.createdTime"
      />
      <ExampleDoc
        id="bSc7r1Ta0fED"
        title="Unsplash API"
        path="4.urls.regular"
      />
    </div>
  );
}
