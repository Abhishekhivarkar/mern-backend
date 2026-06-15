import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function AllNotesSearchBar() {
  const [arrow, setArrow] = useState(true);

  return (
    <div>
      <div className="flex justify-between  ">
        <p>Discover and access high-quality notes shared by students</p>
        <div className="flex gap-2  items-start">
          <p className=" text-[12px] font-semibold">Sort By</p>
          <div className="relative">
            <div className="border flex justify-end w-30 rounded-tr-md rounded-tl-md border-gray-400 ">
              <button
                onClick={() => setArrow(!arrow)}
                className={`${arrow ? "rotate-0" : "rotate-180"} transition-all duration-500 ease-in-out`}
              >
                <RiArrowDropDownLine className=" cursor-pointer"/>
              </button>
            </div>

            <div
              className={`shadow-md 
              ${arrow ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none "}
             transition-all duration-500 ease-in-out absolute bg-white`}
            >
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

      <div className="border rounded-md py-2 mt-5">
        <input
          type="text"
          placeholder="Search by note name, content, or keyword..."
          className="w-full"
        />
      </div>
    </div>
  );
}
