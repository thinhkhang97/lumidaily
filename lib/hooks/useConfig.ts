import { PomodoroConfig } from "@/lib/types";
import { ConfigService, DEFAULT_CONFIG } from "@/lib/services/ConfigService";
import { useCallback } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

interface UseConfigOptions {
  authState?: {
    isAuthenticated: boolean;
    token?: string;
  };
}

// Fetcher function for SWR
const configFetcher = async (
  url: string,
  token?: string
): Promise<PomodoroConfig> => {
  if (token) {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } else {
    // Use local storage when no token
    return ConfigService.getConfigFromLocalStorage();
  }
};

// Mutation function for updating config
const updateConfigMutation = async (
  url: string,
  { arg }: { arg: { config: PomodoroConfig; token?: string } }
): Promise<PomodoroConfig> => {
  const { config, token } = arg;

  if (token) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(config),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } else {
    // Use local storage when no token
    ConfigService.saveConfigToLocalStorage(config);
    return config;
  }
};

export function useConfig(options: UseConfigOptions = {}) {
  const { authState } = options;
  const isAuthenticated = authState?.isAuthenticated || false;
  const authToken = authState?.token;

  // SWR key for config
  const configKey = isAuthenticated ? "/api/config" : "config-local";

  // Fetch config using SWR
  const {
    data: config = DEFAULT_CONFIG,
    error,
    isLoading,
    mutate,
  } = useSWR(configKey, (url: string) => configFetcher(url, authToken), {
    fallbackData: DEFAULT_CONFIG,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 5000, // Dedupe requests within 5 seconds
  });

  // Mutation hook for updating config
  const { trigger: updateConfigData, isMutating } = useSWRMutation(
    configKey,
    updateConfigMutation,
    {
      onSuccess: (data) => {
        // Optimistically update the cache
        mutate(data, false);
      },
      onError: (error) => {
        console.error("Error updating config:", error);
        // Revalidate on error to get the correct state
        mutate();
      },
    }
  );

  // Update config function
  const updateConfig = useCallback(
    async (newConfig: Partial<PomodoroConfig>) => {
      const updatedConfig = { ...config, ...newConfig };

      // Optimistic update
      mutate(updatedConfig, false);

      // Trigger the mutation
      try {
        await updateConfigData({ config: updatedConfig, token: authToken });
        return updatedConfig;
      } catch (error) {
        console.error("Error updating config:", error);
        // Revert optimistic update on error
        mutate();
        throw error;
      }
    },
    [config, mutate, updateConfigData, authToken]
  );

  // Function to manually revalidate config
  const revalidate = useCallback(() => {
    mutate();
  }, [mutate]);

  return {
    config,
    updateConfig,
    isLoading,
    isMutating,
    error,
    revalidate,
  };
}
