import { storageServiceAsync } from "./async-storage.service.js"
import { storageService } from "./storage.service.js"
const LABELS_KEY = 'labelsDB'
_createLabels()
export const labelService = {
    query,
    get,
    remove,
    save,
    getEmptyLabel,
}

function query() {
    return storageServiceAsync.query(LABELS_KEY)
}

function get(lableId) {
    return storageServiceAsync.get(LABELS_KEY, lableId)
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

function getEmptyLabel(labelName = '', color = 'grey') {
    return { labelName, color }
}

function _createLabels() {
    let labels = storageService.loadFromStorage(LABELS_KEY)
    if (!labels || !labels.length) {
        labels = [
            {
                id:1,
                labelName: 'Important',
                color: '#e66465'
            },
            {
                id:2,
                labelName: 'funny',
                color: '#f6b73c'
            }]
    }
    storageService.saveToStorage(LABELS_KEY, labels)
}
