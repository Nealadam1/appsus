import { showErrorMsg, showSuccessMsg } from "../../../../services/event-bus.service.js"
import { noteService } from "../../services/note.service.js"
const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function NoteTodosEdit() {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    const { noteId } = useParams()
    const { todos } = noteToEdit.info

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
        if (field === 'txt') {
            todos[todos.length-1].txt=value
            const noteJson=JSON.stringify(noteToEdit)
            const noteParse=JSON.parse(noteJson)
            setNoteToEdit((prevnote)=> noteParse)
        }
        if (field === 'label') setNoteToEdit((prevnote) => ({ ...prevnote, "info": { ...prevnote.info, [field]: value } }))
        console.log(noteToEdit)
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteToEdit.type = 'note-todos'
        noteService.save(noteToEdit).then((note) => {
            console.log('note saved', note);
            showSuccessMsg('Note saved!')
            navigate('/note')
        })
    }


    return <div>
        <form onSubmit={onSaveNote}>
            <input type="text"
                name="label"
                placeholder="Enter Label"
                value={noteToEdit.info.label}
                onChange={handleChange} />
            <hr />
            {todos.map(todo => {
                < input key={todo.id} type="text"
                    name="txt"
                    placeholder="todo"
                    value={todo.txt}
                    onChange={handleChange} />
            })}
            <input type="text"
                name="txt"
                placeholder="List Todo"
                value={todos[todos.length - 1].txt}
                onChange={handleChange} />
            <div>
                <button>{noteToEdit.id ? 'Save' : 'Create'}</button>
                <Link to="/note">Close</Link>
            </div>
        </form>

    </div>
}