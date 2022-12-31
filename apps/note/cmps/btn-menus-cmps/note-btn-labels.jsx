import { labelService } from "../../../../services/label.service.js";
import { noteService } from "../../services/note.service.js";

const Router = ReactRouterDOM.HashRouter;
const { useState, useEffect, useRef } = React;
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM;

export function BtnLabels({ note }) {
    const [labels, setLabels] = useState([])
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
    function onRemoveLabel(labelName){
        const idx=note.labels.findIndex(label=> label.labelName === labelName)
        note.labels.splice(idx,1)
        noteService.save(note)

    }
    
function handleLabelChange({ target }) {
    const labelName = target.value
    // const label = labels.find((label) => label.labelName === labelName)
    if (target.checked) {
        onAddLabel(labelName)
    } else {
        onRemoveLabel(labelName)
    }
}
return <form>
    {labels.map((label) => (
        <div key={label.id}>
            <input
                type="checkbox"
                value={label.labelName}
                onChange={handleLabelChange}
            />
            {label.labelName}
        </div>
    ))}
</form>
}

