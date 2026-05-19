import Dropdown from "../../../../components/dropdown/Dropdown";
import { sortOptions } from "../../utils/MainPageDummy";
import "./FilterBar.css";

export default function FilterBar({
  selectedGenre,
  onGenreChange,
  selectedSort,
  onSortChange,
  genres,
}) {
  return (
    <div className="filter-bar">
      <Dropdown
        label="장르"
        options={genres}
        selected={selectedGenre}
        onSelect={onGenreChange}
      />
      <Dropdown
        label="정렬"
        options={sortOptions}
        selected={selectedSort}
        onSelect={onSortChange}
      />
    </div>
  );
}
