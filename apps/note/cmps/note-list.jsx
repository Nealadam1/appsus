import { noteService } from "../services/note.service.js";
import { BtnLabels } from "./btn-menus-cmps/note-btn-labels.jsx";
import { BtnSetColor } from "./btn-menus-cmps/note-btn-todo.jsx";
import { NotePreview } from "./note-preview.jsx";

const Router = ReactRouterDOM.HashRouter;
const { useState, useEffect, useRef } = React;
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM;

export function NoteList({ notes, onRemoveNote, onOpenEdit, onArchiveNote, onPinNote }) {
  const [sortedNotes, setSortedNotes] = useState(notes)
  const [toggleColorEdit, setColorEdit] = useState(false)

  const handleDragStart = (noteId) => (e) => {
    e.dataTransfer.setData("noteId", noteId)
  }
  const handleDrop = (ev) => {
    ev.preventDefault()
    const noteId = ev.dataTransfer.getData("noteId");
    const index = sortedNotes.findIndex((note) => note.id === noteId)
    const note = sortedNotes[index]
    sortedNotes.splice(index, 1)
    const rect = ev.currentTarget.getBoundingClientRect()
    const y = ev.clientY - rect.top
    const newIndex = Math.floor(y / (rect.height / sortedNotes.length))
    sortedNotes.splice(newIndex, 0, note)
    setSortedNotes([...sortedNotes])
    
  }
  function onSetBackgroundColor(noteId) {
    setColorEdit({ toggle: !toggleColorEdit.toggle, id: noteId })
    console.log(toggleColorEdit)
  }
  return (
    <div
      className="note-list"
      onDragOver={(ev) => {
        ev.preventDefault()
      }}
      onDrop={handleDrop}
      >
      {sortedNotes.map((note) => {
        const elLabelSelectRef = useRef(null);
        return <div style={{ backgroundColor: note.style }}
          className="note"
          key={note.id}
          draggable
          onDragStart={handleDragStart(note.id)}
        >
          <NotePreview onOpenEdit={onOpenEdit} note={note} />
          <div className="note-btns">
            <i className="fa-solid fa-trash" onClick={() => onRemoveNote(note.id)}></i>
            <i className="fa-solid fa-box-archive" onClick={() => onArchiveNote(note.id)}></i>
            <i className="fa-solid fa-tag" onClick={() => elLabelSelectRef.current.classList.toggle('active')}>
            </i>
            <i className="fa-solid fa-palette" onClick={() => onSetBackgroundColor(note.id)}>
              <BtnSetColor onSetBackgroundColor={onSetBackgroundColor} note={note} />
            </i>
            <i className="fa-solid fa-thumbtack" onClick={() => onPinNote(note.id)}></i>
          </div>
          <div ref={elLabelSelectRef} className="note-label-select">
            <BtnLabels note={note} />
          </div>
        </div>
      })}

    </div>
  )
}
