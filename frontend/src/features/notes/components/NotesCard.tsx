import { categoryName } from "../../home/components/CategoryHelper.js";
import type { NoteType } from "../types/note.type.js";
import { LuPinOff } from "react-icons/lu";
import { LuPin } from "react-icons/lu";
interface NoteCardProps {
  data: NoteType;
}

const categoryColor = (category: string) => {
  switch (category) {
    case "WEB_DEVELOPMENT":
      return "bg-red-200  text-red-400 ";
    case "COLLEGE_NOTES":
      return "bg-yellow-100  text-yellow-600";
    case "DATABASE":
      return "bg-violet-200  text-violet-500";
    case "PROGRAMMING":
      return "bg-blue-200  text-blue-500";
    case "DATA_STRUCTURE":
      return "bg-green-200  text-green-500";
  }
};

export default function NotesCard({ data }: NoteCardProps) {
  return (
    <div key={data.note_id} className="mt-6">
      <div className="w-61 relative rounded-xl  overflow-hidden   shadow-[0_0_10px_rgba(0,0,0,0.15)]">
        <div className="w-full">
        
          <img src={data.images} alt="" className="w-full h-34 object-fill" />
          <div className="">
            <span
              className={`absolute  top-3 left-3 rounded px-1  text-[10px] ${
                data.is_pinned
                  ? "bg-purple-400"
                  : data.is_featured
                    ? "bg-amber-500"
                    : ""
              }
              
              
              `}
            >
              {data.is_pinned ? "Pinned" : data.is_featured ? "Featured" : ""}
            </span>
            <div className="absolute top-3 right-3 bg-amber-500 rounded px-1 py-1 text-[9px] transition-all duration-500 ease-in-out ">
              {data.is_pinned ? <LuPinOff /> : <LuPin />}
            </div>
          </div>
        </div>
        <div className="px-2 ">
          <p className="font-bold text-[15px] truncate">{data.note_name}</p>
          <p className="text-[10px] font-semibold text-justify truncate">
            {data.note_content}
          </p>
          <div className="flex justify-between items-center ">
            <div
              className={`text-[10px] 
            ${categoryColor(data.category)}
            
            font-semibold rounded px-1 `}
            >
              {categoryName(data.category)}
            </div>
            <div
              className={`${data.is_paid ? "text-violet-700 font-semibold" : "text-green-600 font-semi-bold text-[12px]"}`}
            >
              {data.is_paid ? data.price : "FREE"}
            </div>
          </div>
        </div>
        <hr className="opacity-20 mt-1"/>


        <div className="p-2">
          <div className="flex items-center  gap-2 justify-between">
            <div className="flex items-center gap-2">
              <img src={data.images} alt="" className="w-5 h-5 rounded-full"/>
            <span className="font-semibold text-gray-600">Aniket Verma</span>
            </div>
                <div>
                  {data.created_at.split("T")[0]}
                </div>
          </div>

        </div>



      </div>
    </div>
  );
}
