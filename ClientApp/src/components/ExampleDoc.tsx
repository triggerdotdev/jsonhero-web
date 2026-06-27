import { Link } from "remix";

export function ExampleDoc({
  id,
  title,
  path,
}: {
  id: string;
  title: string;
  path?: string;
}) {
  return (
    <Link
      to={`/j/${id}${path ? `?path=${path}` : ""}`}
      className="bg-slate-900 px-4 py-2 rounded-md whitespace-nowrap text-lime-300 transition hover:text-lime-500"
    >
      {title}
    </Link>
  );
}
