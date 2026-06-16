import { useState } from 'react'
import { IoIosArrowDropdown } from 'react-icons/io';
import { useGetNotesStats } from '../hooks/useGetNotesStats';

export default function NotesOtherFilter() {
     const [otherFeatureToggle, setOtherFeatureToggle] = useState(true);

     const {data} = useGetNotesStats()

    
   return (
     <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <p>Other Filters</p>
                <button
                  onClick={() => setOtherFeatureToggle(!otherFeatureToggle)}
                  className={`${otherFeatureToggle ? "rotate-0" : "rotate-180"} transform-all duration-500 ease-in-out`}
                >
                  <IoIosArrowDropdown/>
                </button>
              </div>
              <div
                className={`flex flex-col gap-2
                
    ${otherFeatureToggle ? "opacity-100 translate-y-0 max-h-screen" : "opacity-0 -translate-y-4 max-h-0"} transform-all duration-500 ease-in-out flex flex-col gap-2
    
                `}
              >
                <div className="flex justify-between ">
                  <div className="flex gap-2 items-center">
                    <input type="radio" name="size" className="radio-box " />
                    <label htmlFor="featured">Featured Notes</label>
                  </div>
                  <p className="notes-counter-bg">{data?.data?.stats?.featured_notes}</p>
                </div>
                <div className="flex justify-between ">
                  <div className="flex gap-2 items-center">
                    <input type="radio" name="size" className="radio-box " />
                    <label htmlFor="pinned">Pinned Notes</label>
                  </div>
                  <p className="notes-counter-bg">{data?.data?.stats?.pinned_notes}</p>
                </div>
              </div>
            </div>
  )
}
