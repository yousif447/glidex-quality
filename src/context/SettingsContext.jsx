"use client";
import { createContext, useContext } from "react";

const SettingsContext = createContext({});

export function SettingsProvider({ settings, children }) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
