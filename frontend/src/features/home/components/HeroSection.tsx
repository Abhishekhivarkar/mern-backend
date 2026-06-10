import { CgNotes } from "react-icons/cg";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { IoMdHappy } from "react-icons/io";

import { FaRegUser } from "react-icons/fa";
import bookImage from "../../../assets/books.png"
const content = [
  {
    logo: <GrNotes />,
    value: "10K+",
    name: "Notes",
  },
  {
    logo: <IoMdHappy />,
    value: "5K+",
    name: "Happy Users",
  },
  {
    logo: <FaRegUser />,
    value: "100+",
    name: "Top Sellers",
  },
];
export const HeroSection = () => {
  return (
    <div className="flex justify-between pt-7 bg-gray-100 p-8">
      <div className="flex flex-col w-1/2 pl-2 mt-3">
        <h6 className="rounded-full border font-extralight h-6 text-[12px] px-2 bg-violet-100 flex items-center gap-2 mb-3 w-40">
          <div className=" text-violet-500">
            <CgNotes />
          </div>
          <span className="text-violet-500 font-medium">
            Your Notes, Your Way
          </span>
        </h6>
        <div className="font-bold text-[30px] md:text-[50px] leading-tight md:mb-6">
          <h1 className="text-black">Learn Better.</h1>
          <h1 className="text-black">
            Share <span className="text-violet-500">Smarter</span>.
          </h1>
        </div>

        <h6 className="text-black mb-5">
          Discover high-quality notes, study materials and resources from
          students and experts.
        </h6>
        <div className="md:flex gap-4 ">
          <div className="bg-blue-800 rounded-md px-2 py-1 flex justify-center items-center gap-2">
            <button>Explore Notes </button>
            <FaArrowRight />
          </div>

          <div className="border border-blue-800 rounded-md flex justify-center items-center text-blue-800 px-2 py-1">
            <MdOutlineFileUpload />

            <button className="">Sell Your Notes</button>
          </div>
        </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {content.map((i) => {
          return (
            <div className="flex items-center gap-2 mt-7">
              <div className="rounded-full bg-violet-100 text-violet-900 p-1">
                {i.logo}
              </div>
              <div className="text-black leading-none">
                <p className="font-bold">{i.value}</p>
                {i.name}
              </div>
            </div>
          );
        })}
        </div>
      </div>
      <div className="w-1/2  flex justify-center ">
      <img src={bookImage} alt="Book Image" className="size-[px]" />
      </div>
    </div>
  );
};
