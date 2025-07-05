import { useEffect, useState } from "react";
import { PomodoroConfig } from "@/lib/types";
import { ConfigService, DEFAULT_CONFIG } from "@/lib/services/ConfigService";

export function useConfig() {
  const [config, setConfig] = useState<PomodoroConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load config from localStorage on initial mount
    const savedConfig = ConfigService.getConfigFromLocalStorage();
    setConfig(savedConfig);
    setIsLoading(false);
  }, []);

  const updateConfig = (newConfig: Partial<PomodoroConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    ConfigService.saveConfigToLocalStorage(updatedConfig);
    return updatedConfig;
  };

  return {
    config,
    updateConfig,
    isLoading,
  };
}
