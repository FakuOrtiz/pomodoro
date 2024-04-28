import { useStore } from "@nanostores/preact";
import {
  breakTime,
  cycles,
  isRunning,
  setBreakTime,
  setCycles,
  setIsRunning,
  setStudyTime,
  studyTime,
} from "../../store";
import MinuteSelector from "./MinuteSelector";
import Timer from "./Timer";

const WrapperMinutes = () => {
  const $studyTime = useStore(studyTime);
  const $breakTime = useStore(breakTime);
  const $cycles = useStore(cycles);
  const $isRunning = useStore(isRunning);

  return (
    <section class="my-10 max-w-full">
      {!$isRunning && (
        <article>
          <MinuteSelector
            title="Selecciona los minutos de estudio"
            minutes={[15, 25, 30, 45, 50, 60]}
            selectedMinutes={$studyTime}
            setSelectedMinutes={setStudyTime}
          />
          <MinuteSelector
            title="Selecciona los minutos de descanso"
            minutes={[5, 10, 15, 20, 25, 30]}
            selectedMinutes={$breakTime}
            setSelectedMinutes={setBreakTime}
          />
          <MinuteSelector
            title="Selecciona la cantidad de ciclos"
            minutes={[1, 2, 3, 4, 5, 6]}
            selectedMinutes={$cycles}
            setSelectedMinutes={setCycles}
          />
          <button
            disabled={!$studyTime || !$breakTime || !$cycles}
            class="bg-[var(--secondary)] text-[var(--primary)] rounded-lg px-4 py-1 disabled:opacity-40 transition flex justify-center my-8 mx-auto"
            onClick={() => setIsRunning(true)}
          >
            Iniciar
          </button>
        </article>
      )}
      {$isRunning && <Timer />}
    </section>
  );
};

export default WrapperMinutes;
