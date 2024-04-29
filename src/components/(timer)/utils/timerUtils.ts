export const updateDisplay = (id: string, data: string, worker: Worker) => {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = data;
  } else {
    worker.terminate();
  }
};

export const playAudio = (id: string, worker: Worker) => {
  const audio = document.getElementById(id) as HTMLAudioElement;
  if (audio) {
    audio.play();
  } else {
    worker.terminate();
  }
};