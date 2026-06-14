import { CgNotes } from "react-icons/cg";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { IoMdHappy } from "react-icons/io";

import { FaRegUser } from "react-icons/fa";
import bookImage from "../../../assets/books.png";


import {CountUp} from "@sdawit/react-countup-lite"
import { Loader } from "../../../common/components/IsLoading";
import { useGetNotes } from "../../notes/hooks/useGetNotes";
console.log(CountUp)
export const HeroSection = () => {
  const { data, isLoading } = useGetNotes();

  const totalNotes = data?.data?.total;

  console.log(typeof totalNotes, totalNotes)
  if (isLoading) {
    return <Loader />;
  }
  const content = [
    {
      id: 1,
      logo: <GrNotes />,
      value: totalNotes || 0,
      suffix: "+",
      name: "Notes",
    },
    {
      id: 2,
      logo: <IoMdHappy />,
      value: 5000,
      suffix: "+",
      name: "Happy Users",
    },
    {
      id: 3,
      logo: <FaRegUser />,
      value: 100,
      suffix: "+",
      name: "Top Sellers",
    },
  ];
  return (
    <div className="flex justify-between pt-7 bg-[#f6f4fd] p-8">
      <div className="flex flex-col w-1/2 pl-2 ">
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
          <div className="bg-blue-800 rounded-md px-2 py-1 flex justify-center items-center gap-2 text-white mb-3 md:mb-0 lg:mb-0">
            <button className="">Explore Notes </button>
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
              <div className="flex items-center gap-2 mt-7" key={i.id}>
                <div className="rounded-full bg-violet-100 text-violet-900 p-1">
                  {i.logo}
                </div>
                <div className="text-black leading-none">
                  <CountUp end={Number(i.value) || 0} duration={2} suffix={i.suffix}/>
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
