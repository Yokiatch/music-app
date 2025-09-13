// hooks/useSpotifyPlayer.js
import { useState, useContext, createContext } from 'react';

const SpotifyPlayerContext = createContext();

export const SpotifyPlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (uris) => {
    setCurrentTrack(uris);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  return (
    <SpotifyPlayerContext.Provider value={{
      currentTrack,
      isPlaying,
      playTrack,
      pauseTrack
    }}>
      {children}
    </SpotifyPlayerContext.Provider>
  );
};

export const useSpotifyPlayer = () => {
  const context = useContext(SpotifyPlayerContext);
  if (!context) {
    throw new Error('useSpotifyPlayer must be used within SpotifyPlayerProvider');
  }
  return context;
};
