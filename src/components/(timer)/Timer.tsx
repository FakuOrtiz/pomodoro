import { useEffect } from "preact/hooks";
import { useStore } from "@nanostores/preact";
import confetti from "canvas-confetti";
import Circle from "../../assets/svgs/Circle";
import CircleFilled from "../../assets/svgs/CircleFilled";
import Button from "./Button";
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

const Timer = () => {
  const $studyTime = useStore(studyTime);
  const $breakTime = useStore(breakTime);
  const $cycles = useStore(cycles);
  const $isRunning = useStore(isRunning);
  const $completedCycles = useStore(completedCycles);
  let worker = new Worker(
    new URL("/src/services/timerWorker.ts", import.meta.url),
    { type: "module" }
  );

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
        const el = document.getElementById("timer");
        if (el) {
          el.innerHTML = `${minutesDisplay}:${secondsDisplay}`;
        } else {
          worker.terminate();
          return;
        }
      }

      if (type === "break_time") {
        const el = document.getElementById("timeOf");
        if (el) {
          el.innerHTML = "TIEMPO DE DESCANSO";
        } else {
          worker.terminate();
          return;
        }
      }

      if (type === "study_time") {
        const el = document.getElementById("timeOf");
        if (el) {
          el.innerHTML = "TIEMPO DE ESTUDIO";
        } else {
          worker.terminate();
          return;
        }
      }

      if (type === "finish") {
        const audio = document.getElementById("finish") as HTMLAudioElement;
        if (audio) {
          audio.play();
        } else {
          worker.terminate();
          return;
        }
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
        const audio = document.getElementById("alarm") as HTMLAudioElement;
        if (audio) {
          audio.play();
        } else {
          worker.terminate();
          return;
        }
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
      <audio preload="auto" id="alarm" src={alarm} />
      <audio preload="auto" id="finish" src={finish} />
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
