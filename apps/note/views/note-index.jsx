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
    const navigate = useNavigate()
    const [isEditModal, setEditModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [notes, setNotes] = useState([])
    const [isSaveModal, setSaveModal] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    useEffect(() => {
        loadNotes()
    }, [isEditModal, isSaveModal,filterBy])

    function loadNotes() {
        setIsLoading(true)
        noteService.query(filterBy)
            .then((notes) => {
                console.log(notes)
                setNotes(notes)
                setIsLoading(false)
            })
    }

    function onSetFilter(filterBy){
        setFilterBy(filterBy)
    }

    function onRemoveNote(noteId) {
        console.log(noteId)
        noteService.get(noteId)
            .then((note) => {
                if (note.isTrash) {
                    note.isTrash = false
                } else {
                    note.isTrash = true
                }
                noteService.save(note)
                const updatedNotes = notes.filter(note => note.id !== noteId)
                console.log(note)
                setNotes(updatedNotes)
                showSuccessMsg(note.isTrash ? 'Note moved to Trash' : 'Removed from Trash')
                

            })
            .catch((err) => {
                showErrorMsg('Delete note failed')
            })
    }

    function onArchiveNote(noteId) {
        console.log(noteId)
        noteService.get(noteId)
            .then((note) => {
                if (note.isArchived) {
                    note.isArchived = false
                } else {
                    note.isArchived = true
                }
                noteService.save(note)
                const updatedNotes = notes.filter(note => note.id !== noteId)
                console.log(note)
                setNotes(updatedNotes)
                showSuccessMsg(note.isArchived ? 'Note moved to Archive' : 'Removed From Archive')

            })
            .catch((err) => {
                showErrorMsg('Move to Archive failed')
            })
    }

    function onPinNote(noteId) {
        noteService.get(noteId)
            .then(note => {
                if (note.isPinned) {
                    note.isPinned = false
                } else {
                    note.isPinned = true
                }
                noteService.save(note)
                const updatedNotes = notes.filter(note => note.id !== noteId)
                console.log(note)
                setNotes(updatedNotes)
                showSuccessMsg(note.isPinned ? 'Note Pinned' : 'Pin removed')
            })
        console.log(notes)
    }

    function onCloseEdit() {
        navigate('/note')
        setEditModal(false)
        setSaveModal(!isSaveModal)
        console.log(isSaveModal)


    }

    function onOpenEdit() {
        console.log('yey')
        setEditModal(true)
    }
    return <section className="notes-index">
        <button className="side-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}><i className="fa-solid fa-bars"></i></button>
        <NoteNav onSetFilter={onSetFilter} className={isMenuOpen ? "open" : ""} />
        <div className="notes-container">
            <AddNote onCloseEdit={onCloseEdit} />
            {isLoading && <LoadingSpinner />}
            {!isLoading && <NoteList onOpenEdit={onOpenEdit} notes={notes} onRemoveNote={onRemoveNote} onArchiveNote={onArchiveNote} onPinNote={onPinNote} />}
            {(isEditModal) && <NoteEdit onCloseEdit={onCloseEdit} />}


        </div>
    </section>



}

