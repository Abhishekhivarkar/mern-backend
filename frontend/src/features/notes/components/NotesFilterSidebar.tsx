import NotesCategoryFilter from "./NotesCategoryFilter";

import NotesPriceRangeFilter from "./NotesPriceRangeFilter";
import NotesAvailabilityFilter from "./NotesAvailabilityFilter";
import NotesOtherFilter from "./NotesOtherFilter";

interface Props {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedMinPrice: number | null;
  selectedMaxPrice: number | null;
  onMinPriceChange: (minPrice: number | null) => void;

  onMaxPriceChange: (maxPrice: number | null) => void;

  selectedIsPaid:boolean | null,
  onChangeIsPaid:(isPaid:boolean | null) => void
  selectedOtherFilter:"featured" | "pinned" | null
  onOtherFilterChange:(otherFilter : "featured" |"pinned" | null) => void



}
export default function NotesFilterSection({
  selectedCategory,
  onCategoryChange,
  selectedMinPrice,
  selectedMaxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  selectedIsPaid,
  onChangeIsPaid,
  selectedOtherFilter,
  onOtherFilterChange
}: Props) {
  return (
    <div className="shadow w-fit p-3 flex flex-col gap-3">
      <div className="flex justify-between">
        <h1 className="font-bold">Filters</h1>
        <h4 className="text-purple-700 font-semibold cursor-pointer">
          Reset All
        </h4>
      </div>
      <hr className="opacity-20 w-65" />

      {/* category section */}
      <div className="flex flex-col gap-3">
        <NotesCategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
        <hr className="opacity-20" />

        {/* price range section */}
        <NotesPriceRangeFilter
          selectedMinPrice={selectedMinPrice}
          selectedMaxPrice={selectedMaxPrice}
          onMinPriceChange={onMinPriceChange}
          onMaxPriceChange={onMaxPriceChange}
        />
        <hr className="opacity-20" />
        {/* availability section */}
        <NotesAvailabilityFilter 
        selectedIsPaid={selectedIsPaid}
        onChangeIsPaid={onChangeIsPaid}
        />
        <hr className="opacity-20" />
        {/* other filters */}
        <NotesOtherFilter 
        selectedOtherFilter={selectedOtherFilter}
        onSelectedOtherFilter={onOtherFilterChange}
      
        />
      </div>
    </div>
  );
}
