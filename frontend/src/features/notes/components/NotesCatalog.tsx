import { useState } from "react";
import { useGetNotes } from "../hooks/useGetNotes";
import NotesCard from "./NotesCard";

interface Props {
  category: string | null;
  minPrice:number | null,
  maxPrice:number | null,
  isPaid:boolean | null,
  otherFilter: "featured"|"pinned" | null
}

export default function NotesCatalog({ category,minPrice,maxPrice,isPaid,otherFilter}: Props) {
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data } = useGetNotes({
    page,
    limit,
    category: category || undefined,
    minPrice: minPrice ?? undefined,
    maxPrice: maxPrice ?? undefined,
    isPaid: isPaid ?? null,
    isFeatured: otherFilter === "featured" ? true : false,
    isPinned: otherFilter === "pinned" ? true : false
  });

  const { total = 0 } = data?.data || {};

  const totalPages = Math.ceil(total / limit);
const notes = data?.data?.notes || [];

  return (
   <div className="mt-3">
  {notes.length === 0 ? (
    <div className="flex justify-center items-center h-40">
      <p className="text-gray-500 text-lg">
        Notes not found for this search.
      </p>
    </div>
  ) : (
    <>
      <div className="grid grid-cols-4 gap-9">
        {notes.map((note) => (
          <NotesCard key={note.note_id} data={note} />
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </>
  )}
</div>
  );
}