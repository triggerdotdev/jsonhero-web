import { ClipboardIcon, CogIcon } from "@heroicons/react/outline";
import { useCallback, useState } from "react";
import { CopyText } from "./CopyText";
import { Body } from "./Primitives/Body";
import { Dialog, DialogTrigger, DialogContent } from "./UI/Dialog";
import { PathComponent } from '@jsonhero/path'
import { getPathValue, languages } from "~/utilities/programmingLanguages";
import classnames from "~/utilities/classnames";
import { CopyPathPreferences } from "./CopyPathPreferences";
import { usePreferences } from "./PreferencesProvider";

export type CopyPathButtonProps = {
  heroPathComponents: PathComponent[];
  className?: string;
};

export function CopyPathButton({ heroPathComponents, className }: CopyPathButtonProps) {
  const [copied, setCopied] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [preferences] = usePreferences()
  const [variableName, setVariableName] = useState("");
  const [useOptChaining, setUseOptionalChaining] = useState(false);

  const onCopied = useCallback(() => {
    setCopied(true);
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 1500);
  }, [heroPathComponents]);
  return (
    <>
    <CopyText className={className} value={getPathValue(preferences?.language || languages.javascript, variableName, useOptChaining, heroPathComponents)} onCopied={onCopied}>
      {copied ? (
        <Body>Copied!</Body>
      ) : (
        <div className="flex items-center">
          <ClipboardIcon className="h-4 w-4 mr-[2px]" />
          <Body>Copy Path</Body>
        </div>
      )}
    </CopyText>
    <Dialog open={settingsOpen}>
      <DialogTrigger  
        className="focus:outline-none focus-visible:outline-none" 
        onClick={() => setSettingsOpen(true)}
      >
        <div className={`${className}`}>
          <div className="flex items-center">
            <CogIcon className="h-4 w-4 -mr-[2px] mt-px"/>
            <Body>&nbsp;</Body>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent
        onOverlayClick={() => setSettingsOpen(false)}
        className={classnames(
          "fixed z-50",
          "w-[95vw] max-w-2xl rounded-lg",
          "top-0 left-[50%] -translate-x-[50%]",
          "mt-[60px]",
          "bg-white border-[1px] border-slate-500 dark:border-slate-700 dark:bg-slate-800"
        )}
      >
        <CopyPathPreferences 
          variableName={variableName} 
          onVariableNameChange={setVariableName}
          useOptChaining={useOptChaining} 
          onUseOptionalChainingChange={setUseOptionalChaining}
        />
      </DialogContent>
    </Dialog>
    </>
  );
}
