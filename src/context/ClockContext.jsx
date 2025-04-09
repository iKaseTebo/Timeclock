"use client";
import { createContext, useContext, useState } from "react";

const ClockContext = createContext();

export function ClockProvider({ children }) {
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

export function useClockContext() {
  return useContext(ClockContext);
}