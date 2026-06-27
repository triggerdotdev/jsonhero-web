import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from 'react';

interface Preferences {
  indent: number;
}

const PreferencesDefaults: Preferences = {
  indent: 2,
};

type PreferencesContextType = [
  Preferences | undefined,
  Dispatch<SetStateAction<Preferences | undefined>>
];

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

const loadPreferences = (): Preferences => {
  const savedPreferences = localStorage.getItem('preferences');
  const parsedPreferences = JSON.parse(savedPreferences || '{}');
  for (const [key, value] of Object.entries(PreferencesDefaults)) {
    if (!parsedPreferences[key]) parsedPreferences[key] = value;
  }
  return parsedPreferences;
};
const savePreferences = (preferences: Preferences) => localStorage.setItem('preferences', JSON.stringify(preferences));

export function PreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [preferences, setPreferences] = useState<Preferences>();

  useEffect(() => {
    const preferences = loadPreferences();
    setPreferences(preferences);
  }, []);

  useEffect(() => {
    if (preferences === undefined) return;
    savePreferences(preferences);
  }, [preferences]);

  return (
    <PreferencesContext.Provider value={[preferences, setPreferences]}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}