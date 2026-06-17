import { useState } from 'react'
import { IoIosArrowDropdown } from 'react-icons/io';
import { useGetNotesStats } from '../hooks/useGetNotesStats';

export default function NotesOtherFilter() {
     const [otherFeatureToggle, setOtherFeatureToggle] = useState(true);

     const {data} = useGetNotesStats()

    
return (
  <div className={`flex flex-col ${otherFeatureToggle ? "gap-2" : "gap-0"} transition-all duration-500`}>
    <div className="flex justify-between">
      <p>Other Filters</p>
      <button
        onClick={() => setOtherFeatureToggle(!otherFeatureToggle)}
        className={`${otherFeatureToggle ? "rotate-0" : "rotate-180"} transition-all duration-500 ease-in-out`}
      >
        <IoIosArrowDropdown />
      </button>
    </div>
    <div
      className={`flex flex-col gap-2 overflow-hidden transition-all duration-500 ease-in-out
        ${otherFeatureToggle ? "opacity-100 max-h-40" : "opacity-0 max-h-0"}
      `}
    >
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <input type="radio" name="size" className="radio-box" />
          <label htmlFor="featured">Featured Notes</label>
        </div>
        <p className="notes-counter-bg">{data?.data?.stats?.featured_notes}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <input type="radio" name="size" className="radio-box" />
          <label htmlFor="pinned">Pinned Notes</label>
        </div>
        <p className="notes-counter-bg">{data?.data?.stats?.pinned_notes}</p>
      </div>
    </div>
  </div>
)
}
