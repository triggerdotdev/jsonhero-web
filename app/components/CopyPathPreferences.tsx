import { languages, canUseOptChaining } from "~/utilities/programmingLanguages";
import { usePreferences } from "./PreferencesProvider";
import { useState } from "react";

export type CopyPathPreferencesProps = {
  variableName: string;
  onVariableNameChange: (value: string) => void;
  useOptChaining: boolean;
  onUseOptionalChainingChange: (value: boolean) => void;
};

export function CopyPathPreferences({
  variableName,
  onVariableNameChange,
  useOptChaining,
  onUseOptionalChainingChange,
}: CopyPathPreferencesProps) {
  const [preferences, setPreferences] = usePreferences();

  return (
    <div className="p-4 flex flex-col space-y-4">
      <h1 className="text-2xl text-gray-800 dark:text-white">
        Copy Path Preferences
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <label htmlFor="language" className="text-gray-800 dark:text-white">
          Language
        </label>
        <select
          className="py-1 px-2 rounded-md bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:bg-gray-400 hover:dark:bg-gray-700"
          defaultValue={preferences.language}
          onChange={(e) =>
            setPreferences({
              ...preferences,
              language: e.target.value as languages,
            })
          }
        >
          {Object.values(languages).map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
        <label
          htmlFor="variable-name"
          className="text-gray-800 dark:text-white"
        >
          Variable Name
        </label>
        <input
          type="text"
          className="py-1 px-2 rounded-md bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:bg-gray-400 hover:dark:bg-gray-700"
          defaultValue={variableName}
          onChange={(e) => onVariableNameChange(e.target.value)}
        />
        {canUseOptChaining[preferences.language || languages.javascript] && (
          <>
            <label
              htmlFor="use-optional-chaining"
              className="text-gray-800 dark:text-white"
            >
              Use Optional Chaining
            </label>
            <input
              type="checkbox"
              className="rounded-md bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:bg-gray-400 hover:dark:bg-gray-700"
              checked={useOptChaining}
              onChange={(e) => onUseOptionalChainingChange(e.target.checked)}
            />
          </>
        )}
      </div>
    </div>
  );
}
