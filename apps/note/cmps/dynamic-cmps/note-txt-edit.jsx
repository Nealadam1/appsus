import { showErrorMsg, showSuccessMsg } from "../../../../services/event-bus.service.js"
import { noteService } from "../../services/note.service.js"
const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function NoteTxtEdit({ isVisible, noteId }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    useEffect(() => {
        if (!noteId) return
        getWindowSize()
        window.addEventListener('resize', () => { setWindowWidth(getWindowSize()) })
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
    function getWindowSize() {
        const { innerWidth } = window;
        return innerWidth
    }

    return <div >
        <div >
            <input type="text"
                name="title"
                placeholder="Enter Title"
                value={noteToEdit.info.title}
                onChange={handleChange} />
            <hr />
            <textarea
                name="txt"
                cols={windowWidth / 25}
                rows="10"
                placeholder="Enter Text"
                value={noteToEdit.info.txt}
                onChange={handleChange} >
                <pre>
                    {noteToEdit.info.txt}
                </pre>
            </textarea>
            <div className="save-btns">
                <p onClick={() => isVisible()} >Close</p>
                <p className="save" onClick={onSaveNote}>{noteToEdit.id ? 'Save' : 'Create'}</p>

            </div>
        </div>

    </div>
}