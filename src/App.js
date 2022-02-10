import React, { useState } from "react"
import "./styles/app.scss"
import Song from "./components/Song"
import Player from "./components/Player"
import Data from "./Data"

function App() {
  const [songs, setSongs] = useState(Data())
  const [currentSong, setCurrectSong] = useState(songs[0])
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player />
    </div>
  )
}

export default App
