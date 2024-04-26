import { useState } from "preact/hooks";
import MinuteSelector from "./MinuteSelector";
import Timer from "./Timer";

const WrapperMinutes = () => {
  const [studyTime, setStudyTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [reps, setReps] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  return (
    <section class="my-10 max-w-full">
      <article class={isRunning ? "hidden" : "block"}>
        <MinuteSelector
          title="Selecciona los minutos de estudio"
          minutes={[15, 25, 30, 45, 50, 60]}
          selectedMinutes={studyTime}
          setSelectedMinutes={setStudyTime}
        />
        <MinuteSelector
          title="Selecciona los minutos de descanso"
          minutes={[5, 10, 15, 20, 25, 30]}
          selectedMinutes={breakTime}
          setSelectedMinutes={setBreakTime}
        />
        <MinuteSelector
          title="Selecciona la cantidad de ciclos"
          minutes={[1, 2, 3, 4, 5, 6]}
          selectedMinutes={reps}
          setSelectedMinutes={setReps}
        />
        <div class="flex justify-center my-8">
          <button
            disabled={!studyTime || !breakTime || !reps}
            class="bg-[var(--secondary)] text-[var(--primary)] rounded-lg px-4 py-1 disabled:opacity-40 transition"
            onClick={() => setIsRunning(true)}
          >
            Iniciar
          </button>
        </div>
      </article>
      <article class={isRunning ? "block" : "hidden"}>
        <Timer
          studyTime={studyTime}
          breakTime={breakTime}
          isRunning={isRunning}
          reps={reps}
          setStudyTime={setStudyTime}
          setBreakTime={setBreakTime}
          setIsRunning={setIsRunning}
          setReps={setReps}
        />
      </article>
    </section>
  );
};

export default WrapperMinutes;
