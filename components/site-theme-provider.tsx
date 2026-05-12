"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "geo-site-theme";

type SiteThemeContextValue = {
  /** true — тёмная тема (значение по умолчанию, как на лендинге) */
  isDark: boolean;
  setDarkMode: (value: boolean) => void;
  toggleTheme: () => void;
};

const SiteThemeContext = createContext<SiteThemeContextValue | null>(null);

function readStoredIsDark(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "light") return false;
    if (raw === "dark") return true;
  } catch {
    // ignore
  }
  return true;
}

export function SiteThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDarkState] = useState(true);

  useLayoutEffect(() => {
    setIsDarkState(readStoredIsDark());
  }, []);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const setDarkMode = useCallback((value: boolean) => {
    setIsDarkState(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, value ? "dark" : "light");
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkState((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ isDark, setDarkMode, toggleTheme }),
    [isDark, setDarkMode, toggleTheme]
  );

  return (
    <SiteThemeContext.Provider value={value}>{children}</SiteThemeContext.Provider>
  );
}

export function useSiteTheme(): SiteThemeContextValue {
  const ctx = useContext(SiteThemeContext);
  if (!ctx) {
    throw new Error("useSiteTheme: оберните приложение в SiteThemeProvider.");
  }
  return ctx;
}
