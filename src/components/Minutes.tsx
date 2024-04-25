import { useState } from "preact/hooks";

const Minutes = (props: { title: string; minutes: number[] }) => {
  const { title, minutes } = props;
  const [minutesSelected, setMinutesSelected] = useState(0);

  const changeMinutes = (m: number) => {
    if (minutesSelected === m) {
      return setMinutesSelected(0);
    }

    setMinutesSelected(m);
  };

  return (
    <>
      <h2>Selecciona los minutos de {title}</h2>
      <article class="flex items-center justify-center gap-5 my-4">
        {minutes.map((m) => {
          return (
            <button
              class={`rounded-lg border-2 w-14 checked:bg-black ${
                minutesSelected === m
                  ? "bg-[var(--secondary)] text-[var(--primary)] border-[var(--secondary)]"
                  : ""
              }`}
              onClick={() => changeMinutes(m)}
            >
              {m}
            </button>
          );
        })}
      </article>
    </>
  );
};

export default Minutes;
