import { showErrorMsg, showSuccessMsg, emit, eventBusService } from "../services/event-bus.service.js"
import { labelService } from "../services/label.service.js"
import { utilService } from "../services/util.service.js"
import { LabelList } from "./label-list.jsx"

const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function LabelEdit() {
    const [labelsToEdit, setLabelsToEdit] = useState([])
    const navigate = useNavigate()
    const elInputRef = useRef(null)


    console.log(labelsToEdit)
    useEffect(() => {
        loadLabels()

    }, [])



    function loadLabels() {
        labelService.query()
            .then(labels => {
                setLabelsToEdit(labels)
                console.log(labels)
            })
    }
    function onRemoveLabel(labelId, ev) {
        ev.preventDefault()
        labelService.remove(labelId)
            .then(() => {
                const updatedLabels = labelsToEdit.filter(label => label.id !== labelId)
                setLabelsToEdit(updatedLabels)
                showSuccessMsg('Label Deleted')
                eventBusService.emit('label-removed')
            })
            .catch((err) => {
                console.log('Had issues removing', err)
                showErrorMsg('Could not delete label')

            })
    }

    function handleChange({ target }) {
        let { id, value, type, name: field } = target;
        value = type === 'number' ? +value : value;
        setLabelsToEdit((prevlabels) =>
            prevlabels.map((label) => {
                return label.id === id ? { ...label, [field]: value } : label
            })
        );
    }
    function onSaveLabels(ev) {
        ev.preventDefault()
        console.log(labelsToEdit)
        labelService.set(labelsToEdit)
        eventBusService.emit('label-saved')
        console.log('labels saved', labelsToEdit)
        showSuccessMsg('Labels Saved')

        navigate('/note')

    }

    function onAddLabel(ev) {
        ev.preventDefault()
        const newLabel = labelService.getEmptyLabel()
        newLabel.labelName = elInputRef.current.value
        newLabel["id"] = utilService.makeId()
        setLabelsToEdit((prevLabels) => [...prevLabels, newLabel])
        elInputRef.current.value = ''
    }

    return <div className="label-edit-container">
        <h2>Label Editor</h2>
        <form >
            {labelsToEdit.map(labelToEdit => {
                return <div key={labelToEdit.id} className="label-edit-item">
                    <input className="color-input" type="color"
                        name="color"
                        id={labelToEdit.id}
                        placeholder="Enter label name"
                        value={labelToEdit.color}
                        onChange={handleChange}

                    />
                    <input className="text-input" type="text"
                        name="labelName"
                        id={labelToEdit.id}
                        placeholder="Enter label name"
                        value={labelToEdit.labelName}
                        onChange={handleChange}

                    />
                    <i className="fa-solid fa-trash" onClick={(ev) => onRemoveLabel(labelToEdit.id, ev)}></i>
                </div>
            })}

            <hr />
            <input className="text-input" type="text"
                name="labelName"
                placeholder="Enter label name"
                onChange={handleChange}
                ref={elInputRef}

            />
            <i className="fa-solid fa-plus" onClick={onAddLabel}></i>
            <hr />
            <p className="done" onClick={onSaveLabels}>Done</p>
        </form>
    </div>

}