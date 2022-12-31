import { storageServiceAsync } from "./async-storage.service.js"
import { storageService } from "./storage.service.js"
import { utilService } from "./util.service.js"
const LABELS_KEY = 'labelsDB'
_createLabels()
export const labelService = {
    query,
    get,
    remove,
    save,
    getEmptyLabel,
    set,
}

function query() {
    return storageServiceAsync.query(LABELS_KEY)
}

function get(lableId) {
    return storageServiceAsync.get(LABELS_KEY, lableId)
}

function set(labels){
    return storageServiceAsync.set(LABELS_KEY, labels)
}

function remove(lableId) {
    return storageServiceAsync.remove(LABELS_KEY, lableId)
}

function save(label) {
    if (label.id) {
        return storageServiceAsync.put(LABELS_KEY, label)
    } else {
        return storageServiceAsync.post(LABELS_KEY, label)
    }
}

function getEmptyLabel(labelName = '', color = '#888888') {
    return { labelName, color }
}

function _createLabels() {
    let labels = storageService.loadFromStorage(LABELS_KEY)
    if (!labels || !labels.length) {
        labels = [
            {
                id:"o0XHj3",
                labelName: 'Important',
                color: '#e66465'
            },
            {
                id:"F5i1UG",
                labelName: 'Funny',
                color: '#f6b73c'
            }]
    }
    storageService.saveToStorage(LABELS_KEY, labels)
}
