import WishListItem from "../wishListItem/WishListItem";
import "./WishListPanel.css";

export default function WishListPanel({ wishList }) {
  return (
    <div className="wish-list-panel">
      <h2 className="wish-list-panel__title">My Wish List</h2>
      <div className="wish-list-panel__list">
        {/* 위시리스트 배열을 순회하며 아이템 생성 */}
        {wishList.map((movie) => (
          <WishListItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
