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

    function isVisible() {
        const updatedNote = note.type = ''
        setNote(updatedNote)

    }


    return <div className="add-note-container">
        <div className="add-note">
            <div onClick={(ev) => setNoteType('note-txt', ev)}>
                Enter Text...

            </div>
            <div>
                <i className="fa-solid fa-image" onClick={(ev) => setNoteType('note-img', ev)}></i>
                <i className="fa-solid fa-list-check" onClick={(ev) => setNoteType('note-todos', ev)}></i>
                <i className="fa-brands fa-youtube" onClick={(ev) => setNoteType('note-video', ev)}></i>
            </div>

        </div>
        <div>
            {(note.type) && <DynamicCmpEdit isVisible={isVisible} type={note.type} info={note.info} style={note.style} />}
        </div>
    </div>

}




// add note inside fake input,get empty note based on button presed with type
// opens dynmic cmp base on type which opens dynmic edit