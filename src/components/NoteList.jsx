import Note from "./Note";

export default function NoteList({ notes, onDelete, setId, setUpdated }) {
  return (
    <div className="notes-container">
      {notes.map((note) => (
        <Note
          key={note.id}
          {...note}
          onDelete={onDelete}
          setId={setId}
          setUpdated={setUpdated}
        />
      ))}
    </div>
  );
}
