const CircleFilled = (props: any) => (
  <svg
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    className="stroke-[var(--secondary)] icon icon-tabler icon-tabler-circle-filled"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path
      fill="currentColor"
      stroke="none"
      d="M7 3a10 10 0 1 1-5 9 10 10 0 0 1 5-9z"
    />
  </svg>
);
export default CircleFilled;
