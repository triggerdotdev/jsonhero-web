import { ClipboardIcon } from "@heroicons/react/outline";
import { useCallback, useState } from "react";
import { CopyText } from "./CopyText";
import { Body } from "./Primitives/Body";

export type CopySingleLineTextButtonProps = {
  value: string;
  className?: string;
};

export function CopySingleLineTextButton({ value, className }: CopySingleLineTextButtonProps) {
  const [copied, setCopied] = useState(false);
  const onCopied = useCallback(() => {
    setCopied(true);
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 1500);
  }, [value]);
  return (
    <CopyText className={`${className}`} value={value} onCopied={onCopied}>
      {copied ? (
        <Body>Copied!</Body>
      ) : (
        <div className="flex items-center">
          <ClipboardIcon className="h-4 w-4 mr-[2px]" />
          <Body>Copy As Single Line</Body>
        </div>
      )}
    </CopyText>
  );
}
