import { ArrowCircleDownIcon, ExclamationCircleIcon } from "@heroicons/react/outline";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Form, useSubmit } from "remix";
import invariant from "tiny-invariant";

export function DragAndDropForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const filenameInputRef = useRef<HTMLInputElement>(null);
  const rawJsonInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = useSubmit();

  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      setErrorMessage(null);
      
      if (!formRef.current || !filenameInputRef.current) {
        return;
      }

      if (acceptedFiles.length === 0) {
        return;
      }

      const firstFile = acceptedFiles[0];

      const reader = new FileReader();

      reader.onabort = () => {
        console.log("file reading was aborted");
        setErrorMessage("File reading was aborted. Please try again.");
      };
      
      reader.onerror = () => {
        console.log("file reading has failed");
        setErrorMessage("Failed to read the file. Please try again.");
      };
      
      reader.onload = () => {
        if (reader.result == null) {
          setErrorMessage("No file content was read. Please try again.");
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

        try {
          JSON.parse(jsonValue);
          rawJsonInputRef.current.value = jsonValue;
          submit(formRef.current);
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : "Invalid JSON format";
          setErrorMessage(`JSON parsing error: ${errorMsg}`);
        }
      };
      reader.readAsArrayBuffer(firstFile);
      filenameInputRef.current.value = firstFile.name;
    },
    [formRef.current, filenameInputRef.current, rawJsonInputRef.current, submit]
  );

  const onDropRejected = useCallback((fileRejections: any[]) => {
    const rejection = fileRejections[0];
    if (rejection?.errors?.[0]?.code === 'file-too-large') {
      setErrorMessage(`File is too large. Maximum size is 5MB. Your file is ${(rejection.file.size / (1024 * 1024)).toFixed(2)}MB.`);
    } else if (rejection?.errors?.[0]?.code === 'file-invalid-type') {
      setErrorMessage('Please select a valid JSON file.');
    } else {
      setErrorMessage(`File rejected: ${rejection?.errors?.[0]?.message || 'Unknown error'}`);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: onDrop,
    onDropRejected: onDropRejected,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 5,
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
          <div>
            <p className={`${isDragActive ? "text-lime-500" : ""}`}>
              {isDragActive
                ? "Now drop to open it…"
                : "Drop a JSON file here, or click to select"}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Maximum file size: 5MB
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-3 flex items-center rounded-md bg-red-900/20 border border-red-500/30 p-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
            <p className="text-red-300 text-sm">{errorMessage}</p>
          </div>
        )}

        <input type="hidden" name="filename" ref={filenameInputRef} />
        <input type="hidden" name="rawJson" ref={rawJsonInputRef} />
      </div>
    </Form>
  );
}
