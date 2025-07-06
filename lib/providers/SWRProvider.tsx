"use client";

import { ReactNode } from "react";
import { SWRConfig } from "swr";

interface SWRProviderProps {
  children: ReactNode;
}

export function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        // Global configuration for all SWR hooks
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        revalidateOnMount: true,
        refreshInterval: 0, // Disable automatic refresh by default
        dedupingInterval: 5000, // Dedupe requests within 5 seconds
        focusThrottleInterval: 5000, // Throttle focus revalidation
        errorRetryCount: 3, // Retry failed requests 3 times
        errorRetryInterval: 5000, // Wait 5 seconds between retries
        onError: (error) => {
          console.error("SWR Error:", error);
        },
        onSuccess: (data, key) => {
          console.log("SWR Success:", key, data);
        },
        // You can add more global configuration here
      }}
    >
      {children}
    </SWRConfig>
  );
}
