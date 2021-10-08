const webcam = document.querySelector('#webcam');
const button = document.querySelector('#btn-feedback');
var track = null;

button.addEventListener('click', async (e) => {
  const status = button.classList.contains('in-feedback');
  
  if (!status) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      const videoTracks = stream.getVideoTracks()
      track = videoTracks[0]
      webcam.srcObject = stream
            
      button.classList.add('in-feedback')
    } catch (error) {
      console.error(error);
    }
  } else {
    if (track) {
      track.stop();
      track = null;
    }
    webcam.srcObject = null
    button.classList.remove('in-feedback')
  }

  buttonStatusUpdate();
})

function buttonStatusUpdate() {
  const status = button.classList.contains('in-feedback');
  if (!status) {
    button.innerHTML = 'Start feedback'
  } else {
    button.innerHTML = 'Stop feedback'
  }
}
