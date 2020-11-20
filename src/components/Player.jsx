import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

const Player = ({ songs, currentSong, setCurrentSong, isPlaying, setIsPlaying }) => {
  const [songInfo, setSongInfo] = useState({ currentTime: 0, duration: 0 });

  const audioRef = useRef(null);

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const timeUpdateHandler = async (e) => {
    setSongInfo({
      ...songInfo,
      currentTime: e.target.currentTime,
      duration: e.target.duration,
    });

    if (e.target.currentTime === e.target.duration) {
      const currentSongIndex = songs.findIndex((song) => song.id === currentSong.id);
      await setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
      audioRef.current.play();
    }
  };

  const getTime = (time) => {
    (time / 60).toString().split(".");
    if (Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2) === "NaN:aN") {
      return 0;
    } else {
      return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
    }
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    const currentSongIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-back") {
      if (currentSongIndex - (1 % songs.length) === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        return;
      }
      await setCurrentSong(songs[(currentSongIndex - 1) % songs.length]);
    } else {
      await setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
    }
  };
  const trackAnimation = {
    transform: `translateX(${(songInfo.currentTime / songInfo.duration) * 100}%)`,
  };
  const inputBackground = {
    background: `linear-gradient(to right,${currentSong.color[0]}, ${currentSong.color[1]})`,
  };

  useEffect(() => {
    if (isPlaying) {
      var playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            // Automatic playback started!
            // Show playing UI.
          })
          .catch((error) => {
            // Auto-play was prevented
            // Show paused UI.
          });
      }
      // audioRef.current.play();
    }
  }, [currentSong]);

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        <div className='track' style={inputBackground}>
          <input
            type='range'
            value={songInfo.currentTime}
            onChange={dragHandler}
            min={0}
            max={songInfo.duration || 0}
          />
          <div className='animate-track' style={trackAnimation}></div>
        </div>
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon
          className='skip-back'
          icon={faAngleLeft}
          size='2x'
          onClick={() => skipTrackHandler("skip-back")}
        />
        <FontAwesomeIcon
          className='play'
          icon={isPlaying === false ? faPlay : faPause}
          size='2x'
          onClick={() => {
            playSongHandler();
          }}
        />
        <FontAwesomeIcon
          className='skip-forward'
          icon={faAngleRight}
          size='2x'
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
