import { useState } from 'react'

import { Loader } from '../../../common/components/IsLoading';
import { IoIosArrowDropdown } from 'react-icons/io';
import { categoryName, getCategoryLogo, getColorClass } from '../../home/components/CategoryHelper';
import { useGetNotesStats } from '../hooks/useGetNotesStats';

type ResponseType = {
  id:number,
  category:string,
  count:string
}

export default function NotesCategoryFilter() {

     const { data, isLoading } = useGetNotesStats();

      const [categorySectionToggle, setCategorySectionToggle] = useState(true);
    
      if(isLoading){
        return <Loader/>
      }
  return (
   <>
         <div className="flex justify-between ">
             <p>Category</p>
             <button
               onClick={() => setCategorySectionToggle(!categorySectionToggle)}
               className={`${categorySectionToggle ? "rotate-0" : "rotate-180"}
               
                transition-transform duration-500 ease-in-out cursor-pointer`}
             >
               <IoIosArrowDropdown />
             </button>
           </div>
           <div
             className={`overflow-hidden flex flex-col gap-2 ${
               categorySectionToggle
                 ? "max-h-screen opacity-100 translate-y-0"
                 : "max-h-0 opacity-0 -translate-y-4"
             }
               
               transition-all duration-500 ease-in-out`}
           >
             {data?.data?.categories?.map((i:ResponseType) => {
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
   
                   <div className="notes-counter-bg">{i.count}</div>
                 </div>
               );
             })}
           </div>
   
   </>
  )
}
