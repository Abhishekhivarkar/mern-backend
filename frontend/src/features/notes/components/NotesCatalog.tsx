import { useGetNotes } from "../hooks/useGetNotes";
import NotesCard from "./NotesCard";

export default function NotesCatalog() {
  const { data } = useGetNotes();
  return (
    <div>
      <p>Showing 1 to 12 of 248 notes</p>
      <div className="grid grid-cols-4 gap-9">
        {data?.data?.notes?.map((i) => {
          return (
            <>
              <NotesCard data={i} />
            </>
          );
        })}
      </div>
    </div>
  );
}
