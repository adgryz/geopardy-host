import "./backButton.css";

interface IBackButtonProps {
  onClick: () => void;
  label?: string;
}

export const BackButton = ({ onClick, label = "Powrót" }: IBackButtonProps) => {
  return (
    <button type="button" className="pillBtn backButton" onClick={onClick}>
      {label}
    </button>
  );
};
