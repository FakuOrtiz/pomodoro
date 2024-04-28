interface IProps {
  data: {
    $studyTime: number;
    $breakTime: number;
    $cycles: number;
  };
}

self.addEventListener("message", ({ data }: IProps) => {
  const { $studyTime, $breakTime, $cycles } = data;

  let minutes = $studyTime;
  let fullSeconds = minutes * 60;
  let breakMinutes = $breakTime;
  let repetitions = $cycles;
  let intervalID = 0;

  const startCountdown = () => {
    minutes = Math.floor(fullSeconds / 60);
    let seconds = fullSeconds % 60;

    fullSeconds--;

    if (minutes === 0 && seconds === 3) {
      self.postMessage({ type: "alarm" });
    }

    if (minutes === 0 && seconds === 0) {
      clearInterval(intervalID);
      endCountdown();
    }

    self.postMessage({
      type: "display",
      minutesDisplay: minutes < 10 ? `0${minutes}` : minutes,
      secondsDisplay: seconds < 10 ? `0${seconds}` : seconds,
    });
  };

  const endCountdown = () => {
    if (breakMinutes) {
      minutes = $breakTime;
      fullSeconds = minutes * 60;
      breakMinutes = 0;
      initializeInterval("break");
    } else {
      repetitions--;
      self.postMessage({ type: "new_cycle", repetitions });
      if (repetitions === 0) {
        self.postMessage({ type: "finish" });
      }
      minutes = $studyTime;
      fullSeconds = minutes * 60;
      breakMinutes = $breakTime;
      initializeInterval("study");
    }
  };

  const initializeInterval = (time: "break" | "study") => {
    if (time === "break") self.postMessage({ type: "break_time" });
    else self.postMessage({ type: "study_time" });

    intervalID = setInterval(startCountdown, 1000);
  };

  initializeInterval("study");
});
