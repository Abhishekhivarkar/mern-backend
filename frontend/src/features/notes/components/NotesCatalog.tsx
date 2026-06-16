import { useGetNotes } from "../hooks/useGetNotes"

export default function NotesCatalog() {

    const {data} = useGetNotes()
  return (
    <div>
      <p>Showing 1 to 12 of 248 notes</p>

      <div>
        {
            data?.data?.notes?.map()
        }
      </div>
    </div>
  )
}
