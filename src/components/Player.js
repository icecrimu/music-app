import React, { useRef, useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleLeft,
  faAngleRight,
  faPlay,
  faPause
} from "@fortawesome/free-solid-svg-icons"

export default function Player(props) {
  const {
    currentSong,
    setCurrentSong,
    audioRef,
    songInfo,
    setSongInfo,
    isPlaying,
    setIsPlaying,
    songs,
    setSongs
  } = props
  useEffect(() => {
    const newSongs = songs.map(s => {
      if (s.id === currentSong.id) {
        return {
          ...s,
          active: true
        }
      } else {
        return {
          ...s,
          active: false
        }
      }
    })
    setSongs(newSongs)
  }, [currentSong])
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
  async function handleSkipTrack(direction) {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id)

    if (direction === "skip-back") {
      await setCurrentSong(
        currentIndex === 0 ? songs[songs.length - 1] : songs[currentIndex - 1]
      )
    } else {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    }
    if (isPlaying) audioRef.current.play()
  }
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercent}%)`
  }

  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`
          }}
          className="track"
        >
          <input
            onChange={handleSlider}
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
          />
          <div style={trackAnimation} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
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
