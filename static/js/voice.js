import './lib/vad';
import Recorder from './lib/recorder';
import * as index from './index.js';



var audioContext = undefined;
var isRecording = false;
var mediaRecorder = {};
var dataArray = [];
var analyser = undefined;
var canvas = undefined;
var ctx = undefined;
var canvasHeight = undefined;
var canvasWidth = undefined;
var countFrame = 0;
var recordTime = undefined;
var mediaRecorder = undefined;
var source = undefined;

canvas = document.getElementById('sound-visualizer');
ctx = canvas.getContext('2d');

// Ask for audio device
navigator.getUserMedia = navigator.getUserMedia
  || navigator.mozGetUserMedia
  || navigator.webkitGetUserMedia;


function startUserMedia(stream) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext({ sampleRate: 16000 });
    analyser = audioContext.createAnalyser();
    source = audioContext.createMediaStreamSource(stream).connect(analyser);

    console.log(analyser);
    dataArray = new Uint8Array(analyser.fftSize / 32);
    animate();
    const chunks = [];
    const audioOptions = {
      audioBitsPerSecond: 16000
    };

    // Setup options
    const options = {
      source: source,
      voice_stop: function() {
        console.log('voice_stop');
        if (isRecording === true) {
          stopRecording();
        }
      },
      voice_start: function() {
        console.log('voice_start');
        if (isRecording === false) {
          startRecording();
        }
        // } else if (!vm.isRecording && (incomeMessage.length === 0)) {
        // 	console.log('StartRecording');
        // 	vm.startRecord();
      }
    };
    // Create VAD
    const vad = new VAD(options);
  }

navigator.getUserMedia({ audio: true }, startUserMedia, e => {
  console.log(`No live audio input in this browser: ${e}`);
});

export function startRecording() {
  isRecording = true;
  index.toggleRecordButton('off');
  mediaRecorder = new Recorder(source, { numChannels: 1 });
  mediaRecorder.record();

  // window.setTimeout(() => {
  //   if (isRecording) {
  //     stopRecording();
  //     console.log('10 seconds, stop recording');
  //   }
  // }, 20000);
}

export function stopRecording() {
  index.toggleRecordButton('on');
  isRecording = false;
  mediaRecorder.stop();
  mediaRecorder.exportWAV(createFileLink);
  // audioContext.close().then(() => {
  //   console.log('streaming close');
  // });

}



function createFileLink(blob) {
  console.log('recorder stopped');
  const audioURL = window.URL.createObjectURL(blob);

  const request = new XMLHttpRequest();
  request.open('GET', audioURL, true);
  request.responseType = 'blob';
  request.onload = function() {
    const reader = new FileReader();
    reader.readAsDataURL(request.response);
    reader.onload = function(el) {
      console.log('SEND RESULT TO THE BOT');
      index.addUserAudio(el.target.result);
      // vm.sendMessageToBot(el.target.result);
    };
  };
  request.send();
}


function animate() {
  ctx.globalAlpha = 0.5;
  if (countFrame > 90) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    countFrame = 0;
  }
  analyser.getByteFrequencyData(dataArray);
  ctx.strokeStyle = '#fff';
  // ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-2, canvasHeight / 2);
  const arrayLength = dataArray.length;
  const countStep = canvasWidth / arrayLength;

  for (let i = 1; i < arrayLength - 2; i += 1) {
    const points = [];
    points[0] = {
      x: i * countStep,
      y: (canvasHeight - dataArray[i]) / 2
    };
    points[1] = {
      x: (i + 1) * countStep,
      y: (canvasHeight - dataArray[i + 1]) / 2
    };
    const xc = (points[0].x + points[1].x) / 2;
    const yc = (points[0].y + points[1].y) / 2;
    ctx.quadraticCurveTo(points[0].x, points[0].y, xc, yc);
  }
  ctx.stroke();
  countFrame += 1;
  window.requestAnimationFrame(animate);
}
