import { DragAndDropForm } from "./DragAndDropForm";
import { UrlForm } from "./UrlForm";

export function NewDocument() {
  return (
    <div className="bg-indigo-700 text-white rounded-sm shadow-md w-80 max-w-max p-3 transition">
      <div className="flex flex-col">
        <UrlForm className="mb-2" />
        <DragAndDropForm />
      </div>
    </div>
  );
}
