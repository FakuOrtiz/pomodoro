import { useEffect, useState } from "preact/hooks";
import Circle from "../../assets/svgs/Circle";
import CircleFilled from "../../assets/svgs/CircleFilled";
import alarm from "../../assets/sounds/alarm.mp3";
import finish from "../../assets/sounds/finish.mp3";

interface IProps {
  studyTime: number;
  breakTime: number;
  reps: number;
  isRunning: boolean;
  setReps: (r: number) => void;
  setStudyTime: (t: number) => void;
  setBreakTime: (t: number) => void;
  setIsRunning: (b: boolean) => void;
}

const Timer = (props: IProps) => {
  const {
    studyTime,
    breakTime,
    reps,
    isRunning,
    setReps,
    setStudyTime,
    setBreakTime,
    setIsRunning,
  } = props;
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
    let fullSeconds = minutes * 60;
    let breakMinutes: string | number = breakTime;
    let repetitions = reps;

    const startCountdown = () => {
      minutes = Math.floor(fullSeconds / 60);
      let seconds: string | number = fullSeconds % 60;

      fullSeconds--;

      if (minutes === 0 && seconds === 3) {
        new Audio(alarm).play();
      }

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
        fullSeconds = minutes * 60;
        breakMinutes = 0;
        initializeInterval("break");
      } else {
        repetitions--;
        setCompletedReps(reps - repetitions);
        setReps(repetitions);
        if (repetitions === 0) {
          new Audio(finish).play();
          return (document.getElementById("timeOf")!.innerHTML =
            "¡TERMINASTE TUS CICLOS DE ESTUDIO!");
        }
        minutes = studyTime;
        fullSeconds = minutes * 60;
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

  const changeTime = () => {
    setStudyTime(0);
    setBreakTime(0);
    setReps(0);
    setIsRunning(false);
  };

  return (
    <>
      <h4 id="timeOf" class="text-xl text-center mb-10" />
      <h3 id="timer" class="text-8xl sm:text-9xl text-center font-chivo" />
      <h4 class="text-xl text-center mt-10 mb-2">Ciclos</h4>
      <div id="reps" class="flex gap-1 justify-center">
        {[...Array.from({ length: completedReps })].map(() => {
          return (
            <>
              <CircleFilled height={30} width={30} />
            </>
          );
        })}
        {[...Array.from({ length: reps })].map(() => {
          return (
            <>
              <Circle height={30} width={30} />
            </>
          );
        })}
      </div>
      {/* <div class="flex justify-center mt-16">
        <Button title="Cambiar tiempo" action={changeTime} />
      </div> */}
    </>
  );
};

export default Timer;
