// useLoadSong.js

// Expects a Spotify track object (from Spotify search, library, playlist, etc.)
const useLoadSong = (spotifyTrack) => {
  if (!spotifyTrack) return "";

  // Spotify track objects have a 'preview_url' property (30s preview mp3), or null if unavailable
  return spotifyTrack.preview_url || "";
};

export default useLoadSong;
