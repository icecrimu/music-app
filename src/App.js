import React, { useState, useRef } from "react"
import "./styles/app.scss"
import Song from "./components/Song"
import Player from "./components/Player"
import Library from "./components/Library"
import Nav from "./components/Nav"
import Data from "./Data"

export const LibraryContext = React.createContext()

function App() {
  const [songs, setSongs] = useState(Data())
  const [currentSong, setCurrentSong] = useState(songs[0])

  const audioRef = useRef(null)

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercent: 0
  })

  const [isPlaying, setIsPlaying] = useState(false)

  const [libraryStatus, setLibraryStatus] = useState(false)

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
    const roundedCurrentTime = Math.round(currentTime)
    const roundedDuration = Math.round(duration)
    const animationPercent = Math.round(
      (roundedCurrentTime / roundedDuration) * 100
    )
    setSongInfo({ ...songInfo, currentTime, duration, animationPercent })
  }
  async function handleSongEnd() {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id)

    await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    if (isPlaying) audioRef.current.play()
  }
  return (
    <LibraryContext.Provider value={libraryContextValue}>
      <div className="App">
        <Nav
          libraryStatus={libraryStatus}
          setLibraryStatus={setLibraryStatus}
        />
        <Song currentSong={currentSong} />
        <Player
          audioRef={audioRef}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songs={songs}
          setSongs={setSongs}
          setCurrentSong={setCurrentSong}
        />
        <Library songs={songs} libraryStatus={libraryStatus} />
        <audio
          onLoadedMetadata={handleTimeUpdate}
          onTimeUpdate={handleTimeUpdate}
          ref={audioRef}
          src={currentSong.audio}
          onEnded={handleSongEnd}
        />
      </div>
    </LibraryContext.Provider>
  )
}

export default App
