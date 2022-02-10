import React, { useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleLeft,
  faAngleRight,
  faPlay
} from "@fortawesome/free-solid-svg-icons"

export default function Player({ currentSong }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })
  function handlePlaySong() {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(!isPlaying)
    } else {
      audioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }
  function handleTimeUpdate(e) {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    setSongInfo({ ...songInfo, currentTime, duration })
  }
  function getTime(time) {
    return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
  }
  function handleSlider(e) {
    audioRef.current.currentTime = e.target.value
    setSongInfo({ ...songInfo, currentTime: e.target.value })
  }
  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          onChange={handleSlider}
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={handlePlaySong}
          className="play"
          size="2x"
          icon={faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        onLoadedMetadata={handleTimeUpdate}
        onTimeUpdate={handleTimeUpdate}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  )
}
