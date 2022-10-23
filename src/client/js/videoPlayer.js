const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

let volumeG = 0.5;
video.volume = volumeG;

playBtn.addEventListener("click", (event) => {
  video.paused ? video.play() : video.pause();
});
muteBtn.addEventListener("click", (event) => {
  video.muted = !video.muted;
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeG;
});
video.addEventListener("pause", (event) => {
  playBtn.innerText = "Pause";
});
video.addEventListener("play", (event) => {
  playBtn.innerText = "Play";
});
video.addEventListener("loadedmetadata", () => {
  totalTime.innerText = Math.floor(video.duration);
});
video.addEventListener("timeupdate", () => {
  currentTime.innerText = Math.floor(video.currentTime);
});
volumeRange.addEventListener("input", (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = !video.muted;
    muteBtn.innerText = "Mute";
  }
  volumeG = value;
  video.volume = value;
});
