import { labelService } from "../services/label.service.js"
import { LabelList } from "./label-list.jsx"
import { eventBusService } from "../services/event-bus.service.js"
import { noteService } from "../apps/note/services/note.service.js"

const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function Labels({onSetFilter}) {
    const [labels, setLabels] = useState([])
    const [onSavedLabel, setSavedLabel] = useState(false)



    function toggleSavedLabel() {
        console.log('toggle label save')
        setSavedLabel(!onSavedLabel)
    }


    useEffect(() => {


        const unsubscribeSave = eventBusService.on('label-saved', handleLabelSaved)
        const unsubscribeRemove = eventBusService.on('label-removed', handleLabelSaved)
        loadLabels()

        return () => {
            unsubscribeSave()
            unsubscribeRemove()
        }


    }, [])

    function handleLabelSaved() {
        loadLabels()
        onSetFilter(noteService.getDefaultFilter())
    }


    function loadLabels() {
        labelService.query()
            .then(labels => {
                setLabels(labels)
            })
    }
    return <div className='label-container'>
        {(labels) && <LabelList onSetFilter={onSetFilter} labels={labels} />}
        
        <Link to="/note/labeledit"><i className="fa-solid fa-tags"> </i><span>Edit Labels</span></Link>
       

    </div>
}