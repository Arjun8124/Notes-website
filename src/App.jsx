import { useEffect, useState } from "react";
import Form from "./components/form";
import NoteList from "./components/NoteList";
import UModal from "./components/Umodal";

export default function App() {
  const [notes, setNotes] = useState(() => {
    const raw = localStorage.getItem("notes");
    return raw ? JSON.parse(raw) : [];
  });
  const [clicked, setClicked] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [id, setId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (searchValue.trim() === "") setFilteredNotes(notes);
    else {
      setFilteredNotes(
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            note.content.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue, notes]);

  function onAddNote(newNote) {
    setNotes([...notes, newNote]);
  }

  function onUpdateNote(newNote) {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              title: newNote.title,
              priority: newNote.priority,
              category: newNote.category,
              content: newNote.content,
            }
          : note
      )
    );
  }

  function onDelete(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function onClose() {
    setClicked(false);
  }

  return (
    <div className="container">
      <div className="header">
        <span className="header-icon">📝</span>
        <h1>Notes App</h1>
      </div>
      <button className="btn" onClick={() => setClicked(!clicked)}>
        + Add new Note
      </button>
      {clicked && <Form onAddNote={onAddNote} onClose={onClose} />}
      {notes.length !== 0 && (
        <input
          className="filter-input"
          type="text"
          placeholder="Search for ...."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      )}
      <NoteList
        notes={filteredNotes}
        onDelete={onDelete}
        setId={setId}
        setUpdated={setUpdated}
      />
      {updated && (
        <UModal
          currentNote={notes.find((note) => note.id === id)}
          setUpdated={setUpdated}
          onUpdateNote={onUpdateNote}
        />
      )}
    </div>
  );
}
