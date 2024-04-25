import { useEffect } from "preact/hooks";

interface IProps {
  studyTime: number;
  breakTime: number;
  reps: number;
  isRunning: boolean;
  setReps: (reps: number) => void;
}

const Timer = (props: IProps) => {
  const { studyTime, breakTime, reps, isRunning, setReps } = props;

  useEffect(() => {
    if (isRunning) {
      countdown();
    }
  }, [isRunning]);

  const countdown = () => {
    let minutes: string | number = studyTime;
    let fullSeconds = minutes * 60; //Minutes to seconds
    let breakMinutes: string | number = breakTime;
    let repetitions = reps;

    const startCountdown = () => {
      minutes = Math.floor(fullSeconds / 60);
      let seconds: string | number = fullSeconds % 60;

      fullSeconds--;

      if (minutes === 0 && seconds === 0) {
        clearInterval(intervalID);
        endCountdown();
      }

      seconds = seconds < 10 ? `0${seconds}` : seconds;
      minutes = minutes < 10 ? `0${minutes}` : minutes;

      document.getElementById("timer")!.innerHTML = `${minutes}:${seconds}`;
      document.getElementById("reps")!.innerHTML = `Ciclos: ${repetitions}`;
    };

    const endCountdown = () => {
      if (breakMinutes) {
        minutes = breakTime;
        fullSeconds = minutes * 60;
        breakMinutes = 0;
        document.getElementById("timeOf")!.innerHTML = "TIEMPO DE DESCANSO";
        initializeInterval();
      } else {
        repetitions--;
        if (repetitions === 0) {
          document.getElementById("timeOf")!.innerHTML =
            "¡TERMINASTE TUS CICLOS DE ESTUDIO!";
          return;
        }
        minutes = studyTime;
        fullSeconds = minutes * 60;
        breakMinutes = breakTime;
        document.getElementById("timeOf")!.innerHTML = "TIEMPO DE ESTUDIO";
        initializeInterval();
      }
    };

    let intervalID = 0;

    const initializeInterval = () => {
      intervalID = setInterval(startCountdown, 1000);
    };

    initializeInterval();
  };

  return (
    <>
      <h4 id="timeOf" class="text-xl text-center">TIEMPO DE ESTUDIO</h4>
      <h3 id="timer" class="text-8xl sm:text-9xl text-center font-chivo">
        {studyTime.toString().length === 1 ? `0${studyTime}` : studyTime}:00
      </h3>
      <h4 id="reps" class="text-xl">
        Ciclos: {reps}
      </h4>
    </>
  );
};

export default Timer;
