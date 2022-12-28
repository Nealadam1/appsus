export const mailService = {
    query,
    save,
    remove,
    get

}

console.log('Hi')

function query() {

}

function save() {

}

function remove() {

}

function get() {

}

function _createMails() {

}

function _createMail(subject = '', body = '', isRead = false, sentAt = 000, to = '') {
    return {
        id: '',
        subject,
        body,
        isRead,
        sentAt,
        to
    }
}

function _demoData() {
    let emails = []
    // emails.push(_createMail('Steam store'))
}