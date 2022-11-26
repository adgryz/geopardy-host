import "./backButton.css";

interface IBackButtonProps {
  onClick: () => void;
}

export const BackButton = ({ onClick }: IBackButtonProps) => {
  return (
    <div className="backButton" onClick={onClick}>
      POWRÓT
    </div>
  );
};
