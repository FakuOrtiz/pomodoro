interface IProps {
  title: string;
  action: () => void;
}

const Button = (props: IProps) => {
  const { title, action } = props;
  return (
    <button
      class="border-[var(--secondary)] border-2 rounded-lg px-4 py-1"
      onClick={action}
    >
      {title}
    </button>
  );
};

export default Button;
