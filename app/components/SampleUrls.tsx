import { ExampleUrl } from "./ExampleUrl";

export function SampleUrls() {
  return (
    <div className="flex justify-start flex-wrap gap-2">
      <ExampleUrl
        url="https://gist.githubusercontent.com/ericallam/332aca65c34dbc0fdb1b3cffbdf3f7a4/raw/4c6e264c3afd3432b608bad628290a7d71035253/unsplash.json"
        title="Unsplash API Example"
        displayTitle="Unsplash API"
      />

      <ExampleUrl
        url="https://gist.githubusercontent.com/ericallam/77e37e93e370b32387ce8d598dd06fc8/raw/9306a2c039fc27ab42bdadb80cbd6dbca49d27ec/tweet.json"
        title="Tweet API Example"
        displayTitle="Tweet JSON"
      />

      <ExampleUrl
        url="https://gist.githubusercontent.com/ericallam/f11f4981adf72b0427427c349afb3a09/raw/37eee4234b628f3278c9d4f644fee4a1c4987593/Airtable.json"
        title="Airtable Product Catalog"
        displayTitle="Airtable API"
      />

      <ExampleUrl
        url="https://gist.githubusercontent.com/ericallam/51b77c0051c21a34ea33d601bb0b1bef/raw/0b099f7d3bb5fe47f1fd55007d6a5fe9c5fd046b/GitHub.json"
        title="List of Github Repos"
        displayTitle="Github API"
      />
    </div>
  );
}
