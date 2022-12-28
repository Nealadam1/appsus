export function NoteTodos({ info }) {
    const { label, todos } = info
    return <div className="todo-preview">
        <h3>{label}</h3>
        <ul>
            {todos.map(todo => <li key={todo.id}>
                <input type="checkbox" name="txt" id="todo" /><label htmlFor="todo">{todo.txt}</label><span className="last-edit"> Edited at:{todo.doneAt}</span>

            </li>
            )}
        </ul>
    </div>
}