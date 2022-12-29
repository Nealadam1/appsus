import { showErrorMsg, showSuccessMsg } from "../../../../services/event-bus.service.js"
import { noteService } from "../../services/note.service.js"
const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function NoteTxtEdit({ isVisible, noteId }) {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    

    useEffect(() => {
        if (!noteId) return
        loadNote()
    }, [])

    function loadNote() {
        noteService.get(noteId)
            .then((note) => setNoteToEdit(note))
            .catch((err) => {
                console.log('had issue in note detail', err)
                navigate('/note')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setNoteToEdit((prevnote) => ({ ...prevnote, "info": { ...prevnote.info, [field]: value } }))
        console.log(noteToEdit)
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteToEdit.type = 'note-txt'
        noteService.save(noteToEdit).then((note) => {
            console.log('note saved', note);
            showSuccessMsg('Note saved!')
            isVisible()
        })
    }


    return <div>
        <div >
            <input type="text"
                name="title"
                placeholder="Enter Title"
                value={noteToEdit.info.title}
                onChange={handleChange} />
            <hr />
            <textarea
                name="txt"
                cols="30"
                rows="10"
                placeholder="Enter Text"
                value={noteToEdit.info.txt}
                onChange={handleChange} >
                <pre>
                    {noteToEdit.info.txt}
                </pre>
            </textarea>
            <div>
                <button onClick={onSaveNote}>{noteToEdit.id ? 'Save' : 'Create'}</button>
                <p onClick={() => isVisible()} >Close</p>
            </div>
        </div>

    </div>
}