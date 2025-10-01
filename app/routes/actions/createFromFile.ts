import { ActionFunction, redirect } from "remix";
import invariant from "tiny-invariant";
import { sendEvent } from "~/graphJSON.server";
import { createFromRawJson } from "~/jsonDoc.server";
import {
  commitSession,
  getSession,
  setErrorMessage,
} from "../../services/toast.server";

type CreateFromFileError = {
  filename?: boolean;
  rawJson?: boolean;
};

export const action: ActionFunction = async ({ request, context }) => {
  const formData = await request.formData();
  const toastCookie = await getSession(request.headers.get("cookie"));
  const filename = formData.get("filename");
  const rawJson = formData.get("rawJson");

  const errors: CreateFromFileError = {};

  if (!filename) errors.filename = true;
  if (!rawJson) errors.rawJson = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof filename === "string", "filename must be a string");
  invariant(typeof rawJson === "string", "rawJson must be a string");

  try {
    const doc = await createFromRawJson(filename, rawJson);

    const url = new URL(request.url);

    context.waitUntil(
      sendEvent({
        type: "create",
        from: "file",
        id: doc.id,
        source: url.searchParams.get("utm_source") ?? url.hostname,
      })
    );

    return redirect(`/j/${doc.id}`);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("JSON")) {
        setErrorMessage(
          toastCookie,
          "Invalid JSON format",
          "The file contains invalid JSON. Please check the file and try again."
        );
      } else if (error.message.includes("too large") || error.message.includes("size")) {
        setErrorMessage(
          toastCookie,
          "File too large",
          "The JSON file is too large to process. Please try a smaller file."
        );
      } else {
        setErrorMessage(
          toastCookie,
          "Processing error",
          "Failed to process the JSON file. Please try again."
        );
      }
    } else {
      setErrorMessage(
        toastCookie,
        "Unknown error",
        "An unexpected error occurred while processing the file."
      );
    }

    return redirect("/", {
      headers: { "Set-Cookie": await commitSession(toastCookie) },
    });
  }
};
