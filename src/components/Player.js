import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleLeft,
  faAngleRight,
  faPlay
} from "@fortawesome/free-solid-svg-icons"

export default function Player() {
  return (
    <div className="player-container">
      <div className="time-control">
        <p>Start time</p>
        <input type="range" />
        <p>End time</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon className="play" size="2x" icon={faPlay} />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  )
}
