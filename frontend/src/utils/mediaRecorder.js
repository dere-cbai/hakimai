export function startRecording(mediaType, mediaRecorderRef, setFileName) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: mediaType === 'video' })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        let recordedChunks = [];
  
        mediaRecorder.ondataavailable = event => {
          if (event.data.size > 0) {
            recordedChunks.push(event.data);
          }
        };
  
        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunks, { type: mediaType === 'video' ? 'video/webm' : 'audio/webm' });
          const file = new File([blob], `recorded_${mediaType}.webm`, { type: blob.type });
          const dt = new DataTransfer();
          dt.items.add(file);
          document.getElementById(`${mediaType}Input`).files = dt.files;
          setFileName(`recorded_${mediaType}.webm`);
        };
  
        mediaRecorder.start();
      })
      .catch(error => console.error('Error accessing media devices:', error));
  }
  
  export function stopRecording(mediaRecorder, mediaType) {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  }