import { storageService } from '../../../services/storage.service.js'
import { storageServiceAsync } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_demoData()
console.log('adding demo data');

export const mailService = {
    query,
    save,
    remove,
    get,
    getEmptyMail

}


function query() {
    return storageServiceAsync.query(MAIL_KEY)
        .then(books => books)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function getEmptyMail(subject = '', body = '', isRead = false, sentAt = 0, to = '') {
    return { id: utilService.makeId(), subject, body, isRead, sentAt, to }
}

function _createMails() {

}

function _createMail(subject = '', body = '', isRead = false, sentAt = 0, to = '') {
    return getEmptyMail(subject, body, isRead, sentAt, to)
}

function _demoData() {
    let emails = []

    emails.push(_createMail('Miss you!', 'Would love to catch up sometimes', false, 1551133930594, loggedinUser.email))
    emails.push(_createMail('Miss you!', 'Would love to catch up sometimes', false, 1551133930594, loggedinUser.email))
    emails.push(_createMail('Miss you!', 'Would love to catch up sometimes', false, 1551133930594, loggedinUser.email))
    emails.push(_createMail('Miss you!', 'Would love to catch up sometimes', false, 1672222756881, loggedinUser.email))

    storageService.saveToStorage(MAIL_KEY, emails)
}