interface IProps {
  title: string;
  action: () => void;
  styles?: any;
}

const Button = (props: IProps) => {
  const { title, action, styles } = props;
  return (
    <button
      class={`border-[var(--secondary)] border-2 rounded-lg px-4 py-1 ${styles}`}
      onClick={action}
    >
      {title}
    </button>
  );
};

export default Button;
