const Circle = (props: any) => (
  <svg
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    className="stroke-[var(--secondary)] icon icon-tabler icon-tabler-circle"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0" />
  </svg>
);
export default Circle;
