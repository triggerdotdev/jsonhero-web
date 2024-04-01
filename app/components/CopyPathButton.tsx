import { ClipboardIcon } from "@heroicons/react/outline";
import { useCallback, useState } from "react";
import { CopyText } from "./CopyText";
import { Body } from "./Primitives/Body";
import { PathComponent } from '@jsonhero/path'
import { get_path_value, languages } from "~/utilities/programmingLanguages";

export type CopyPathButtonProps = {
  heroPathComponents: PathComponent[];
  className?: string;
};

export function CopyPathButton({ heroPathComponents, className }: CopyPathButtonProps) {
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState(languages.javascript)
  const onCopied = useCallback(() => {
    setCopied(true);
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 1500);
  }, [heroPathComponents]);
  return (
    <CopyText className={`${className}`} value={get_path_value(language, heroPathComponents)} onCopied={onCopied}>
      {copied ? (
        <Body>Copied!</Body>
      ) : (
        <div className="flex items-center">
          <ClipboardIcon className="h-4 w-4 mr-[2px]" />
          <Body>Copy Path</Body>
        </div>
      )}
    </CopyText>
  );
}
