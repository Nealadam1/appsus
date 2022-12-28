import { noteService } from "../services/note.service.js"
import { NotePreview } from "./note-preview.jsx"

const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote }) {
    return <div className="note-list">
        {
            notes.map(note => <div className="note" key={note.id}>
                <NotePreview note={note} />
                <div className='note-btns'>
                    <button onClick={() => onRemoveNote(note.id)}>Delete Icon</button>
                    <button>Archive</button>
                    <button>Add Label</button>
                    <button>BackgroundColor</button>
                    <button>Pin</button>

                </div>
            </div>)
        }
    </div>

}