export function playAudio(isPlaying, audioRef) {
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
