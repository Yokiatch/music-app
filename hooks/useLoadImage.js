// useLoadImage.js

// Expects a Spotify track or album object with image data
const useLoadImage = (spotifyItem) => {
  if (!spotifyItem) return null;

  // Spotify track objects carry an album object with an images array
  // Return the first image URL or null if none
  if (spotifyItem.album && spotifyItem.album.images && spotifyItem.album.images.length > 0) {
    return spotifyItem.album.images[0].url;
  }

  return null;
};

export default useLoadImage;
