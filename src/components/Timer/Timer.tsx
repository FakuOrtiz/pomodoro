import { useEffect, useState } from "preact/hooks";
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
import { playAudio, updateDisplay } from "./utils/timerUtils";

const Timer = () => {
  const $studyTime = useStore(studyTime);
  const $breakTime = useStore(breakTime);
  const $cycles = useStore(cycles);
  const $isRunning = useStore(isRunning);
  const $completedCycles = useStore(completedCycles);
  const [timeTo, setTimeTo] = useState("study");

  let worker = new Worker(
    new URL("./services/timerWorker.ts", import.meta.url),
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
    document.getElementById("time_to")!.innerHTML = "TIEMPO DE ESTUDIO";
    setTimeTo("study");

    worker.postMessage({
      $studyTime,
      $breakTime,
      $cycles,
    });

    worker.onmessage = ({ data }) => {
      const { type, minutesDisplay, secondsDisplay, repetitions } = data;

      if (type === "display") {
        updateDisplay("timer", `${minutesDisplay}:${secondsDisplay}`, worker);
      }

      if (type === "break_time") {
        updateDisplay("time_to", "TIEMPO DE DESCANSO", worker);
        setTimeTo("break");
      }

      if (type === "study_time") {
        updateDisplay("time_to", "TIEMPO DE ESTUDIO", worker);
        setTimeTo("study");
      }

      if (type === "finish") {
        playAudio("finish_audio", worker);
        updateDisplay("timer", "00:00", worker);
        updateDisplay("time_to", "¡TERMINASTE TUS CICLOS DE ESTUDIO!", worker);
        setTimeTo("finish");
        worker.terminate();
        confetti({
          particleCount: 200,
          spread: 70,
          gravity: 0.5,
          ticks: 400,
        });
      }

      if (type === "alarm") {
        playAudio("alarm_audio", worker);
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
      <audio preload="auto" id="alarm_audio" src={alarm} />
      <audio preload="auto" id="finish_audio" src={finish} />
      <h2 id="time_to" class="text-xl text-center mb-4" />
      <p class="text-center text-xl">
        {timeTo === "study" && "📚 📖 ✏️"}
        {timeTo === "break" && "☕ 🧉 🌿"}
        {timeTo === "finish" && "🎉 ✨ 🎊"}
      </p>
      <h3 id="timer" class="text-8xl sm:text-9xl text-center font-chivo my-10" />
      <h4 class="text-xl text-center mb-2">
        Ciclos completados ({$completedCycles} de {$cycles + $completedCycles})
      </h4>
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
