
import HomeNavigationIcon from './HomeNavigationIcon'
import AllNotesSearchBar from './AllNotesSearchBar'
import NotesCatalog from './NotesCatalog'

interface Props{
  category:string
}
export default function AllNotesSection({category}:Props) {
  return (
    <div className=' border border-gray-200  w-full'>
        <HomeNavigationIcon/>
        <AllNotesSearchBar/>
        <NotesCatalog category={category}/>
    </div>
  )
}
