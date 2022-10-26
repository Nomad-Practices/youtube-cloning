const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoUrl;

async function init() {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 1000,
      height: 500,
    },
  });
  video.srcObject = stream;
  video.play();
}

function handleDownload() {
  const a = document.createElement("a");
  a.href = videoUrl;
  a.download = "recordFile.webm";
  document.body.appendChild(a);
  a.click();
}
function handleStart() {
  startBtn.innerText = "Stop recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    video.srcObject = null;
    videoUrl = URL.createObjectURL(e.data);
    video.src = videoUrl;
    video.play();
  };
  recorder.start();
}
function handleStop() {
  startBtn.innerText = "Download recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
}

init();
startBtn.addEventListener("click", handleStart);
