import React from "react";
import { useGetNotesCategoriesCount } from "../hooks/useGetNotesCategoryCount";
import { Loader } from "../../../common/components/IsLoading";
import {
  categoryName,
  getCategoryLogo,
  getColorClass,
} from "../../home/components/CategoryHelper";

export default function NotesFilterSection() {
  const { data, isLoading } = useGetNotesCategoriesCount();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="shadow w-fit p-3 flex flex-col gap-3">
      <div className="flex justify-between">
        <h1>Filters</h1>
        <h4 className="text-purple-700">Reset All</h4>
      </div>

      <div className="flex flex-col gap-3">
        <p>Search</p>
        <input
          type="text"
          placeholder="Search notes..."
          className="border rounded-md
        px-3  py-2 "
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between ">
          <p>Category</p>
          <p>^</p>
        </div>
        <div>
          {data?.data?.map((i) => {
            return (
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <div className={`${getColorClass(i.category)}`}>
                    {getCategoryLogo(i.category)}
                  </div>
                  <div>{categoryName(i.category)}</div>
                </div>

                <div className="bg-gray-200 px-2 rounded-xl">{i.count}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
