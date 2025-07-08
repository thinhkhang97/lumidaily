import { MusicTrack, Playlist } from "@/lib/types";

// Key for storing music playlist in localStorage
const MUSIC_PLAYLIST_STORAGE_KEY = "lumi-music-playlist";

// Default playlist configuration
export const DEFAULT_PLAYLIST: Playlist = {
  tracks: [],
  currentIndex: -1,
  lastUpdated: new Date().toISOString(),
};

// Helper to generate unique ID for tracks
export const generateTrackId = (): string => {
  return `track-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Helper to extract YouTube video ID from URL
export const extractVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export class MusicService {
  // Local storage methods
  static getPlaylistFromLocalStorage(): Playlist {
    if (typeof window === "undefined") return DEFAULT_PLAYLIST;

    try {
      const playlistJson = localStorage.getItem(MUSIC_PLAYLIST_STORAGE_KEY);
      const playlist = playlistJson
        ? JSON.parse(playlistJson)
        : DEFAULT_PLAYLIST;

      // Ensure playlist has the required structure
      return {
        tracks: playlist.tracks || [],
        currentIndex: playlist.currentIndex ?? -1,
        lastUpdated: playlist.lastUpdated || new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error reading music playlist from localStorage:", error);
      return DEFAULT_PLAYLIST;
    }
  }

  static savePlaylistToLocalStorage(playlist: Playlist): void {
    if (typeof window === "undefined") return;

    try {
      const updatedPlaylist = {
        ...playlist,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(
        MUSIC_PLAYLIST_STORAGE_KEY,
        JSON.stringify(updatedPlaylist)
      );
    } catch (error) {
      console.error("Error saving music playlist to localStorage:", error);
    }
  }

  // Track management methods
  static addTrackToPlaylist(url: string, title?: string): MusicTrack | null {
    const videoId = extractVideoId(url);
    if (!videoId) {
      console.error("Invalid YouTube URL:", url);
      return null;
    }

    const playlist = this.getPlaylistFromLocalStorage();

    // Check if track already exists
    const existingTrack = playlist.tracks.find(
      (track) => track.videoId === videoId
    );
    if (existingTrack) {
      console.log("Track already exists in playlist:", existingTrack.title);
      return existingTrack;
    }

    const newTrack: MusicTrack = {
      id: generateTrackId(),
      title: title || `Video ${videoId}`,
      url,
      videoId,
      addedAt: new Date().toISOString(),
    };

    const updatedPlaylist: Playlist = {
      ...playlist,
      tracks: [...playlist.tracks, newTrack],
    };

    this.savePlaylistToLocalStorage(updatedPlaylist);
    return newTrack;
  }

  static removeTrackFromPlaylist(trackId: string): boolean {
    const playlist = this.getPlaylistFromLocalStorage();
    const trackIndex = playlist.tracks.findIndex(
      (track) => track.id === trackId
    );

    if (trackIndex === -1) {
      console.error("Track not found in playlist:", trackId);
      return false;
    }

    const updatedTracks = playlist.tracks.filter(
      (track) => track.id !== trackId
    );
    let updatedCurrentIndex = playlist.currentIndex;

    // Adjust current index if necessary
    if (trackIndex < playlist.currentIndex) {
      updatedCurrentIndex = playlist.currentIndex - 1;
    } else if (trackIndex === playlist.currentIndex) {
      updatedCurrentIndex =
        updatedTracks.length > 0
          ? Math.min(playlist.currentIndex, updatedTracks.length - 1)
          : -1;
    }

    const updatedPlaylist: Playlist = {
      ...playlist,
      tracks: updatedTracks,
      currentIndex: updatedCurrentIndex,
    };

    this.savePlaylistToLocalStorage(updatedPlaylist);
    return true;
  }

  static updateCurrentTrack(trackId: string): boolean {
    const playlist = this.getPlaylistFromLocalStorage();
    const trackIndex = playlist.tracks.findIndex(
      (track) => track.id === trackId
    );

    if (trackIndex === -1) {
      console.error("Track not found in playlist:", trackId);
      return false;
    }

    const updatedPlaylist: Playlist = {
      ...playlist,
      currentIndex: trackIndex,
    };

    this.savePlaylistToLocalStorage(updatedPlaylist);
    return true;
  }

  static updateTrackDetails(
    trackId: string,
    updates: Partial<Pick<MusicTrack, "title" | "duration">>
  ): boolean {
    const playlist = this.getPlaylistFromLocalStorage();
    const trackIndex = playlist.tracks.findIndex(
      (track) => track.id === trackId
    );

    if (trackIndex === -1) {
      console.error("Track not found in playlist:", trackId);
      return false;
    }

    const updatedTracks = [...playlist.tracks];
    updatedTracks[trackIndex] = {
      ...updatedTracks[trackIndex],
      ...updates,
    };

    const updatedPlaylist: Playlist = {
      ...playlist,
      tracks: updatedTracks,
    };

    this.savePlaylistToLocalStorage(updatedPlaylist);
    return true;
  }

  static getCurrentTrack(): MusicTrack | null {
    const playlist = this.getPlaylistFromLocalStorage();
    if (
      playlist.currentIndex >= 0 &&
      playlist.currentIndex < playlist.tracks.length
    ) {
      return playlist.tracks[playlist.currentIndex];
    }
    return null;
  }

  static getNextTrack(): MusicTrack | null {
    const playlist = this.getPlaylistFromLocalStorage();
    if (playlist.tracks.length === 0) return null;

    const nextIndex = (playlist.currentIndex + 1) % playlist.tracks.length;
    return playlist.tracks[nextIndex];
  }

  static getPreviousTrack(): MusicTrack | null {
    const playlist = this.getPlaylistFromLocalStorage();
    if (playlist.tracks.length === 0) return null;

    const prevIndex =
      playlist.currentIndex <= 0
        ? playlist.tracks.length - 1
        : playlist.currentIndex - 1;
    return playlist.tracks[prevIndex];
  }

  static clearPlaylist(): void {
    this.savePlaylistToLocalStorage(DEFAULT_PLAYLIST);
  }

  // API methods (to be implemented when authentication is added)
  static async fetchPlaylistFromApi(authToken: string): Promise<Playlist> {
    try {
      const response = await fetch("/api/music/playlist", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching music playlist from API:", error);
      // Fall back to local storage if API fails
      return this.getPlaylistFromLocalStorage();
    }
  }

  static async savePlaylistToApi(
    playlist: Playlist,
    authToken: string
  ): Promise<boolean> {
    try {
      const response = await fetch("/api/music/playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(playlist),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error("Error saving music playlist to API:", error);
      // Fall back to local storage if API fails
      this.savePlaylistToLocalStorage(playlist);
      return false;
    }
  }
}
