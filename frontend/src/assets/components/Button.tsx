interface ButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;  // Rendre onClick optionnel
}

const Button = ({ text, onClick, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
    >
      {text}
    </button>
  );
};

export default Button;
