import React from "react"
import LibrarySong from "./LibrarySong"
export default function Library({ songs, libraryStatus }) {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      {songs.map(song => {
        return <LibrarySong key={song.id} song={song} />
      })}
    </div>
  )
}
