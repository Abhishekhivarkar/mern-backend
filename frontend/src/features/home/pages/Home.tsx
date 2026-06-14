

import { Navbar } from '../../../common/components/Navbar'
import { HeroSection } from '../components/HeroSection'
import { CategoriesSection } from '../components/CategoriesSection'
import FeaturedNotesSection from '../components/FeaturedNotesSection'
import WhyChooseUsSection from '../components/WhyChooseUsSection'
import SellerSection from '../components/SellerSection'
import Footer from '../../../common/components/Footer'

export const Dashboard = ()  => {
  return (
  
   <>
   <div className=' min-h-screen flex flex-col gap-7 '>
      <Navbar/>
      <main className='flex-1'>
           <HeroSection/>
   <CategoriesSection/>
   <FeaturedNotesSection/>
   <WhyChooseUsSection/>
  <SellerSection/>
      </main>

  <Footer />
   </div>
 
   </>
  )
}
