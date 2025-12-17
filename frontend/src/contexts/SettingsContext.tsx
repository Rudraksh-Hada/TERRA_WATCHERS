import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppSettings } from '@/types';

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
}

const defaultSettings: AppSettings = {
  theme: 'light',
  layout: 'desktop',
  fontSize: 'normal',
  fontStyle: 'roboto'
};

const SETTINGS_STORAGE_KEY = 'terra_watchers_settings';

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultSettings;
  });

  // Apply theme to document
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  // Apply font size
  useEffect(() => {
    document.documentElement.classList.remove('font-size-small', 'font-size-normal', 'font-size-large');
    document.documentElement.classList.add(`font-size-${settings.fontSize}`);
  }, [settings.fontSize]);

  // Apply font style
  useEffect(() => {
    document.documentElement.classList.remove('font-roman', 'font-comic', 'font-roboto', 'font-opensans');
    document.documentElement.classList.add(`font-${settings.fontStyle}`);
  }, [settings.fontStyle]);

  // Save settings to storage
  useEffect(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
