import { useState } from "react";

export default function Form({ onAddNote, onClose }) {
  const [newNote, setNewNote] = useState({
    id: Date.now(),
    title: "",
    content: "",
    priority: "",
    category: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onAddNote(newNote);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <strong>Title</strong>
        <input
          type="text"
          placeholder="Enter the title..."
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <strong>Category</strong>
        <select
          value={newNote.category}
          onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="office">Office</option>
        </select>
        <strong>Priority</strong>
        <select
          value={newNote.priority}
          onChange={(e) => setNewNote({ ...newNote, priority: e.target.value })}
        >
          <option value="" disabled>
            Select priority
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <strong>Description</strong>
        <textarea
          rows={5}
          type="text"
          placeholder="Enter the description..."
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <button className="btn" type="submit">
          Add Note
        </button>
      </div>
    </form>
  );
}
