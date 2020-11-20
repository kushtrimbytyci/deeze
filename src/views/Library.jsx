import React from "react";
import LibrarySong from "../components/LibrarySong";

const Library = ({ songs, currentSong, setCurrentSong, setIsPlaying, libraryIsOpen }) => {
  return (
    <div className={`library ${libraryIsOpen === true ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map((song) => {
          return (
            <LibrarySong
              song={song}
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
              setIsPlaying={setIsPlaying}
              key={song.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
