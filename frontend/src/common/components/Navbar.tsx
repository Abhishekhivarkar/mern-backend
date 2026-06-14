import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { LogoutButton } from "../../features/auth/components/LogoutButton";
import BrandLogo from "./BrandLogo";
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
<nav className="bg-[#fefefe] text-black shadow-lg fixed w-full top-0 left-0 z-50">
  <div className="flex justify-between items-center w-full p-4 ">
    {/* logo div */}
    <div className="flex justify-between items-center w-full md:w-auto">
      <a href="/"> <BrandLogo /></a>
     


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
      <div className="flex gap-6">
        <a href="/notes/all">Notes</a>
        <a>Category</a>
        <a>Become Seller</a>
        <a>Pricing</a>
      </div>
    </div>

    {/* desktop search div */}
    
    <div className="hidden md:block">
      <LogoutButton/>
    </div>
    
  </div>
</div>
  
    <div className={`md:hidden pl-4 pt-3 pr-4 pb-4 absolute bg-white w-full transition-all duration-500 ease-in-out
      
      ${
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }
    `}>
    

      <div className="font-medium">
        <div className="flex flex-col text-center">
          <a href="/notes/all">Notes</a>
          <a>Category</a>
          <a>Become seller</a>
          <a>Pricing</a>
        </div>
      </div>
      <div className="pt-2 flex justify-center font-bold">
        <LogoutButton />
      </div>
    </div>
  
</nav>
      </>
  );
};



