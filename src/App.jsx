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
  const [filterByPriority, setFilterByPriority] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    let result = notes;

    if (searchValue.trim() !== "") {
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          note.content.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (filterByPriority !== "") {
      result = result.filter((note) => note.priority === filterByPriority);
    }

    if (filterByCategory !== "") {
      result = result.filter((note) => note.category === filterByCategory);
    }

    setFilteredNotes(result);
  }, [filterByCategory, filterByPriority, searchValue, notes]);

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
      {notes.length !== 0 && (
        <select
          className="filter-select"
          value={filterByPriority}
          onChange={(e) => setFilterByPriority(e.target.value)}
        >
          <option value="">Filter By Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      )}
      {notes.length !== 0 && (
        <select
          className="filter-select"
          value={filterByCategory}
          onChange={(e) => setFilterByCategory(e.target.value)}
        >
          <option value="">Filter By Category</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="office">Office</option>
        </select>
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
