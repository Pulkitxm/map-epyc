interface Props {
  className?: string;
  onClick?: () => void;
}

function IconClose({ className, onClick }: Props) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      className={`w-6 h-6 ${className}`}
      onClick={onClick}
    >
      <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z" />
    </svg>
  );
}

export default IconClose;