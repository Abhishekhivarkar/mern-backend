import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { BsLightningFill } from "react-icons/bs";
import { MdWorkspacePremium } from "react-icons/md";
const data = [
  {
    id: 1,
    logo: <IoShieldCheckmarkSharp/>,
    text: "Secure Payments",
    sub_text: "100% secure transactions and data protection",
  },
  {
    id: 2,
    logo: <BsLightningFill />,
    text: "Instant Access",
    sub_text: "Get immediate access to purchased notes",
  },
  {
    id: 3,
    logo: <MdWorkspacePremium />
,
    text: "Quality Content",
    sub_text: "Top quality notes from verified sellers and experts",
  },
];


const color = (i:number) =>{
    switch(i){
      case 1:
        return "bg-violet-200"
      case 2:
        return "bg-green-200"
      case 3:
        return "bg-orange-200"
    }
}

export default function WhyChooseUse() {
  return (
    <div className=" bg-[#f9fafe] p-4 ">
      <h5 className="text-center font-bold mb-5 ">Why Choose NoteHub?</h5>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-4 md:gap-1 ">
        {data.map((i) => {
          return (
            <div data-aos="fade-up" className="flex items-center  md:gap-3  w-60  gap-4">

              <div className={`py-3 px-3 rounded-full ${color(i.id)} `} >{i.logo }</div>
              <div>
                <p className="font-semibold text-[12px]">{i.text}</p>
                <p className="font-semibold text-gray-600">
                  {i.sub_text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
