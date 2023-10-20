import { Title } from "./Primitives/Title";
import { Body } from "./Primitives/Body";
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
    setNote(notes[selectedNodeId] || "");
  }, [selectedNodeId]);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    notes[selectedNodeId] = event.target.value;
    setNote(event.target.value);
  }

  function exportNotes() {
    const jsonData = JSON.stringify(notes);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "jsonheroSavedNotes.json";
    link.click();

    URL.revokeObjectURL(url);
  }

  function importNotes() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (!files || files.length === 0) {
        return;
      }
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (!result) {
          return;
        }
        notes = JSON.parse(result as string);
        console.log(notes[selectedNodeId] || "");
        setNote(notes[selectedNodeId] || "");
      };
      reader.readAsText(file);
    };
    input.click();
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

      {/* Notes exporting */}
      <div className="flex flex-row bg-slate-700 text-white rounded focus:outline-none focus:shadow-outline w-fit">
        <div className="px-1 my-1 border-r-slate-800 border-r-2">
          <button className="p-1 hover:bg-slate-600"
            onClick={exportNotes}
          >
            <Body>Export Notes</Body>
          </button>
        </div>

        <button className="p-1 m-1 hover:bg-slate-600"
          onClick={importNotes}
        >
          <Body>Import Notes</Body>
        </button>

        
      </div>
    </div>
  );
}