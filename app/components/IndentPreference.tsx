import React from "react";
import { Body } from "./Primitives/Body";
import { usePreferences } from "~/components/PreferencesProvider";

const MIN_INDENT = 1;
const MAX_INDENT = 8;

export function IndentPreference() {
  const [preferences, setPreferences] = usePreferences();

  const updatePreferences = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newIdent = Number(e.target.value);
    if (newIdent < MIN_INDENT) newIdent = MIN_INDENT;
    if (newIdent > MAX_INDENT) newIdent = MAX_INDENT;
    e.target.value = newIdent.toString();
    setPreferences({ ...preferences, indent: newIdent });
  };

  return (
    <div className="flex items-center -mt-0.5">
      <label
        className="pr-2 text-slate-800 transition dark:text-white"
        htmlFor="indent"
      >
        <Body>Indent</Body>
      </label>
      <input
        type="number"
        className="py-0 pr-0 pl-1 w-9 rounded-sm text-sm h-[23px] bg-slate-300 transition hover:bg-slate-400 hover:bg-opacity-50 dark:bg-slate-800 dark:text-slate-400 hover:cursor-pointer hover:dark:bg-slate-700 hover:dark:bg-opacity-70"
        defaultValue={preferences?.indent}
        min={MIN_INDENT}
        max={MAX_INDENT}
        onChange={updatePreferences}
      />
    </div>
  );
}
