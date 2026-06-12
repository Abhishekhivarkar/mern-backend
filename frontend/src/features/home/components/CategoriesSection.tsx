import { Loader } from "../../../common/components/IsLoading";
import { useGetNotesCategoriesCount } from "../../notes/hooks/useCreateNote";
import { FaCode } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";
import { PiTreeStructureFill } from "react-icons/pi";
import { FaReact } from "react-icons/fa";
import { CgMenuGridO } from "react-icons/cg";
import { FaGraduationCap } from "react-icons/fa";

type ResponseType = {
  id:number,
  category:string,
  count:string
}
const getCategoryLogo = (category: string) => {
  switch (category) {
    case "PROGRAMMING":
      return <FaCode />;

    case "DATA_STRUCTURE":
      return <PiTreeStructureFill />;

    case "COLLEGE_NOTES":
      return <FaGraduationCap />;

    case "WEB_DEVELOPMENT":
      return <FaReact />;

    case "DATABASE":
      return <FaDatabase />
;

    default:
      return "bg-violet-500";
  }
};

const getColorClass = (category: string) => {
  switch (category) {
    case "PROGRAMMING":
      return "bg-blue-700";

    case "DATA_STRUCTURE":
      return "bg-green-700";

    case "COLLEGE_NOTES":
      return "bg-yellow-500";

    case "WEB_DEVELOPMENT":
      return "bg-red-400";

    case "DATABASE":
      return "bg-blue-500";

    default:
      return "bg-violet-500";
  }
};
export const CategoriesSection = () => {
  const { data, isLoading } = useGetNotesCategoriesCount();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white mt-4 px-15">
      <div className="flex flex-col items-center mb-3">
        <h1 className="text-black  font-bold">Popular Categories</h1>
        <div className="text-violet-500  rounded font-bold ">{"_______"}</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-5">
        {data?.data?.map((i:ResponseType) => {
         
          return (
            <>
              <div
                className="flex flex-col justify-center items-center bg-gray-50 py-4 shadow gap-2"
                key={i.id}
              >
                <div
                  className={` rounded py-2 px-2  text-white  ${getColorClass(i.category)} `}
                >
                  {getCategoryLogo(i.category)}
                </div>
                <p className="font-bold text-sm ">{i.category}</p>
                <p>{i.count}</p>
              </div>
            </>
          );
        })}
         <div className="flex flex-col justify-center items-center bg-gray-50 py-4 shadow cursor-pointer">
    <div className="rounded py-2 px-2 text-white bg-violet-500">
      <CgMenuGridO />
    </div>
    <p className="font-bold text-sm">View All</p>
    <p>All Notes</p>
  </div>
      </div>
    </div>
  );
};
