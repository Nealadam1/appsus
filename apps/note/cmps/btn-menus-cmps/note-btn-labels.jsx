import { labelService } from "../../../../services/label.service.js";
import { noteService } from "../../services/note.service.js";

const Router = ReactRouterDOM.HashRouter;
const { useState, useEffect, useRef } = React;
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM;

export function BtnLabels({ note, onToggleLabels }) {
    const [labels, setLabels] = useState([])
    const [ischecked, setChecked] = useState(false)
    console.log(note)
    console.log(labels)

    useEffect(() => {
        loadLabels()
    }, [])

    function loadLabels() {
        labelService.query()
            .then(labels => setLabels(labels))
    }

    function onAddLabel(labelName) {
        note.labels.push(labelName)
        noteService.save(note)
    }
    function onRemoveLabel(labelName) {
        const idx = note.labels.findIndex(label => label.labelName === labelName)
        note.labels.splice(idx, 1)
        noteService.save(note)

    }

    function handleLabelChange({ target }) {
        const labelName = target.value
        if (target.checked) {
            onAddLabel(labelName)
        } else {
            onRemoveLabel(labelName)
        }
        setChecked(!ischecked)

    }

    console.log(note)



    return <div>
        <form>
            {labels.map((label) => (
                <div className="label" key={label.id}>
                    <input
                        defaultChecked={note.labels.find(labelitem => labelitem === label.labelName)}
                        id={label.id}
                        type="checkbox"
                        value={label.labelName}
                        onChange={handleLabelChange}
                    />
                    <label htmlFor={label.id}>{label.labelName}</label>
                </div>
            ))}
        </form>
    </div>
}

