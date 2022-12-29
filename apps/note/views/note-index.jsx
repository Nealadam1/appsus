import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { LoadingSpinner } from "../../../cmps/loading-spinner.jsx"
import { Labels } from "../../../cmps/labels.jsx"
import { AddNote } from "../cmps/add-note.jsx"
import { NoteEdit } from "../cmps/note-edit.jsx"
import { NoteNav } from "../cmps/note-nav.jsx"

const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function NoteIndex() {
    const navigate=useNavigate()
    const [isEditModal,setEditModal] =useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [isEditModal])

    function loadNotes() {
        setIsLoading(true)
        noteService.query()
            .then((notes) => {
                console.log(notes)
                setNotes(notes)
                setIsLoading(false)
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                const updatedNotes = notes.filter(note => note.id !== noteId)
                setNotes(updatedNotes)
                showSuccessMsg('Note deleted')

            })
            .catch((err) => {
                showErrorMsg('Delete note failed')
            })
    }
    function onCloseEdit(){
        navigate('/note')
        setEditModal(false)  
    }
    function onOpenEdit(){
        console.log('yey')
        setEditModal(true)  
    }
    return <section className="notes-index">
        <NoteNav/>
        <div className="notes-container">
            <NoteFilter />
            <AddNote/>
            {isLoading && <LoadingSpinner />}
            {!isLoading && <NoteList onOpenEdit={onOpenEdit} notes={notes} onRemoveNote={onRemoveNote} />}
            {(isEditModal)&& <NoteEdit onCloseEdit={onCloseEdit}/>}


        </div>
    </section>



}

