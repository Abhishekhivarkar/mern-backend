const ProgrammingLogo = () => {
  return <div>{"</>"}</div>;
};

// interface Notes{
//     logo:Element,
//     name:string,
//     values:string
// }
const notes = [
  {
    logo: <ProgrammingLogo />,
    name: "Programming",
    values: "1000+ Notes",
  },
  {
    logo: <ProgrammingLogo />,
    name: "Data Structure",
    values: "1000+ Notes",
  },
  {
    logo: <ProgrammingLogo />,
    name: "College Notes",
    values: "1000+ Notes",
  },
  {
    logo: <ProgrammingLogo />,
    name: "Web Develpoment",
    values: "1000+ Notes",
  },
  {
    logo: <ProgrammingLogo />,
    name: "Database",
    values: "1000+ Notes",
  },
  {
    logo: <ProgrammingLogo />,
    name: "View All",
    values: "1000+ Notes",
  },
];

const getColorClass = (name:string) =>{
    switch(name){
          case "Programming":
      return "bg-blue-700";

    case "Data Structure":
      return "bg-green-700";

    case "College Notes":
      return "bg-yellow-500";

    case "Web Develpoment":
      return "bg-red-400";

    case "Database":
      return "bg-blue-500";

    default:
      return "bg-violet-500";
  }
}
export const CategoriesSection = () => {
  return (
    <div className="bg-white mt-4">
      <div className="flex flex-col items-center mb-3">
        <h1 className="text-black  ">Popular Categories</h1>
        <div className="text-violet-500  rounded font-bold ">{"_______"}</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-5 ">
        {notes.map((i) => {
          return (
            <>
              <div className="flex flex-col justify-center items-center bg-gray-50 py-4 shadow">
                <div className={` rounded py-2 px-1  text-white ${getColorClass(i.name)} `}>
                  {i.logo}
                </div>
                <p className="font-bold text-sm ">{i.name}</p>
                <p>{i.values}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
