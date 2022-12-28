import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function NoteIndex() {
        const [isLoading, setIsLoading] = useState(false)
        const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
        const [notes, setNotes] = useState([])

        useEffect(() => {
            loadNotes()
        }, [])

        function loadNotes() {
            setIsLoading(true)
            noteService.query()
                .then((notes) => {
                    console.log(notes)
                    setNotes(notes)
                    setIsLoading(false)
                })
        }

        function onRemoveNote(noteId){
            noteService.remove(noteId)
            .then(()=>{
                const updatedNotes =notes.filter(note=>note.id!==noteId)
                setNotes(updatedNotes)
                showSuccessMsg('Note deleted')
                
            })
            .catch((err)=>{
                showErrorMsg('Delete note failed')
            })
        }






        return <section className="notes-index">
            <div className="notes-container">
                <NoteFilter/>
                {isLoading && <div>Loading..</div>}
                {!isLoading && <NoteList notes={notes} onRemoveNote={onRemoveNote}/>}
                

            </div>
        </section>

   

}

