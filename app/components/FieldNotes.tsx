import { Title } from "./Primitives/Title";
import { useState, useEffect } from "react";
import { useJsonColumnViewState } from "~/hooks/useJsonColumnView";

let notes: Record<string, string> = {};

export function FieldNotes() {

  const [note, setNote] = useState("");

  function getSelectedNodeId(): string {
    const { selectedNodeId } = useJsonColumnViewState();
    if (!selectedNodeId) {
      return "defaultNodeId";
    }
    return selectedNodeId;
  }

  const selectedNodeId: string = getSelectedNodeId();

  useEffect(() => {
    console.log("New node selected!!!!");
    setNote(notes[selectedNodeId] || "");
  }, [selectedNodeId]);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    notes[selectedNodeId] = event.target.value;
    console.log(notes);
    setNote(event.target.value);
  }

  return (
    <div className="my-4">
      <Title className="mb-2 text-slate-700 transition dark:text-slate-400">
        Notes
      </Title>

      <textarea
        value={note}
        onChange={handleChange}
        className="w-full h-48 px-3 py-2 text-base placeholder-gray-600 border text-white bg-slate-900 border-slate-600 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
        style={{resize: "none"}}
        placeholder="Add some notes here... (not saved across refreshes or between devices)"
      />
    </div>
  );
}