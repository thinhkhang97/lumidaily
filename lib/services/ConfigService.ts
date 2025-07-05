import { PomodoroConfig } from "@/lib/types";

// Key for storing config in localStorage
const CONFIG_STORAGE_KEY = "lumi-config";

// Default configuration values
export const DEFAULT_CONFIG: PomodoroConfig = {
  pomodoroMinutes: 25,
  breakMinutes: 5,
  volume: 50, // 0-100
};

export class ConfigService {
  // Local storage methods
  static getConfigFromLocalStorage(): PomodoroConfig {
    if (typeof window === "undefined") return DEFAULT_CONFIG;

    try {
      const configJson = localStorage.getItem(CONFIG_STORAGE_KEY);
      return configJson ? JSON.parse(configJson) : DEFAULT_CONFIG;
    } catch (error) {
      console.error("Error reading config from localStorage:", error);
      return DEFAULT_CONFIG;
    }
  }

  static saveConfigToLocalStorage(config: PomodoroConfig): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.error("Error saving config to localStorage:", error);
    }
  }

  // API methods (to be implemented when authentication is added)
  static async fetchConfigFromApi(authToken: string): Promise<PomodoroConfig> {
    try {
      const response = await fetch("/api/config", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching config from API:", error);
      // Fall back to local storage if API fails
      return this.getConfigFromLocalStorage();
    }
  }

  static async saveConfigToApi(
    config: PomodoroConfig,
    authToken: string
  ): Promise<boolean> {
    try {
      const response = await fetch("/api/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error("Error saving config to API:", error);
      // Fall back to local storage if API fails
      this.saveConfigToLocalStorage(config);
      return false;
    }
  }
}
