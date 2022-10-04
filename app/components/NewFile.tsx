import { DragAndDropForm } from "./DragAndDropForm";
import { Title } from "./Primitives/Title";
import { SampleUrls } from "./SampleUrls";
import { UrlForm } from "./UrlForm";
import { JsonFormResponse } from "~/routes";
import { useEffect, useState } from "react";
import { Alert } from "~/components/UI/Alert";
import { Body } from "~/components/Primitives/Body";

export function NewFile({formResponse}: { formResponse: JsonFormResponse }) {
  const [showAlert, setShowAlert] = useState(formResponse.malformedError);

  useEffect(() => setShowAlert(formResponse.malformedError), [formResponse.key, formResponse.malformedError]);

  return (
    <div className="flex flex-col gap-4">
      <UrlForm/>
      <DragAndDropForm/>
      {showAlert && (
        <Alert onDismiss={() => setShowAlert(false)}>
          <Body>
            Submitted JSON is malformed. Please check your JSON and try again.
          </Body>
        </Alert>
      )}
      <div className="pt-5">
        <Title className="mb-2 text-slate-200">No JSON? Try it out:</Title>
        <SampleUrls/>
      </div>
    </div>
  );
}
