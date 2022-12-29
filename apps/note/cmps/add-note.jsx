import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"
import { DynamicCmpEdit } from "./dynamic-cmps/dynamic-cmp-edit.jsx"


const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function AddNote() {
    const [note, setNote] = useState({})

    useEffect(() => {
        setNote(() => noteService.getEmptyNote())
    }, [])
    console.log(note)

    function setNoteType(noteType, ev) {
        ev.stopPropagation()
        setNote((prevnote) => ({ ...prevnote, type: noteType }))
        console.log(note)
    }


    return <div className="add-note-container">
        <div className="add-note">
            <div onClick={(ev) => setNoteType('note-txt',ev)}>
                Enter Text...
                <button onClick={(ev) => setNoteType('note-img', ev)}>IMG</button>
                <button onClick={(ev) => setNoteType('note-todos', ev)}>TODO</button>
                <button onClick={(ev) => setNoteType('note-video', ev)}>YT</button>
            </div>

        </div>
        <div className="edit-note-container">
            {(note.type) && <DynamicCmpEdit type={note.type} info={note.info} style={note.style} />}
        </div>
    </div>

}




// add note inside fake input,get empty note based on button presed with type
// opens dynmic cmp base on type which opens dynmic edit