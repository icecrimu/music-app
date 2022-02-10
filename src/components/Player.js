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

  function handlePlaySong() {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(!isPlaying)
    } else {
      audioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }
  return (
    <div className="player-container">
      <div className="time-control">
        <p>Start time</p>
        <input type="range" />
        <p>End time</p>
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
      <audio ref={audioRef} src={currentSong.audio}></audio>
    </div>
  )
}
