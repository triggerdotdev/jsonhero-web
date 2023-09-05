import { Title } from "./Primitives/Title";
import { useState } from "react";

export function FieldNotes() {

  const [value, setValue] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
  }

  return (
    <div className="my-4">
      <Title className="mb-2 text-slate-700 transition dark:text-slate-400">
        Notes
      </Title>

      <textarea
        value={value}
        onChange={handleChange}
        className="w-full h-48 px-3 py-2 text-base placeholder-gray-600 border text-white bg-slate-900 border-slate-600 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
        style={{resize: "none"}}
        placeholder="Add some notes here... (not saved across refreshes or between devices)"
      />
    </div>
  );
}
 
