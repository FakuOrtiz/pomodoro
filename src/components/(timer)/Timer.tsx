import { useEffect } from "preact/hooks";
import Circle from "../../assets/svgs/Circle";
import CircleFilled from "../../assets/svgs/CircleFilled";
import Button from "./Button";
import { useStore } from "@nanostores/preact";
import {
  breakTime,
  clearStore,
  completedCycles,
  cycles,
  isRunning,
  setCompletedCycles,
  setCycles,
  studyTime,
} from "../../store";
import alarm from "../../assets/sounds/alarm.mp3";
import finish from "../../assets/sounds/finish.mp3";
import confetti from "canvas-confetti";

const Timer = () => {
  const $studyTime = useStore(studyTime);
  const $breakTime = useStore(breakTime);
  const $cycles = useStore(cycles);
  const $isRunning = useStore(isRunning);
  const $completedCycles = useStore(completedCycles);
  let worker = new Worker("/src/services/timerWorker.ts", { type: "module" });

  useEffect(() => {
    if ($isRunning) {
      countdown();
    }
  }, [$isRunning]);

  const countdown = () => {
    const initialTimer =
      $studyTime.toString().length === 1
        ? `0${$studyTime}:00`
        : `${$studyTime}:00`;

    document.getElementById("timer")!.innerHTML = initialTimer;
    document.getElementById("timeOf")!.innerHTML = "TIEMPO DE ESTUDIO";

    worker.postMessage({
      $studyTime,
      $breakTime,
      $cycles,
    });

    worker.onmessage = ({ data }) => {
      const { type, minutesDisplay, secondsDisplay, repetitions } = data;
      if (type === "display") {
        document.getElementById(
          "timer"
        )!.innerHTML = `${minutesDisplay}:${secondsDisplay}`;
      }

      if (type === "break_time") {
        document.getElementById("timeOf")!.innerHTML = "TIEMPO DE DESCANSO";
      }

      if (type === "study_time") {
        document.getElementById("timeOf")!.innerHTML = "TIEMPO DE ESTUDIO";
      }

      if (type === "finish") {
        new Audio(finish).play();
        document.getElementById("timer")!.innerHTML = "00:00";
        document.getElementById("timeOf")!.innerHTML =
          "¡TERMINASTE TUS CICLOS DE ESTUDIO!";
        worker.terminate();
        confetti({
          particleCount: 200,
          spread: 70,
          gravity: 0.5,
          ticks: 400,
        });
      }

      if (type === "alarm") {
        new Audio(alarm).play();
      }

      if (type === "new_cycle") {
        setCompletedCycles($cycles - repetitions);
        setCycles(repetitions);
      }
    };
  };

  const changeTime = () => {
    clearStore();
    worker.terminate();
  };

  return (
    <article>
      <h4 id="timeOf" class="text-xl text-center mb-10" />
      <h3 id="timer" class="text-8xl sm:text-9xl text-center font-chivo" />
      <h4 class="text-xl text-center mt-10 mb-2">Ciclos</h4>
      <div id="reps" class="flex gap-1 justify-center">
        {[...Array.from({ length: $completedCycles })].map(() => {
          return (
            <>
              <CircleFilled height={30} width={30} />
            </>
          );
        })}
        {[...Array.from({ length: $cycles })].map(() => {
          return (
            <>
              <Circle height={30} width={30} />
            </>
          );
        })}
      </div>
      <div class="flex justify-center mt-16">
        <Button title="Elegir nuevos tiempos" action={changeTime} />
      </div>
    </article>
  );
};

export default Timer;
