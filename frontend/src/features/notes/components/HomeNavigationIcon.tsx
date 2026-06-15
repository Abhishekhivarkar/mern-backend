import  { useState } from 'react'
import { IoHomeOutline } from "react-icons/io5";
export default function HomeNavigationIcon() {
    const [click,setClick] = useState(true)
  return (
    <>
    <div className='flex gap-3'>
        <div className='flex gap-1 items-center '>
            <IoHomeOutline />
            <a href='/'>Home</a>
        </div>
        {">"}
        <button onClick={() => setClick(!click)}
            
            className={`${click ? "font-bold" : "font-normal"}`}>All Notes</button>
    </div>
    <div className='mt-4'>
        <p className='font-bold text-[2.5rem]'>All Notes</p>
    </div>
    </>
  )
}
