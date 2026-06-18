
import HomeNavigationIcon from './HomeNavigationIcon'
import AllNotesSearchBar from './AllNotesSearchBar'
import NotesCatalog from './NotesCatalog'

interface Props{
  category:string,
  minPrice:number,
  maxPrice:number
}
export default function AllNotesSection({category,minPrice,maxPrice}:Props) {
  return (
    <div className=' border border-gray-200  w-full'>
        <HomeNavigationIcon/>
        <AllNotesSearchBar/>
        <NotesCatalog category={category} minPrice={minPrice} maxPrice={maxPrice}/>
    </div>
  )
}
