import { ArrowCircleDownIcon } from "@heroicons/react/outline";
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Form, useSubmit } from "remix";
import invariant from "tiny-invariant";

export function DragAndDropForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const filenameInputRef = useRef<HTMLInputElement>(null);
  const rawJsonInputRef = useRef<HTMLInputElement>(null);

  const submit = useSubmit();

  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      if (!formRef.current || !filenameInputRef.current) {
        return;
      }

      if (acceptedFiles.length === 0) {
        return;
      }

      const firstFile = acceptedFiles[0];

      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        if (reader.result == null) {
          return;
        }

        let jsonValue: string | undefined = undefined;

        if (typeof reader.result === "string") {
          jsonValue = reader.result;
        } else {
          const decoder = new TextDecoder("utf-8");
          jsonValue = decoder.decode(reader.result);
        }

        invariant(rawJsonInputRef.current, "rawJsonInputRef is null");
        invariant(jsonValue, "jsonValue is undefined");

        rawJsonInputRef.current.value = jsonValue;

        submit(formRef.current);
      };
      reader.readAsArrayBuffer(firstFile);
      filenameInputRef.current.value = firstFile.name;
    },
    [formRef.current, filenameInputRef.current, rawJsonInputRef.current]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: onDrop,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 1,
    multiple: false,
    accept: "application/json",
  });

  return (
    <Form method="post" action="/actions/createFromFile" ref={formRef}>
      <div
        {...getRootProps()}
        className="block min-w-[300px] cursor-pointer rounded-md border-2 border-dashed border-slate-600 bg-slate-900/40 p-4 text-base text-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
      >
        <input {...getInputProps()} />
        <div className="flex items-center">
          <ArrowCircleDownIcon
            className={`mr-3 inline h-6 w-6 ${
              isDragActive ? "text-lime-500" : ""
            }`}
          />
          <p className={`${isDragActive ? "text-lime-500" : ""}`}>
            {isDragActive
              ? "Now drop to open it…"
              : "Drop a JSON file here, or click to select"}
          </p>
        </div>

        <input type="hidden" name="filename" ref={filenameInputRef} />
        <input type="hidden" name="rawJson" ref={rawJsonInputRef} />
      </div>
    </Form>
  );
}
