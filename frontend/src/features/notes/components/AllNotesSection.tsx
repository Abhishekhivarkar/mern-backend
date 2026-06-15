import React from 'react'
import HomeNavigationIcon from './HomeNavigationIcon'
import AllNotesSearchBar from './AllNotesSearchBar'

export default function AllNotesSection() {
  return (
    <div className=' border-1 border-gray-200  w-full'>
        <HomeNavigationIcon/>
        <AllNotesSearchBar/>
    </div>
  )
}
