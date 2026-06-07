import { useState } from "react";
import { useCreateNote } from "../hooks/useCreateNote";

export function CreateNotesForm() {
  const [note_name, setnote_name] = useState("");

  const [note_content, setnote_content] = useState("");

  const createNoteMutation = useCreateNote();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createNoteMutation.mutate({
      note_name,
      note_content,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="note_name">Note Name :</label>
        <input
          type="text"
          value={note_name}
          name="note_name"
          placeholder="Enter note name"
          onChange={(e) => setnote_name(e.target.value)}
        />

        <label htmlFor="note_content">Note Content :</label>
        <input
          type="text"
          value={note_content}
          name="note_content"
          placeholder="Enter note content"
          onChange={(e) => setnote_content(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}


