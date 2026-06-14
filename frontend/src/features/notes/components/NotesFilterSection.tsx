import React, { useState } from "react";
import { useGetNotesCategoriesCount } from "../hooks/useGetNotesCategoryCount";
import { Loader } from "../../../common/components/IsLoading";
import {
  categoryName,
  getCategoryLogo,
  getColorClass,
} from "../../home/components/CategoryHelper";

export default function NotesFilterSection() {
  const { data, isLoading } = useGetNotesCategoriesCount();

  const [categorySection, setCategorySection] = useState(false);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="shadow w-fit p-3 flex flex-col gap-3">
      <div className="flex justify-between">
        <h1 className="font-bold">Filters</h1>
        <h4 className="text-purple-700 font-semibold">Reset All</h4>
      </div>
      <hr className="opacity-20" />
      <div className="flex flex-col gap-3">
        <p className="font-bold text-[14px]">Search</p>
        <input
          type="text"
          placeholder="Search notes..."
          className="peer border rounded-md
        px-10  py-2 pl-4 outline-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between ">
          <p>Category</p>
          <button
            onClick={() => setCategorySection(!categorySection)}
            className={`${categorySection ? "rotate-180" : "rotate-0"}
            
             transition-transform duration-500 ease-in-out`}
          >
            ^
          </button>
        </div>
        <div
          className={`overflow-hidden flex flex-col gap-2 ${
            categorySection
              ? "max-h-screen opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4"
          }
            
            transition-all duration-500 ease-in-out`}
        >
          {data?.data?.map((i) => {
            return (
              <div className="flex justify-between" key={i.id}>
                <div className="flex gap-2">
                  <div
                    className={`${getColorClass(i.category)} text-white rounded-lg`}
                  >
                    <div className="px-1 py-1 rounded-full">
                      {" "}
                      {getCategoryLogo(i.category)}
                    </div>
                  </div>
                  <div>{categoryName(i.category)}</div>
                </div>

                <div className="bg-gray-200 px-2 rounded-xl">{i.count}</div>
              </div>
            );
          })}
        </div>

        <hr className="shadow" />
          {/* price range */}
        <div>
          <div className="flex justify-between">
            <p> Price Range</p>
            <p>^</p>
          </div>

          <div className="flex justify-between items-center">
            <input
              type="number"
              placeholder="₹ 0"
              className="border py-2 w-21 rounded-lg pl-2"
            />
            <p className="">to</p>
            <input
              type="number"
              placeholder="₹ 0"
              className="border py-2 w-21 rounded-lg pl-2"
            />
          </div>
          <input type="range" className="w-full h-1 " />
          <div className="flex gap-1 justify-center ">
            <button className="rounded-lg border border-gray-200 px-2 text-[12px]">
              ₹0 - ₹100
            </button>
            <button className="rounded-lg border border-gray-200 px-2   text-[12px]">₹100 - ₹500</button>
            <button className="rounded-lg border border-gray-200 px-2  text-[12px]">₹500+</button>
          </div>
        </div>
      </div>
    </div>
  );
}
