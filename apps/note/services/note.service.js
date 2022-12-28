import { storageServiceAsync } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/storage.service.js"

const NOTES_KEY = 'notesDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getNextNote,

}

function query(filterby = getDefaultFilter()) {
    return storageServiceAsync.query(NOTES_KEY)
        .then(notes => {
            if (filterby.label) {
                const regex = new RegExp(filterby.txt, 'i')
                notes = notes.filter(note => regex.test(note.label))
            }
            return notes
        })
}

function get(noteId) {
    return storageServiceAsync.get(NOTES_KEY, noteId)
}

function getNextNote(noteId) {
    return storageServiceAsync.query(NOTES_KEY)
        .then(notes => {
            var idx = notes.findIndex(note => note.id === noteId)
            if (idx === notes.length - 1) idx = -1
            return notes[idx + 1].id
        })
}

function remove(noteId) {
    return storageServiceAsync.remove(NOTES_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageServiceAsync.put(NOTES_KEY, note)
    } else {
        return storageServiceAsync.post(NOTES_KEY, note)
    }
}

function getEmptyNote(type = '', isPinned = false, info = {})
return { type, isPinned, info }

function getDefaultFilter() {
    return { label: '' }
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = [{
            id: "n101",
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: "n102",
            type: "note-img",
            info: {
                url: "http://some-img/me",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n103",
            type: "note-todos",
            info: {
                label: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }
                ]
            }
        }]
    }
}

function _createNote(type,isPinned,info){
    const note=getEmptyNote(type,isPinned,info)
    return note
}