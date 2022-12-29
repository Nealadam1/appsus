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

function getEmptyNote(type = '', isPinned = false, info = {url:'',title:'',txt:''
,label:'', todos:[{id:"BLxn86" ,txt:''}]}){
return { type, isPinned, info }
}

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
                txt: "Fullstack Me Baby!",
                title: "someTitle"
            }
        },
        {
            id: "n102",
            type: "note-img",
            info: {
                url: "http://www.radicalart.info/something/On_Kawara-63-Something-NSE-s.jpg",
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
                    {id:1 ,txt: "Driving liscence", doneAt: null },
                    {id:2, txt: "Coding power", doneAt: 187111111 }
                ]
            }
        },
        {
            id: "n104",
            type: "note-video",
            info: {
                url: "https://www.youtube.com/watch?v=NBMqqaClEQ8",
                title: "test vid"
            },
            style: {
                backgroundColor: "#00d"
            }
        },]
    }
    storageService.saveToStorage(NOTES_KEY,notes)
}

function _createNote(type,isPinned,info){
    const note=getEmptyNote(type,isPinned,info)
    return note
}