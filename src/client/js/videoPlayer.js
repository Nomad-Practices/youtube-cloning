const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let volumeG = 0.5;
video.volume = volumeG;

let controlsTimeout = null;
let controlsMovementTimeout = null;

function formatTime(sec) {
  return new Date(sec * 1000).toISOString().substring(11, 19);
}
function showControls() {
  videoControls.classList.add("showing");
}
function hideControls() {
  videoControls.classList.remove("showing");
}

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
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
});
video.addEventListener("timeupdate", () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
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
timeline.addEventListener("input", (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
});
fullScreenBtn.addEventListener("click", () => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
  }
});
video.addEventListener("mousemove", () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  showControls();
  controlsMovementTimeout = setTimeout(() => hideControls, 4000);
});
video.addEventListener("mouseleave", () => {
  controlsTimeout = setTimeout(() => hideControls, 3000);
});
