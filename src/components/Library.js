import React from "react"
import LibrarySong from "./LibrarySong"
export default function Library({ songs }) {
  return (
    <div className="library">
      <h2>Library</h2>
      {songs.map(song => {
        return <LibrarySong key={song.id} song={song} />
      })}
    </div>
  )
}
