import "./WishListItem.css";

export default function WishListItem({ movie }) {
  return (
    <div className="wish-list-item">
      <span className="wish-list-item__title">{movie.title}</span>
    </div>
  );
}
