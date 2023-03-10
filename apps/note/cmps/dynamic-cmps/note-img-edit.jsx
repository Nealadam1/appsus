import { showErrorMsg, showSuccessMsg } from "../../../../services/event-bus.service.js"
import { noteService } from "../../services/note.service.js"
const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

export function NoteImgEdit({ isVisible }) {
  const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
  const navigate = useNavigate()
  const { noteId } = useParams()

  useEffect(() => {
    if (!noteId) return
    loadNote()
  }, [])

  function loadNote() {
    noteService.get(noteId)
      .then((note) => setNoteToEdit(note))
      .catch((err) => {
        console.log('had issue in note detail', err)
        navigate('/note')
      })
  }

  function handleChange({ target }) {
    let { value, type, name: field } = target
    value = type === 'number' ? +value : value
    setNoteToEdit((prevnote) => ({ ...prevnote, "info": { ...prevnote.info, [field]: value } }))
  }

  function onSaveNote(ev) {
    ev.preventDefault()
    noteToEdit.type = 'note-img'
    noteService.save(noteToEdit).then((note) => {
      showSuccessMsg('Note saved!')
      navigate('/note')
      isVisible()
    })
  }


  return <div>
    <div >
      <input type="text"
        name="title"
        placeholder="Enter Title"
        value={noteToEdit.info.title}
        onChange={handleChange} />
      <hr />
      <input type="text"
        name="url"
        placeholder="Enter img link: http://..."
        value={noteToEdit.info.url}
        onChange={handleChange} />
      <div>
        <p onClick={onSaveNote}>{noteToEdit.id ? 'Save' : 'Create'}</p>
        <p onClick={() => isVisible()} >Close</p>
      </div>
    </div>

  </div>
}