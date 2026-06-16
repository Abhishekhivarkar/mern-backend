
import { useState } from 'react';
import { IoIosArrowDropdown } from 'react-icons/io';


import { useGetNotesStats } from '../hooks/useGetNotesStats';

export default function NotesAvailabilityFilter() {

      const [availabilityToggle, setAvailabilityToggle] = useState(true);

      const {data} = useGetNotesStats() 

   
  return (
    <>
      <div className="flex justify-between">
              <div>Availability</div>
              <button
                onClick={() => setAvailabilityToggle(!availabilityToggle)}
                className={`${availabilityToggle ? "rotate-0" : "rotate-180"} transform-all duration-500 ease-in-out`}
              >
                <IoIosArrowDropdown />
              </button>
            </div>
    
            <div
              className={`${availabilityToggle ? "max-h-screen opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"} transform-all duration-500 ease-in-out`}
            >
              <div className="flex justify-between ">
                <div className="flex items-center gap-2 justify-center">
                  <input type="radio" name="size" className="radio-box" />
                  <label htmlFor="size"> Free Notes</label>
                </div>
                <p className="notes-counter-bg">{data?.data?.stats?.free_notes}</p>
              </div>
              <div className="flex justify-between py-2">
                <div className="flex gap-2 items-center">
                  <input type="radio" name="size" className="radio-box" />
                  <label htmlFor="">Paid Notes</label>
                </div>
    
                <p className="notes-counter-bg">{data?.data?.stats?.paid_notes}</p>
              </div>
            </div>
    
    </>
  )
}
