"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

const BookDemoContext = createContext(null);

export function BookDemoProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBookDemo = useCallback(() => setIsOpen(true), []);
  const closeBookDemo = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openBookDemo, closeBookDemo }),
    [isOpen, openBookDemo, closeBookDemo]
  );

  return (
    <BookDemoContext.Provider value={value}>{children}</BookDemoContext.Provider>
  );
}

export function useBookDemo() {
  const ctx = useContext(BookDemoContext);
  if (!ctx) {
    throw new Error("useBookDemo must be used within BookDemoProvider");
  }
  return ctx;
}
