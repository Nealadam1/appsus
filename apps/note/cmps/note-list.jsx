import { noteService } from "../services/note.service.js";
import { BtnSetColor } from "./btn-menus-cmps/note-btn-todo.jsx";
import { NotePreview } from "./note-preview.jsx";

const Router = ReactRouterDOM.HashRouter;
const { useState, useEffect, useRef } = React;
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM;

export function NoteList({ notes, onRemoveNote, onOpenEdit, onArchiveNote }) {
  const [sortedNotes, setSortedNotes] = useState(notes)
  const [toggleColorEdit, setColorEdit] = useState(false)

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

  function onSetBackgroundColor(noteId) {
    setColorEdit({ toggle: !toggleColorEdit.toggle, id: noteId })
    console.log(toggleColorEdit)
  }

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
        <div style={{ backgroundColor: note.style }}
          className="note"
          key={note.id}
          draggable
          onDragStart={handleDragStart(note.id)}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          <NotePreview onOpenEdit={onOpenEdit} note={note} />

          <div className="note-btns">
            <i className="fa-solid fa-trash" onClick={() => onRemoveNote(note.id)}></i>
            <i className="fa-solid fa-box-archive" onClick={() => onArchiveNote(note.id)}></i>
            <i className="fa-solid fa-tag" onClick={() => onAddLabel(note.id)}></i>
            <i className="fa-solid fa-palette" onClick={() => onSetBackgroundColor(note.id)}>
              <BtnSetColor onSetBackgroundColor={onSetBackgroundColor} note={note} />
              </i>
            <i className="fa-solid fa-thumbtack" onClick={() => onPinNote(note.id)}></i>
          </div>

        </div>
      ))}

    </div>
  );
}
