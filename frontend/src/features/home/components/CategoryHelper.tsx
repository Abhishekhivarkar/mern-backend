import { FaCode, FaDatabase, FaGraduationCap, FaReact } from "react-icons/fa";
import { PiTreeStructureFill } from "react-icons/pi";

export const getCategoryLogo = (category: string) => {
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
      return <FaDatabase />;

    default:
      return "bg-violet-500";
  }
};

export const categoryName = (category: string) => {
  switch (category) {
    case "PROGRAMMING":
      return "Programming";

    case "DATA_STRUCTURE":
      return "Data Structure";

    case "COLLEGE_NOTES":
      return "College Notes";

    case "WEB_DEVELOPMENT":
      return "Web Development";

    case "DATABASE":
      return "Database";

    default:
      return "View All";
  }
};
export const getColorClass = (category: string) => {
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
