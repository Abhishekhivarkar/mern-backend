
export default function NotesSerachBar() {
  return (
    <div className="flex flex-col gap-3">
        <p className="font-bold text-[14px]">Search</p>
        <input
          type="text"
          placeholder="Search notes..."
          className="peer border rounded-md
        px-10  py-2 pl-4 outline-none"
        />
      </div>
  )
}
