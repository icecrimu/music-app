import React, { useContext } from "react"
import { LibraryContext } from "../App"
export default function LibrarySong({ song }) {
  const { songs, setSongs, setCurrentSong, audioRef, isPlaying } =
    useContext(LibraryContext)
  function handleSelectSong() {
    setCurrentSong(song)

    const newSongs = songs.map(s => {
      if (s.id === song.id) {
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

    if (isPlaying) {
      const playPromise = new Promise(resolve => {
        resolve()
      })
      if (isPlaying !== undefined) {
        playPromise.then(audio => {
          audioRef.current.play()
        })
      }
    }
  }

  return (
    <div
      onClick={handleSelectSong}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}
