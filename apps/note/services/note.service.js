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
            if (!filterby.isTrash && !filterby.isArchived) {
                notes = notes.filter(note => !note.isTrash)
                notes = notes.filter(note => !note.isArchived)
                 if (filterby.labels) {
                    notes = notes.filter(note => {
                        return filterby.labels.some(label => note.labels.includes(label))
                    })
                }

            } else {
                if (filterby.isTrash) {
                    notes = notes.filter(note => note.isTrash)
                }
                if (filterby.isArchived) {
                    notes = notes.filter(note => note.isArchived)
                }
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

function getEmptyNote(type = '', isArchived = false, isTrash = false, isPinned = false, labels = [], info = {
    url: '', title: '', txt: '',
    label: '', todos: [{ id: "BLxn86", txt: '' }]
}) {
    return { type, isPinned, isArchived, isTrash, info, labels }
}

function getDefaultFilter() {
    return { labels: null, isArchived: false, isPinned: false, isTrash: false }
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = [{
            id: "n101",
            type: "note-txt",
            isArchived: false,
            isPinned: true,
            isTrash: false,
            labels: [],
            info: {
                txt: "Shows to watch later",
                title: "Bojack horseman"
            }
        },
        {
            id: "n102",
            type: "note-img",
            labels: [],
            isArchived: false,
            isPinned: false,
            isTrash: false,
            info: {
                url: "http://www.radicalart.info/something/On_Kawara-63-Something-NSE-s.jpg",
                title: "Bobi and Me"
            },
            style:"#ffe666"
            
        },
        {
            id: "n103",
            type: "note-video",
            isArchived: false,
            isPinned: false,
            isTrash: false,
            labels: [],
            info: {
                url: "https://www.youtube.com/watch?v=t9Pbd89lOZs",
                title: "Recipe for later"
            },
            style:"#e3b7d2"
        },
        {
            id: "n104",
            type: "note-todos",
            isArchived: false,
            isPinned: false,
            isTrash: false,
            labels: [],
            info: {
                label: "Get my stuff together",
                todos: [
                    { id: "dsadsa", txt: "Driving liscence", doneAt: null },
                    { id: "ddjhg", txt: "Coding power", doneAt:null }
                ]
            }
        },
        {
            id: "n105",
            type: "note-video",
            isArchived: false,
            isPinned: false,
            isTrash: false,
            labels: [],
            info: {
                url: "https://www.youtube.com/watch?v=NBMqqaClEQ8",
                title: "Awsome Graffiti"
            },
            style:"#e3b7d2"
        },
        {
            id: "n1063",
            type: "note-video",
            isArchived: true,
            isPinned: false,
            isTrash: false,
            labels: [],
            info: {
                url: "https://www.youtube.com/watch?v=VvU27gvAK40",
                title: "Should i sign up?"
            },
            style:"#e3b7d2"
        },]
    }
    storageService.saveToStorage(NOTES_KEY, notes)
}

function _createNote(type, isPinned, info) {
    const note = getEmptyNote(type, isPinned, info)
    return note
}