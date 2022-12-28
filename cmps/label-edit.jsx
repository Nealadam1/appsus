import { labelService } from "../services/label.service.js"
import { LabelList } from "./label-list.jsx"

const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function LabelEdit() {
    const [labelsToEdit, setLabelsToEdit] = useState([])
    const navigate = useNavigate()

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
    function onRemoveLabel(labelId) {
        labelService.remove(labelId)
            .then(() => {
                const updatedLabels = labels.filter(label => label.id !== labelId)
                setLabelsToEdit(updatedLabels)
                showSuccessMsg('Label Deleted')
            })
            .catch((err) => {
                console.log('Had issues removing', err)
                showErrorMsg('Could not delete label')
            })
    }

    function handleChange({ target }) {
        let { id, value, type, name: field } = target;
        console.log(id)
        value = type === 'number' ? +value : value;
        setLabelsToEdit((prevlabels) =>
            prevlabels.map((label) => {console.log(label.id)
               return label.id === +id ? { ...label, [field]: value } : label
            })
        );
    }
    function onSaveLabels() {

    }



    return <div className="label-edit-container">
        <h2>Label Editor</h2>
        <form onSubmit={onSaveLabels}>
            {labelsToEdit.map(labelToEdit => {
                return <div key={labelToEdit.id} className="label-edit-item">
                    <input type="color"
                        name="label"
                        id={labelToEdit.id}
                        placeholder="Enter label name"
                        value={labelToEdit.color}
                        onChange={handleChange}

                    />
                    <input type="text"
                        name="labelName"
                        id={labelToEdit.id}
                        placeholder="Enter label name"
                        value={labelToEdit.labelName}
                        onChange={handleChange}

                    />
                    <button onClick={() => onRemoveLabel(labelToEdit.id)}>X</button>
                </div>

            })}
        </form>
    </div>

}