import React, { useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleLeft,
  faAngleRight,
  faPlay,
  faPause
} from "@fortawesome/free-solid-svg-icons"

export default function Player({
  currentSong,
  setCurrentSong,
  audioRef,
  songInfo,
  setSongInfo,
  isPlaying,
  setIsPlaying,
  songs
}) {
  function handlePlaySong() {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(!isPlaying)
    } else {
      audioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  function getTime(time) {
    return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
  }
  function handleSlider(e) {
    audioRef.current.currentTime = e.target.value
    setSongInfo({ ...songInfo, currentTime: e.target.value })
  }
  function handleSkipTrack(direction) {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id)

    if (direction === "skip-back") {
      setCurrentSong(
        currentIndex === 0 ? songs[songs.length - 1] : songs[currentIndex - 1]
      )
    } else {
      setCurrentSong(songs[(currentIndex + 1) % songs.length])
    }
  }
  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          onChange={handleSlider}
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => {
            handleSkipTrack("skip-back")
          }}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={handlePlaySong}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => {
            handleSkipTrack("skip-forward")
          }}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  )
}
