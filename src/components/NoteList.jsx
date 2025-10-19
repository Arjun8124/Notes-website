import Note from "./Note";

export default function NoteList({ notes, onDelete, setId, setUpdated }) {
  if (notes.length === 0) return <h1>Whoops!! There are no Notes here!</h1>;
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
