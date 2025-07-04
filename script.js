let mediaRecorder, recordedChunks = [];

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      recordedChunks = [];
      mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) recordedChunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'audio/webm' });
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.src = URL.createObjectURL(blob);
        document.getElementById('tracks').appendChild(audio);
      };
      mediaRecorder.start();
    })
    .catch(() => alert('Microphone access is needed to record.'));
}

function stopRecording() {
  if (mediaRecorder) mediaRecorder.stop();
}

document.getElementById('fileInput')
  .addEventListener('change', e => {
    [...e.target.files].forEach(file => {
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.src = URL.createObjectURL(file);
      document.getElementById('tracks').appendChild(audio);
    });
  });
