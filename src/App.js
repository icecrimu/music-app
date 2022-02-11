import React, { useState, useRef } from "react"
import "./styles/app.scss"
import Song from "./components/Song"
import Player from "./components/Player"
import Library from "./components/Library"

import Data from "./Data"

export const LibraryContext = React.createContext()

function App() {
  const [songs, setSongs] = useState(Data())
  const [currentSong, setCurrentSong] = useState(songs[0])

  const audioRef = useRef(null)

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })

  const [isPlaying, setIsPlaying] = useState(false)

  const libraryContextValue = {
    setCurrentSong,
    songs,
    setSongs,
    audioRef,
    isPlaying,
    setIsPlaying
  }
  function handleTimeUpdate(e) {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    setSongInfo({ ...songInfo, currentTime, duration })
  }
  return (
    <LibraryContext.Provider value={libraryContextValue}>
      <div className="App">
        <Song currentSong={currentSong} />
        <Player
          audioRef={audioRef}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        <Library songs={songs} />
        <audio
          onLoadedMetadata={handleTimeUpdate}
          onTimeUpdate={handleTimeUpdate}
          ref={audioRef}
          src={currentSong.audio}
        />
      </div>
    </LibraryContext.Provider>
  )
}

export default App
