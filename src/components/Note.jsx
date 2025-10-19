export default function Note({
  id,
  title,
  content,
  priority = "low", // Default priority
  category = "personal", // Default category
  onDelete,
  setId,
  setUpdated,
}) {
  return (
    <div className={`card ${priority}`}>
      <div className="note-meta">
        <span className={`badge priority ${priority}`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
        <span className={`badge category ${category}`}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>
      <div className="note-content">
        <h3 className="note-title">{title}</h3>
        <p className="note-description">{content}</p>
      </div>
      <div className="buttons">
        <button className="delete-btn" onClick={() => onDelete(id)}>
          Delete
        </button>
        <button
          className="update-btn"
          onClick={() => {
            setId(id);
            setUpdated(true);
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
}
