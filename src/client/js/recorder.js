import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

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

async function handleDownload() {
  const ffmpeg = createFFmpeg({
    log: true,
  });
  await ffmpeg.load();
  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoUrl));
  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");
  await ffmpeg.run(
    "-i",
    "recording.webm",
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    "thumbnail.jpg"
  );
  const mp4File = ffmpeg.FS("readFile", "output.mp4");
  const thumbnailFile = ffmpeg.FS("readFile", "thumbnail.jpg");
  const mp4Blob = new Blob([mp4File.buffer], {
    type: "video/mp4",
  });
  const thumbnailBlob = new Blob([thumbnailFile], {
    type: "image/jpg",
  });
  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbnailUrl = URL.createObjectURL(thumbnailBlob);
  const a = document.createElement("a");
  a.href = mp4Url;
  a.download = "recordFile.mp4";
  document.body.appendChild(a);
  a.click();
  const thumbA = document.createElement("a");
  thumbA.href = thumbnailUrl;
  thumbA.download = "thumbnail.jpg";
  document.body.appendChild(thumbA);
  thumbA.click();
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
