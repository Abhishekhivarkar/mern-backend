import exampleImage from "../../../assets/javascript.jpg";

type cardData = {
  note_id: number;
  images: string;
  is_paid: string;
  note_name: string;
  note_content: string;
  price: number;
};

type FeaturedNotesCardProp = {
  data: cardData;
};
export default function FeaturedNotesCard({ data }: FeaturedNotesCardProp) {


  return (
    <div data-aos="fade-right" className="h-60 w-50  rounded-lg  mb-10 overflow-hidden shadow-md">
      <div className="flex  h-1/2  w-full  relative  mb-1">
        <img src={data.images} alt="" className="w-full object-fill " />
        <p className={`absolute top-4 right-3 font-semibold rounded-full text-[10px] ${ data.is_paid ? "bg-amber-300" : "bg-green-300"} px-1 shadow`}>
          {data.is_paid ? "Premium" : "Free"}
        </p>
      </div>
      <div className="p-3">
        <p className="font-bold text-[15px] truncate">{data.note_name}</p>
        <p className="text-[10px] font-semibold text-justify truncate">{data.note_content}</p>
        <div className="flex justify-between items-center mt-3">
          <div className="h-5 w-5 rounded-full overflow-hidden mt-auto">
            <img
              src={exampleImage}
              alt=""
              className="w-full h-full object-fill"
            />
          </div>
          <div className="font-bold">RS.{Number(data.price)}</div>
        </div>
      </div>
    </div>
  );
}
