import { utilService } from "../../../../services/util.service.js"
import { noteService } from "../../services/note.service.js"

const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function NoteTodos(note) {
    const { label, todos } = note.info
    const [todosDoneAt, setTodosDoneAt] = useState(todos)


    // console.log(note)

    function handleChange({ target }) {
        console.log(target)

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
        console.log(todosDoneAt)
        // console.log(note)

    }

    return <div className="todo-preview">
        <h3>{label}</h3>
        <ul>
            {todos.map((todo, idx) => <li key={todo.id}>
                <input type="checkbox"
                    name="doneAt" checked={todo.doneAt} id={idx} value={todo.id} onChange={handleChange} /><label htmlFor="todo">{todo.txt}</label><span className="last-edit"> Edited at:{todo.doneAt}</span>

            </li>
            )}
        </ul>
    </div>
}