import { PencilAltIcon } from "@heroicons/react/outline";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFetcher } from "remix";
import { match } from "ts-pattern";
import { useJsonDoc } from "~/hooks/useJsonDoc";

export function DocumentTitle() {
  const { doc } = useJsonDoc();
  const [editedTitle, setEditedTitle] = useState(doc.title);
  const updateDoc = useFetcher();
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (updateDoc.type === "done" && updateDoc.data.title) {
      ref.current?.blur();
    }
  }, [updateDoc]);

  const startEditing = useCallback(() => {
    ref.current?.select();
    ref.current?.focus();
  }, [ref.current]);

  return (
    <updateDoc.Form method="post" action={`/actions/${doc.id}/update`}>
      <div
        className="flex justify-center items-center w-full"
        title={doc.title}
      >
        <input
          ref={ref}
          className={
            "min-w-[15vw] border-none text-center text-ellipsis text-slate-300 px-2 pl-3 py-1 rounded-sm bg-transparent placeholder:text-slate-400 focus:bg-black focus:bg-opacity-30 focus:outline-none focus:border-none hover:bg-black hover:bg-opacity-30 hover:cursor-text transition dark:bg-transparent dark:text-slate-200 dark:placeholder:text-slate-400 dark:focus:bg-black dark:focus:bg-opacity-10 dark:hover:bg-black dark:hover:bg-opacity-10"
          }
          type="text"
          name="title"
          spellCheck="false"
          placeholder="Name your JSON file"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />

        {match(editedTitle)
          .with(doc.title, () => (
            <PencilAltIcon
              className="h-5 w-5 text-black text-opacity-50"
              onClick={startEditing}
            />
          ))
          .with("", () => (
            <button
              className="ml-2 text-lime-500 hover:text-lime-600 transition"
              onClick={() => setEditedTitle(doc.title)}
            >
              Reset
            </button>
          ))
          .otherwise(() => (
            <button
              type="submit"
              className="ml-2 text-lime-500 hover:text-lime-600 transition"
            >
              Save
            </button>
          ))}
      </div>
    </updateDoc.Form>
  );
}
