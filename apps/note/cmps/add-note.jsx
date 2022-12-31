import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"
import { DynamicCmpEdit } from "./dynamic-cmps/dynamic-cmp-edit.jsx"


const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function AddNote({ onCloseEdit }) {
    const [note, setNote] = useState({})

    useEffect(() => {
        setNote(() => noteService.getEmptyNote())
    }, [])


    function setNoteType(noteType, ev) {
        ev.stopPropagation()
        setNote((prevnote) => ({ ...prevnote, type: noteType }))
    }

    function isVisible() {
        const updatedNote = note.type = ''
        setNote(updatedNote)
        onCloseEdit()

    }


    return <div className="add-note-container">
        <div className="add-note">
            <div className="add-note-entertxt" onClick={(ev) => setNoteType('note-txt', ev)}>
                Enter Text...

            </div>
            <div>
                <i className="fa-solid fa-image" onClick={(ev) => setNoteType('note-img', ev)}></i>
                <i className="fa-solid fa-list-check" onClick={(ev) => setNoteType('note-todos', ev)}></i>
                <i className="fa-brands fa-youtube" onClick={(ev) => setNoteType('note-video', ev)}></i>
            </div>

        </div>
        <div>

            {(note.type) &&
                <div>
                    <div className="edit-note-container">
                        <DynamicCmpEdit isVisible={isVisible} type={note.type} info={note.info} style={note.style} />
                    </div>
                    <div onClick={isVisible} className="dark-background"></div>
                </div>}
        </div>
    </div>

}
