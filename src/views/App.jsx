import React, { useState } from "react";
import "../styles/app.scss";
import Song from "../components/Song";
import Player from "../components/Player";
import Library from "./Library";
import data from "../data";
import Navigation from "../components/Navigation";

function App() {
  const [songs, setSongs] = useState(data);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryIsOpen, setLibraryIsOpen] = useState(false);
  return (
    <div className='App'>
      <div className={`app-initial ${libraryIsOpen && "app-animated"}`}>
        <Navigation libraryIsOpen={libraryIsOpen} setLibraryIsOpen={setLibraryIsOpen} />
        <Song currentSong={currentSong} />
        <Player
          songs={songs}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>
      <Library
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        setIsPlaying={setIsPlaying}
        libraryIsOpen={libraryIsOpen}
      />
    </div>
  );
}

export default App;
