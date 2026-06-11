

import { Navbar } from '../../../common/components/Navbar'
import { HeroSection } from '../components/HeroSection'
import { CategoriesSection } from '../components/CategoriesSection'
import FeaturedNotesSection from '../components/FeaturedNotesSection'

export const Dashboard = ()  => {
  return (
  
   <>
   <Navbar/>
   <HeroSection/>
   <CategoriesSection/>
   <FeaturedNotesSection/>
   </>
  )
}
