import { utilService } from "../../../../services/util.service.js"
import { noteService } from "../../services/note.service.js"

const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function NoteTodos(note) {
    const { label, todos } = note.info
    const [todosDoneAt, setTodosDoneAt] = useState(todos)
    function handleChange({ target }) {
    
        const { value, checked } = target
        if (checked) {
            const newTodosDoneAt = todosDoneAt.map(todo => {
                if (todo.id === value) {
                    return { ...todo, doneAt: utilService.displayDate(new Date().getTime()) }
                } else {
                    return todo
                }
            })
            setTodosDoneAt(newTodosDoneAt)
            note.info.todos = newTodosDoneAt
            noteService.save(note)

        } else {
            const newTodosDoneAt = todos.map(todo => {
                if (todo.id === value) {
                    return { ...todo, doneAt: "" }
                } else { return todo }
            })
            setTodosDoneAt(newTodosDoneAt)
            note.info.todos = newTodosDoneAt
            noteService.save(note)
        }
    }

    return <div className="todo-preview">
        <h3>{label}</h3>
        <ul>
            {todos.map((todo, idx) => <li key={todo.id}>

                <div className="todo-preview-text">
                    <div>
                        <input type="checkbox"
                            name="doneAt" defaultChecked={todo.doneAt} id={idx} value={todo.id} onChange={handleChange} />
                        <label htmlFor="todo">{todo.txt}</label>
                    </div>
                    <span className="last-edit">{(todo.doneAt) ? `Done at:${todo.doneAt}` : ''}</span>
                </div>

            </li>
            )}
        </ul>
    </div>
}