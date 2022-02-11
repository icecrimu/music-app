import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMusic } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"

export default function Nav({ libraryStatus, setLibraryStatus }) {
  return (
    <nav>
      <h1>Waves</h1>
      <button
        onClick={() => {
          setLibraryStatus(!libraryStatus)
        }}
      >
        Library
        <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
      </button>
    </nav>
  )
}
