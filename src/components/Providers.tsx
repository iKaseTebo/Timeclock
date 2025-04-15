"use client";
import { queryClient } from "@/util/http";
import { QueryClientProvider } from "@tanstack/react-query";
import { ClockProvider } from "@/context/ClockContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClockProvider>{children}</ClockProvider>
    </QueryClientProvider>
  );
}
