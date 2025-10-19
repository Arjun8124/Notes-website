import { useState } from "react";

export default function UModal({ currentNote, setUpdated, onUpdateNote }) {
  const [updatedNote, setUpdatedNote] = useState({ ...currentNote });

  const handleTextareaInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateNote(updatedNote);
    setUpdated(false);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <strong>Title</strong>
            <input
              type="text"
              placeholder="Enter the title..."
              value={updatedNote.title}
              onChange={(e) =>
                setUpdatedNote({ ...updatedNote, title: e.target.value })
              }
            />
            <strong>Category</strong>
            <select
              value={updatedNote.category}
              onChange={(e) =>
                setUpdatedNote({ ...updatedNote, category: e.target.value })
              }
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
              value={updatedNote.priority}
              onChange={(e) =>
                setUpdatedNote({ ...updatedNote, priority: e.target.value })
              }
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
              value={updatedNote.content}
              onChange={(e) => {
                setUpdatedNote({ ...updatedNote, content: e.target.value });
                handleTextareaInput(e);
              }}
            />
            <div className="buttons">
              <button className="btn" type="submit">
                Update Note
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => setUpdated(false)}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
