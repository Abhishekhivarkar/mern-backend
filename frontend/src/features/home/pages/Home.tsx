

import { Navbar } from '../../../common/components/Navbar'
import { HeroSection } from '../components/HeroSection'
import { CategoriesSection } from '../components/CategoriesSection'
import FeaturedNotesSection from '../components/FeaturedNotesSection'
import WhyChooseUsSection from '../components/WhyChooseUsSection'

export const Dashboard = ()  => {
  return (
  
   <>
   <Navbar/>
   <HeroSection/>
   <CategoriesSection/>
   <FeaturedNotesSection/>
   <WhyChooseUsSection/>
   </>
  )
}
