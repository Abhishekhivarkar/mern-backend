import { useState } from 'react'


import { IoIosArrowDropdown } from 'react-icons/io';
import { categoryName, getCategoryLogo, getColorClass } from '../../home/components/CategoryHelper';
import { useGetNotesStats } from '../hooks/useGetNotesStats';
import { CgMenuGridO } from 'react-icons/cg';
import { useGetNotes } from '../hooks/useGetNotes';
import { getNoteApi } from '../api/note.api';

type ResponseType = {
  id:number,
  category:string,
  count:string
}

interface Props {
  selectedCategory:string,
  onCategoryChange:(category:string) => void
}
export default function NotesCategoryFilter({
  selectedCategory,
  onCategoryChange
}:Props) {

     const { data } = useGetNotesStats();

      const [categorySectionToggle, setCategorySectionToggle] = useState(true);
    
     const {data:noteData} = useGetNotes()

     console.log(noteData)
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
                 <div className={`flex justify-between  rounded-md cursor-pointer p-1 transition-all ${selectedCategory === i.category ? "bg-gray-300" : ""}`} key={i.id} onClick={()=>onCategoryChange(i.category)}>
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
          <div className='flex justify-between px-1 ' onClick={getNoteApi}>
  <div className='flex items-center gap-3'>
    <CgMenuGridO className='bg-violet-400 text-[22px] rounded-md text-white' />
    <span>View All</span>
  </div>

  <div className="notes-counter-bg">
    {noteData?.data?.total}
  </div>
</div>
   
   </>
  )
}
