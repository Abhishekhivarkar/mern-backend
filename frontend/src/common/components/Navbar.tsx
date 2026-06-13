import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { LogoutButton } from "../../features/auth/components/LogoutButton";
import BrandLogo from "./BrandLogo";
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
<nav className="bg-[#fefefe] text-black shadow-lg">
  <div className="flex justify-between items-center w-full p-4">
    {/* logo div */}
    <div className="flex justify-between items-center w-full md:w-auto">
      <BrandLogo/>


      <button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AiOutlineMenu />
      </button>
    </div>
<div className="flex justify-between items-center gap-9">
    {/* desktop menu div */}
    <div className="hidden md:block">
      <ul className="flex gap-6">
        <li>Notes</li>
        <li>Category</li>
        <li>Become Seller</li>
        <li>Pricing</li>
      </ul>
    </div>

    {/* desktop search div */}
    <div className="hidden md:block border rounded-full ">
      <input type="text" className="border-none outline-none pl-3 " placeholder="Search notes..." />
    </div>
    <div className="hidden md:block">
      <LogoutButton/>
    </div>
    
  </div>
</div>
  {isOpen && (
    <div className="md:hidden pl-4 pt-3 pr-4 pb-4">
      <div className="border rounded-full h-10 mb-4 flex items-center pl-3">
        <input type="text" className ="w-full border-none outline-none"placeholder="Search notes..."/>
      </div>

      <div className="font-medium">
        <ul className="">
          <li>Notes</li>
          <li>Category</li>
          <li>Become seller</li>
          <li>Pricing</li>
        </ul>
      </div>
      <div className="pt-2">
        <LogoutButton/>
      </div>
    </div>
  )}
</nav>
      </>
  );
};



