import React from 'react'
import BrandLogo from './BrandLogo'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
export default function Footer() {
  return (
    <div className=' grid grid-cols-2 p-3 md:grid-cols-5 gap-3 md:gap-0 justify-items-center shadow-lg'>
        {/* section 1 */}
        <div className='flex flex-col gap-2 '>
            <BrandLogo/>
      <p className='text-[10px] text-gray-500 font-semibold'>The best platform to buy and sell study notes online</p>
        </div>

        {/* section 2 */}
        <div className='flex flex-col gap-2 font-semibold'>
            <p>Quick Links</p>
            <div className='flex flex-col text-gray-500 font-medium'>
            <a href="/">Home</a>
            <a href="">Notes</a>
            <a href="">Categories</a>
            <a href="">Become a seller</a>
            </div>
        </div>

         {/* section 3 */}
         <div className='flex flex-col gap-2 font-semibold'>
            <p>Resources</p>
            <div className='flex flex-col text-gray-500 font-medium'>
            <a href="">How It Works</a>
            <a href="">Pricing</a>
            <a href="">Help Center</a>
            <a href="">Contact Us</a>
            </div>
        </div>

        {/* section 4 */}
         <div className='flex flex-col gap-2 font-semibold'>
            <p>Legal</p>
            <div className='flex flex-col text-gray-500 font-medium'>
            <a href="">Term of Use</a>
            <a href="">Privacy Policy</a>
            <a href="">Refund Policy</a>
           
            </div>
        </div>

         {/* section 5 */}
        <div className='flex flex-col gap-2 font-semibold '>
            <p>Follow Us</p>
            <div className='flex  text-gray-500 font-medium gap-2'>
            <a href="" className='bg-gray-200 rounded-full py-1 px-1'><FaFacebook className='text-blue-600'/></a>
            <a className='bg-blue-100 rounded-full py-1 px-1' href=""><FaTwitter className='text-blue-400'/></a>
            <a  className='bg-blue-100 rounded-full py-1 px-1' href=""><FaInstagram className='text-pink-400'/></a>
            <a className='bg-blue-100 rounded-full py-1 px-1' href=""><FaLinkedin className='text-blue-500'/></a>
            </div>
            <p className='text-[8px]'>© 2026 NotesHub. All Rights Reserved.</p>
        </div>
    </div>
  )
}
