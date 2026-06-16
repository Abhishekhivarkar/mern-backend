import React from 'react'
import HomeNavigationIcon from './HomeNavigationIcon'
import AllNotesSearchBar from './AllNotesSearchBar'
import NotesCatalog from './NotesCatalog'

export default function AllNotesSection() {
  return (
    <div className=' border border-gray-200  w-full'>
        <HomeNavigationIcon/>
        <AllNotesSearchBar/>
        <NotesCatalog/>
    </div>
  )
}
