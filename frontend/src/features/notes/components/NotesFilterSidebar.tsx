


import NotesCategoryFilter from "./NotesCategoryFilter";

import NotesPriceRangeFilter from "./NotesPriceRangeFilter";
import NotesAvailabilityFilter from "./NotesAvailabilityFilter";
import NotesOtherFilter from "./NotesOtherFilter";

interface Props{
  selectedCategory: string;
  onCategoryChange: (category:string) => void
}
export default function NotesFilterSection({selectedCategory,onCategoryChange}:Props) {


  
 

  return (
    <div className="shadow w-fit p-3 flex flex-col gap-3">
      <div className="flex justify-between">
        <h1 className="font-bold">Filters</h1>
        <h4 className="text-purple-700 font-semibold cursor-pointer">
          Reset All
        </h4>
      </div>
      <hr className="opacity-20" />
      
      {/* category section */}
      <div className="flex flex-col gap-3">
        <NotesCategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        />
        <hr className="opacity-20" />

        {/* price range section */}
        <NotesPriceRangeFilter/>
        <hr className="opacity-20" />
        {/* availability section */}
          <NotesAvailabilityFilter/>
        <hr className="opacity-20" />
        {/* other filters */}
        <NotesOtherFilter/>
       
      </div>
    </div>
  );
}
