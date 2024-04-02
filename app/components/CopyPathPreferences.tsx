import { languages } from "~/utilities/programmingLanguages"
import { usePreferences } from "./PreferencesProvider"
import { Body } from "./Primitives/Body";
import { useState } from "react";

export type CopyPathPreferencesProps = {
  variableName: string;
  onVariableNameChange: (value: string) => void;
  useOptChaining: boolean;
  onUseOptionalChainingChange: (value: boolean) => void;
}

export function CopyPathPreferences({variableName, onVariableNameChange, useOptChaining, onUseOptionalChainingChange}: CopyPathPreferencesProps) {
  const [preferences, setPreferences] = usePreferences();

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <label
            className="pr-2 text-slate-800 transition dark:text-white"
            htmlFor="language"
          >
            <Body>Language</Body>
          </label>
          <select
            className="py-0 pr-0 pl-1 w-9 rounded-sm text-sm h-[23px] bg-slate-300 transition hover:bg-slate-400 hover:bg-opacity-50 dark:bg-slate-800 dark:text-slate-400 hover:cursor-pointer hover:dark:bg-slate-700 hover:dark:bg-opacity-70"
            defaultValue={preferences.language}
            onChange={(e) => setPreferences({...preferences, language: e.target.value as languages})}
          >
            {Object.values(languages).map(language => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
      </div>
      <div className="flex items-center">
        <label
            className="pr-2 text-slate-800 transition dark:text-white"
            htmlFor="variable-name"
          >
            <Body>Variable Name</Body>
          </label>
          <input
            type="text"
            className="py-0 pr-0 pl-1 w-9 rounded-sm text-sm h-[23px] bg-slate-300 transition hover:bg-slate-400 hover:bg-opacity-50 dark:bg-slate-800 dark:text-slate-400 hover:cursor-pointer hover:dark:bg-slate-700 hover:dark:bg-opacity-70"
            defaultValue={variableName}
            onChange={(e) => onVariableNameChange(e.target.value)}
          />
      </div>
      <div className="flex items-center">
        <label
            className="pr-2 text-slate-800 transition dark:text-white"
            htmlFor="use-optional-chaining"
          >
            <Body>Use Optional Chaining</Body>
          </label>
          <input
            type="checkbox"
            className="py-0 pr-0 pl-1 w-9 rounded-sm text-sm h-[23px] bg-slate-300 transition hover:bg-slate-400 hover:bg-opacity-50 dark:bg-slate-800 dark:text-slate-400 hover:cursor-pointer hover:dark:bg-slate-700 hover:dark:bg-opacity-70"
            checked={useOptChaining}
            onChange={(e) => onUseOptionalChainingChange(e.target.checked)}
          />
      </div>
  </div>)
}