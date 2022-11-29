import { ExampleDoc } from "./ExampleDoc";
import { ExampleUrl } from "./ExampleUrl";

export function SampleUrls() {
  return (
    <div className="flex justify-start flex-wrap gap-2">
      <ExampleDoc
        id="d9udW60cLOok"
        title="Tweet JSON"
        path="data.0.entities.urls.0.expanded_url"
      />
      <ExampleDoc id="PjHo1o5MVeH4" title="Github API" />
    </div>
  );
}
