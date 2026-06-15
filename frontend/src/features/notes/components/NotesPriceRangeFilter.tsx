import { useState } from 'react'
import { IoIosArrowDropdown } from 'react-icons/io';

export default function NotesPriceRangeFilter() {
const [priceRangeSectionToggle, setPriceRangeSectionToggle] = useState(true);


  return (
     <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <p> Price Range</p>
                <button
                  onClick={() =>
                    setPriceRangeSectionToggle(!priceRangeSectionToggle)
                  }
                  className={`${priceRangeSectionToggle ? "rotate-0" : "rotate-180"} transform-all duration-500 ease-in-out`}
                >
                  <IoIosArrowDropdown />
                </button>
              </div>
    
              <div
                className={`${priceRangeSectionToggle ? "opacity-100 translate-y-0 max-h-screen" : "opacity-0 -translate-y-4 max-h-0"} transform-all duration-500 ease-in-out flex flex-col gap-4`}
              >
                <div className={`flex justify-between items-center `}>
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
                  <button className="price-filter-bg">₹0 - ₹100</button>
                  <button className="price-filter-bg">₹100 - ₹500</button>
                  <button className="price-filter-bg">₹500+</button>
                </div>
              </div>
            </div>
    
  )
}
