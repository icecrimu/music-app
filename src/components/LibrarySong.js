import React from "react"

export default function LibrarySong({ song }) {
  return (
    <div className="library-song">
      <img src={song.cover} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}
