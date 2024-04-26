import { useEffect, useState } from "preact/hooks";
import Circle from "../../assets/Circle";
import CircleFilled from "../../assets/CircleFilled";

interface IProps {
  studyTime: number;
  breakTime: number;
  reps: number;
  isRunning: boolean;
  setReps: (r: number) => void;
}

const Timer = (props: IProps) => {
  const { studyTime, breakTime, reps, isRunning, setReps } = props;
  const [completedReps, setCompletedReps] = useState(0);

  useEffect(() => {
    if (isRunning) {
      countdown();
    }
  }, [isRunning]);

  const countdown = () => {
    const initialTimer =
      studyTime.toString().length === 1
        ? `0${studyTime}:00`
        : `${studyTime}:00`;

    document.getElementById("timer")!.innerHTML = initialTimer;
    document.getElementById("timeOf")!.innerHTML = "TIEMPO DE ESTUDIO";

    let minutes: string | number = studyTime;
    // let fullSeconds = minutes * 60; //Minutes to seconds
    let fullSeconds = 3; //Minutes to seconds
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

      let minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
      let secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;

      document.getElementById(
        "timer"
      )!.innerHTML = `${minutesDisplay}:${secondsDisplay}`;
    };

    const endCountdown = () => {
      if (breakMinutes) {
        minutes = breakTime;
        // fullSeconds = minutes * 60;
        fullSeconds = 3;
        breakMinutes = 0;
        initializeInterval("break");
      } else {
        repetitions--;
        setCompletedReps(reps - repetitions);
        setReps(repetitions);
        if (repetitions === 0) {
          return (document.getElementById("timeOf")!.innerHTML =
            "¡TERMINASTE TUS CICLOS DE ESTUDIO!");
        }
        minutes = studyTime;
        // fullSeconds = minutes * 60;
        fullSeconds = 3;
        breakMinutes = breakTime;
        initializeInterval("study");
      }
    };

    let intervalID = 0;

    const initializeInterval = (time: "break" | "study") => {
      if (time === "break") {
        document.getElementById("timeOf")!.innerHTML = "TIEMPO DE DESCANSO";
      } else {
        document.getElementById("timeOf")!.innerHTML = "TIEMPO DE ESTUDIO";
      }
      intervalID = setInterval(startCountdown, 1000);
    };

    initializeInterval("study");
  };

  return (
    <>
      <h4 id="timeOf" class="text-xl text-center mb-5" />
      <h3 id="timer" class="text-8xl sm:text-9xl text-center font-chivo" />
      <h4 class="text-xl text-center mt-5 mb-2">Ciclos</h4>
      <div id="reps" class="flex gap-1 justify-center">
        {[...Array.from({ length: completedReps })].map((_, i) => {
          return (
            <>
              <CircleFilled height={30} width={30} />
            </>
          );
        })}
        {[...Array.from({ length: reps })].map((_, i) => {
          return (
            <>
              <Circle height={30} width={30} />
            </>
          );
        })}
      </div>
    </>
  );
};

export default Timer;
