import HomeNavigationIcon from "./HomeNavigationIcon";
import AllNotesSearchBar from "./AllNotesSearchBar";
import NotesCatalog from "./NotesCatalog";

interface Props {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  isPaid: boolean | null;
  otherFilter: "featured" | "pinned" | null;
}
export default function AllNotesSection({
  category,
  minPrice,
  maxPrice,
  isPaid,
  otherFilter,
}: Props) {
  return (
    <div className=" border border-gray-200  w-full">
      <HomeNavigationIcon />
      <AllNotesSearchBar />
      <NotesCatalog
        category={category}
        minPrice={minPrice}
        maxPrice={maxPrice}
        isPaid={isPaid}
        otherFilter={otherFilter}
      />
    </div>
  );
}
