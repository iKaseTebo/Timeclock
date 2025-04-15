"use client";
import { createContext, useContext, useState } from "react";

type ClockContextType = {
  refreshKey: number;
  triggerRefresh: () => void;
};

const ClockContext = createContext<ClockContextType | null>(null);

export function ClockProvider({ children }: { children: React.ReactNode }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <ClockContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </ClockContext.Provider>
  );
}

export function useClockContext(): ClockContextType {
  const context = useContext(ClockContext);
  if (!context) {
    throw new Error("useClockContext must be used within a ClockProvider");
  }
  return context;
}
