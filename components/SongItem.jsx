// components/SongItem.jsx (modify existing)
import { useSpotifyPlayer } from '@/hooks/useSpotifyPlayer'; // You'll create this

const SongItem = ({ song }) => {
  const { playTrack } = useSpotifyPlayer();

  const handlePlay = () => {
    // Convert your song data to Spotify URI format
    const spotifyUri = `spotify:track:${song.spotify_id}`;
    playTrack([spotifyUri]);
  };

  return (
    <div className="song-item" onClick={handlePlay}>
      {/* Your existing song item UI */}
    </div>
  );
};
export default SongItem;
