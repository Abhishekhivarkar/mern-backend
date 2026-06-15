import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function AllNotesSearchBar() {
  const [arrow, setArrow] = useState(true);
  return (
    <div>
      <div className="flex justify-between">
        <p>Discover and access high-quality notes shared by students</p>
        <div className="flex gap-2  items-start">
          <p className=" text-[12px] font-semibold">Sort By</p>
          <div>
            <div className="border flex justify-end w-30 rounded-tr-md rounded-tl-md border-gray-400">
              <button
                onClick={() => setArrow(!arrow)}
                className={`${arrow ? "rotate-0" : "rotate-180"} transform-all duration-500 ease-in-out`}
              >
                <RiArrowDropDownLine />
              </button>
            </div>

            <div className="shadow-md">
              <div className="w-full border border-gray-400 text-[10px]  px-3 ">
                Newest
              </div>

              <div className="w-full border  border-gray-400 text-[10px]  px-3 ">
                Oldest
              </div>

              <div className="w-full border  border-gray-400 text-[10px]  px-3 ">
                A - Z
              </div>
               <div className="w-full border  border-gray-400 text-[10px]  px-3 ">
                Price Low To High
              </div>
               <div className="w-full border  border-gray-400 text-[10px]  px-3 ">
                Price High To Low
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
