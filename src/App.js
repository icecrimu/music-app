import React, { useState } from "react"
import "./styles/app.scss"
import Song from "./components/Song"
import Player from "./components/Player"
import Library from "./components/Library"

import Data from "./Data"

function App() {
  const [songs, setSongs] = useState(Data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player currentSong={currentSong} />
      <Library songs={songs} />
    </div>
  )
}

export default App
