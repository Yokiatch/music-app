"use client";

import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";

const PageContent = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return <p>No songs available.</p>;
  }

  return (
    <>
      {songs.map((item) => (
        <SongItem
          key={item.id}
          data={item}
          onClick={() => onPlay(item.id)}  // calls onPlay only on click
        />
      ))}
    </>
  );
};

export default PageContent;
