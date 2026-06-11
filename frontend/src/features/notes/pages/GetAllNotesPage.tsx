import { Loader } from "../../../common/components/IsLoading";
import { GetAllNotesCard } from "../components/GetAllNotesCard";
import { useGetNotes } from "../hooks/useCreateNote";

export const GetAllNotesPage = () => {
  const { data, isLoading } = useGetNotes();
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.data.notes.map((note) => {
        return <GetAllNotesCard key={note.note_id} note={note} />;
      })}
    </div>
  );
};
