import { noteService } from "../services/note.service.js";
import { NotePreview } from "./note-preview.jsx";

const Router = ReactRouterDOM.HashRouter;
const { useState, useEffect, useRef } = React;
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM;

export function NoteList({ notes, onRemoveNote }) {
  const [sortedNotes, setSortedNotes] = useState(notes);

  const handleDragStart = (noteId) => (e) => {
    e.dataTransfer.setData("noteId", noteId);
  };

  const handleDrag = (e) => {
    // You can add some visual effects here while the element is being dragged
  };

  const handleDragEnd = (e) => {
    // You can remove the visual effects here
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const noteId = e.dataTransfer.getData("noteId");
    const index = sortedNotes.findIndex((note) => note.id === noteId);
    const note = sortedNotes[index];
    sortedNotes.splice(index, 1);
    // Calculate the new index for the element based on the mouse position
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const newIndex = Math.floor(y / (rect.height / sortedNotes.length));
    sortedNotes.splice(newIndex, 0, note);
    setSortedNotes([...sortedNotes]);
  };

  return (
    <div
      className="note-list"
      onDragEnter={(e) => {
        // You can add some visual effects here when the element is dragged over the target
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={handleDrop}
    >
      {sortedNotes.map((note) => (
        <div
          className="note"
          key={note.id}
          draggable
          onDragStart={handleDragStart(note.id)}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          <NotePreview note={note} />

          <div className="note-btns">
            <button onClick={() => onRemoveNote(note.id)}>Delete Icon</button>
            <button>Archive</button>
            <button>Add Label</button>
            <button>BackgroundColor</button>
            <button>Pin</button>
          </div>
        </div>
      ))}
    </div>
  );
}
