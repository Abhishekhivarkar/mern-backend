

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
   <div className='flex flex-col gap-7 '>
      <Navbar/>
   <HeroSection/>
   <CategoriesSection/>
   <FeaturedNotesSection/>
   <WhyChooseUsSection/>
  <SellerSection/>
  <Footer />
   </div>
 
   </>
  )
}
