
interface NoteData {
  note: {
    note_id: string;
    note_name: string;
    note_content: string;
    created_at: Date;
    updated_at: Date;
  };
}
export const GetAllNotesCard = ({ note }: NoteData) => {
  return <>
  
  <div className="border h-70 rounded-lg p-4">
    
    <div>
       <span className="font-bold text-red-300">Name :</span> {note.note_name}
    </div>
 <div className="h-2/3 overflow-y-auto">
  <span className="text-red-300 font-bold">Content :</span> {note.note_content}
 </div>
 <div>
  <span>Upload date : </span> {
    new Date(note.created_at).toLocaleDateString()
  }
 </div>
  </div>
  
  
  </>;
};
