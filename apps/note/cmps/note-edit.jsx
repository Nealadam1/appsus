import { noteService } from "../services/note.service.js"
import { DynamicCmpEdit } from "./dynamic-cmps/dynamic-cmp-edit.jsx"

const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function NoteEdit({ onCloseEdit }) {
    const [isVisible, setIsVisible] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState([])
    const navigate = useNavigate()
    const { noteId } = useParams()

    useEffect(() => {
        if (!noteId) navigate('/note')
        loadNote()
    }, [noteId])

    function loadNote() {
        noteService.get(noteId).then((noteToEdit) => setNoteToEdit(noteToEdit))
            .catch((err) => {
                console.log('Had issues in note details', err)
                navigate('/note')

            })
    }
    function updateVisible() {
        onCloseEdit()
    }

    return <div>
        <div className="note-edit-container">
            <DynamicCmpEdit isVisible={updateVisible} noteId={noteId} type={noteToEdit.type} info={noteToEdit.info} style={noteToEdit.style} />
        </div>
        <div onClick={updateVisible} className="dark-background"></div>
    </div>

}