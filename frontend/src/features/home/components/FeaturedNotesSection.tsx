import FeaturedNotesCard from "./FeaturedNotesCard";
import exampleImage from "../../../assets/javascript.jpg"
const cardData =[


    {
        id:1,
    img:exampleImage,
    premium:"Premium",
    content:"Detailed notes on react components with examples",
    title:"React Complete Notes",
    price:100
},
    { id:2,
    img:exampleImage,
    premium:"Premium",
    content:"Detailed notes on react components with examples",
    title:"React Complete Notes",
    price:100
},
{    id:3,
    img:exampleImage,
    premium:"Premium",
    content:"Detailed notes on react components with examples",
    title:"React Complete Notes",
    price:100
},
{id:4,
    img:exampleImage,
    premium:"Premium",
    content:"Detailed notes on react components with examples",
    title:"React Complete Notes",
    price:100
},
{ id:5,
    img:exampleImage,
    premium:"Premium",
    content:"Detailed notes on react components with examples",
    title:"React Complete Notes",
    price:100
},

] 

export default function FeaturedNotesSection() {
  return (
    <div className="mt-15">
        <div className="flex justify-between mb-10 px-15">
            <p className="font-bold">Featured Notes</p>
            <a className="font-medium text-blue-600"href="">View All</a>
        </div>
        <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-5 justify-items-center">
            {
                cardData.map((i)=>{
                    return(
                        <FeaturedNotesCard data={i} key={i.id}/>
                    )
                })
            }
        
        </div>
    </div>
  )
}
