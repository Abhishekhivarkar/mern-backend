import { FaArrowAltCircleRight } from "react-icons/fa";
import sellerImage from "../../../assets/seller.png";

export default function SellerSection() {
  return (
    <div className="w-full flex justify-center   ">
      <div className="bg-[#f5f4fe] w-5/6 flex gap-3 items-center rounded-xl py-2">
        <img src={sellerImage} className="size-50 w-1/2" alt="" />
        <div className="w-1/2 flex flex-col gap-3">
        <div>
             <p className="font-bold text-[10px] md:text-[30px]">Share Your Knowledge.</p>
          <p className="font-bold text-[10px] md:text-[30px]">Earn with Evert Sale!</p>
        </div>
         

          <p className="text-[10px] font-semibold text-gray-500">Upload your notes and reach thousands of learners</p>

    
        
            <button className="bg-blue-700 text-white py-1 px-2 rounded-lg flex items-center gap-3 w-3/5 text-[5px] md:text-[15px] md:w-[180px] w-[80px] justify-center">
              Start Selling Notes
              <FaArrowAltCircleRight />
            </button>
       
        
        </div>
      </div>
    </div>
  );
}
