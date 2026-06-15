
import { useGetNotesCategoriesCount } from "../hooks/useGetNotesCategoryCount";

import { Loader } from "../../../common/components/IsLoading";

import NotesSerachBar from "./NotesSerachBar";
import NotesCategoryFilter from "./NotesCategoryFilter";

import NotesPriceRangeFilter from "./NotesPriceRangeFilter";
import NotesAvailabilityFilter from "./NotesAvailabilityFilter";
import NotesOtherFilter from "./NotesOtherFilter";

export default function NotesFilterSection() {
  const { isLoading } = useGetNotesCategoriesCount();

  
 
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="shadow w-fit p-3 flex flex-col gap-3">
      <div className="flex justify-between">
        <h1 className="font-bold">Filters</h1>
        <h4 className="text-purple-700 font-semibold cursor-pointer">
          Reset All
        </h4>
      </div>
      <hr className="opacity-20" />
      <NotesSerachBar />
      {/* category section */}
      <div className="flex flex-col gap-3">
        <NotesCategoryFilter />
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
