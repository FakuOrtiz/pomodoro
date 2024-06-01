interface IProps {
  minutes: number[];
  selectedMinutes: number;
  setSelectedMinutes: (m: number) => void;
  title: string
}

const MinuteSelector = (props: IProps) => {
  const { minutes, selectedMinutes, setSelectedMinutes, title } = props;

  const changeMinutes = (m: number) => {
    if (selectedMinutes === m) {
      return setSelectedMinutes(0);
    }
    setSelectedMinutes(m);
  };

  return (
    <>
      <h2 class="text-center py-1">{title}</h2>
      <div class="grid grid-cols-3 place-items-center gap-5 my-4">
        {minutes.map((m) => {
          return (
            <button
              class={`rounded-lg border-2 w-14 checked:bg-black ${
                selectedMinutes === m &&
                "bg-[var(--secondary)] text-[var(--primary)] border-[var(--secondary)]"
              }`}
              onClick={() => changeMinutes(m)}
            >
              {m}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default MinuteSelector;
