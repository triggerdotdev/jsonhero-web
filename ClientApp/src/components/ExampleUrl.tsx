import { Form } from "remix";

export function ExampleUrl({
  url,
  title,
  displayTitle,
}: {
  url: string;
  title: string;
  displayTitle?: string;
}) {
  return (
    <Form
      method="post"
      action="/actions/createFromUrl?utm_source=example_url"
      reloadDocument
    >
      <input type="hidden" name="jsonUrl" value={url} />
      <input type="hidden" name="title" value={title} />
      <button
        type="submit"
        className="bg-slate-900 px-4 py-2 rounded-md whitespace-nowrap text-lime-300 transition hover:text-lime-500"
      >
        {displayTitle ?? title}
      </button>
    </Form>
  );
}
