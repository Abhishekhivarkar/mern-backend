import FeaturedNotesCard from "./FeaturedNotesCard";



import { useGetAllFeaturedNotes } from "../../notes/hooks/useGetAllFeaturedNotes";

type ResponseType = {
    note_id: number;
  images: string;
  is_paid: string;
  note_name: string;
  note_content: string;
  price: number;
}

export default function FeaturedNotesSection() {


    const {
        data
    } = useGetAllFeaturedNotes()
  
   

  return (
    <div className="">
        <div className="flex justify-between mb-10 px-15">
            <p className="font-bold">Featured Notes</p>
            <a className="font-medium text-blue-600"href="">View All</a>
        </div>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-5 justify-items-center">
            {
                data?.data?.map((i:ResponseType)=>{
                    
                    return(
                        <FeaturedNotesCard data={i} key={i.note_id}/>
                    )
                })
            }
        
        </div>
    </div>
  )
}
