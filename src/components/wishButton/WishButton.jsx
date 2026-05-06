import "./WishButton.css";

export default function WishButton({ isWished, onClick }) {
  return (
    <button
      className={`wish-button ${isWished ? "wish-button--active" : ""}`}
      onClick={onClick}
    >
      Wish
    </button>
  );
}
