import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoUrl;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumbnail: "thumbnail.jpg",
};

function downloadFile(fileBlob, fileName) {
  const url = URL.createObjectURL(fileBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
}

async function init() {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 1024,
      height: 576,
    },
  });
  video.srcObject = stream;
  video.play();
}

async function handleDownload() {
  startBtn.removeEventListener("click", handleDownload);
  startBtn.innerText = "Transconding...";
  startBtn.disabled = true;
  const ffmpeg = createFFmpeg({
    log: true,
  });
  await ffmpeg.load();
  ffmpeg.FS("writeFile", files.input, await fetchFile(videoUrl));
  await ffmpeg.run("-i", files.input, "-r", "60", files.output);
  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumbnail
  );
  const mp4File = ffmpeg.FS("readFile", files.output);
  const thumbnailFile = ffmpeg.FS("readFile", files.thumbnail);
  downloadFile(
    new Blob([mp4File.buffer], {
      type: "video/mp4",
    }),
    "recordFile.mp4"
  );
  downloadFile(
    new Blob([thumbnailFile], {
      type: "image/jpg",
    }),
    files.thumbnail
  );
  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", "output.mp4");
  ffmpeg.FS("unlink", files.thumbnail);
  startBtn.disabled = false;
  startBtn.innerText = "Record Again";
  startBtn.addEventListener("click", handleStart);
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
