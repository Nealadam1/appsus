import { showErrorMsg, showSuccessMsg } from "../../../../services/event-bus.service.js"
import { utilService } from "../../../../services/util.service.js"
import { noteService } from "../../services/note.service.js"
const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function NoteTodosEdit({isVisible}) {
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

            })
    }

    function handleChange({ target }) {
        let { id, value, type, name: field } = target
        value = type === 'number' ? +value : value
        if (field === 'txt') {
            todos[id].txt = value
            const noteJson = JSON.stringify(noteToEdit)
            const noteParse = JSON.parse(noteJson)
            setNoteToEdit((prevnote) => noteParse)
        }
        if (field === 'label') setNoteToEdit((prevnote) => ({ ...prevnote, "info": { ...prevnote.info, [field]: value } }))
        console.log(noteToEdit)
    }

    function onSaveNote(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        noteToEdit.type = 'note-todos'
        noteService.save(noteToEdit).then((note) => {
            console.log('note saved', note);
            showSuccessMsg('Note saved!')
            isVisible()

        })
    }

    function onaddTodo() {
        todos.push({ id: utilService.makeId(), txt: '' })
        const noteJson = JSON.stringify(noteToEdit)
        const noteParse = JSON.parse(noteJson)
        setNoteToEdit((prevnote) => noteParse)
    }

    function onRemoveTodo(todoId, ev) {
        console.log(ev.keyCode)
        console.log(noteToEdit.info.todos)
        const updatedTodos = noteToEdit.info.todos.filter(todo => todo.id !== todoId)
        noteToEdit.info.todos = updatedTodos
        const noteJson = JSON.stringify(noteToEdit)
        const noteParse = JSON.parse(noteJson)
        setNoteToEdit((prevnote) => noteParse)

    }


    return <div>
        <div>
            <input type="text"
                name="label"
                placeholder="Enter Label"
                value={noteToEdit.info.label}
                onChange={handleChange} />
            <hr />
            {todos.map((todo, idx) => {
                return <div key={idx}>
                    < input type="text"
                        name="txt"
                        placeholder="todo"
                        id={idx}
                        value={todo.txt}
                        onChange={handleChange}
                    />
                    <button onClick={(ev) => onRemoveTodo(todo.id, ev)}>X</button>
                </div>
            })}
            <hr />
            <div>
                <p onClick={() => onaddTodo()}>List Todo +</p>
            </div>
            <div>
                <button onClick={onSaveNote} >{noteToEdit.id ? 'Save' : 'Create'}</button>
                <p onClick={()=>isVisible()}>Close</p>
            </div>
        </div>

    </div>
}