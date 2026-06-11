
import exampleImage from "../../../assets/javascript.jpg"

type cardData = {
    id:number,
    img:string,
    premium:string,
    title:string,
    content:string,
    price:number
}

type FeaturedNotesCardProp = {
    data:cardData
}
export default function FeaturedNotesCard({data}:FeaturedNotesCardProp) {
  return (
   <div className="h-60 w-50  rounded-lg  mb-10 overflow-hidden shadow-md" >
        <div className="flex  h-1/2  w-full  relative  mb-1">
            <img src={data.img} alt="" className="w-full object-fill "/>
            <p className="absolute top-4 right-3 font-semibold rounded-full border text-[10px] bg-amber-300 px-1 ">{data.premium}</p>
        </div>
        <div className="p-3">
        <p className="font-bold text-[15px]">{data.title}</p>
        <p className="text-[10px] font-semibold text-justify">{data.content}</p>
        <div className="flex justify-between items-center mt-3">
            <div className="h-5 w-5 rounded-full overflow-hidden"><img src={exampleImage} alt="" className="w-full h-full object-fill" /></div>
            <div className="font-bold">RS.{data.price}</div>
        </div>
        </div>
    </div>
  )
}
