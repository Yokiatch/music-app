// components/SpotifyPlayer.jsx
import React, { useState, useEffect } from 'react';
import SpotifyWebPlayback from 'react-spotify-web-playback';
import { useUser } from '../hooks/useUser';

const SpotifyPlayer = ({ trackUris = [], isPlaying = false }) => {
  const [spotifyToken, setSpotifyToken] = useState('');
  const { user } = useUser();

  useEffect(() => {
    // Get Spotify token from your auth system
    const getSpotifyToken = async () => {
      if (user) {
        // You'll need to implement this based on how you store Spotify tokens
        const token = localStorage.getItem('spotify_access_token');
        setSpotifyToken(token);
      }
    };

    getSpotifyToken();
  }, [user]);

  if (!spotifyToken) {
    return (
      <div className="h-24 bg-black border-t border-gray-800 flex items-center justify-center">
        <p className="text-white">Connect to Spotify to play music</p>
      </div>
    );
  }

  return (
    <div className="h-24 bg-black border-t border-gray-800">
      <SpotifyWebPlayback
        token={spotifyToken}
        uris={trackUris}
        play={isPlaying}
        styles={{
          activeColor: '#1db954',
          bgColor: '#000000',
          color: '#ffffff',
          loaderColor: '#1db954',
          sliderColor: '#1db954',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff',
          height: '96px'
        }}
        callback={(state) => {
          console.log('Spotify Player State:', state);
        }}
      />
    </div>
  );
};

export default SpotifyPlayer;
