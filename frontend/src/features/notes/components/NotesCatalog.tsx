import { useGetNotes } from "../hooks/useGetNotes";
import NotesCard from "./NotesCard";

interface Props{
    category:string
} 

export default function NotesCatalog({category}:Props) { 
  
  
  const { data } = useGetNotes({
    page:1,
    limit:0,
    category:category || undefined
  });

  const { page , limit, total } = data?.data || {};

  const start = total ? (page - 1) * limit + 1 : 0;
  const end = Math.min(page * limit, total);

  return (
    <div className="mt-3">
      <p>
        Showing {start} to {end} of {total} notes
      </p>

      <div className="grid grid-cols-4 gap-9">
        {data?.data?.notes?.map((note) => (
          <NotesCard key={note.note_id} data={note} />
        ))}
      </div>
    </div>
  );
}