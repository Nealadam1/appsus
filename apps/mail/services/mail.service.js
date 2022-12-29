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
    getEmptyMail,
    getDefaultFilter

}


function query(filterBy = getDefaultFilter()) {
    return storageServiceAsync.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.name) {
                const regex = new RegExp(filterBy.name, 'i')
                mails = mails.filter(mail => regex.test(mail.subject))
            }
            if (filterBy.subject) {
                console.log('subject')
                const regex = new RegExp(filterBy.subject, 'i')
                mails = mails.filter(mail => regex.test(mail.subject))
            }
            if (filterBy.label) {
                console.log('label')
            }
            if (filterBy.mail) {
                console.log('mail')
                const regex = new RegExp(filterBy.mail, 'i')
                mails = mails.filter(mail => regex.test(mail.email))
            }
            if (filterBy === null) {
                mails = mails
            }
            // console.log(filterBy);
            return mails
        })
}

function save(mail) {
    if (mail.id) {
        return storageServiceAsync.put(MAIL_KEY, mail)
    } else {
        return storageServiceAsync.post(MAIL_KEY, mail)
    }
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function get(mailId) {
    console.log(mailId);
    return storageServiceAsync.get(MAIL_KEY, mailId)
}

function getEmptyMail(subject = '', email = '', body = '', isRead = false, isStared = false, sentAt = 0, to = '', fromName = '', isDeleted = false) {
    return { id: utilService.makeId(), email, subject, body, isRead, isStared, sentAt, to, fromName, isDeleted }
}

function getDefaultFilter() {
    return { mail: '', currFolder: '', label: '', subject: '' }
}

function _createMails() {

}

function _createMail(subject = '', email = '', body = '', isRead = false, isStared = false, sentAt = 0, to = '', fromName = '', isDeleted = false) {
    return getEmptyMail(subject, email, body, isRead, isStared, sentAt, to, fromName, isDeleted)
}

function _demoData() {
    let emails = storageService.loadFromStorage(MAIL_KEY)

    if (!emails || !emails.length) {
        emails = []
        emails.push(_createMail('Miss you!', 'fa@gaeaf.com', 'Would love to catch up sometimes', false, false, 1672222756881, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1551133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Sumalian proplayer !', 'sumalilandplayerProproPro@gmail.com', 'Hello am 48 year man from somalia. Sorry for my bed england. I selled my wife for internet connection for play "conter strik" and i want to become the goodest player like you I play with 400 ping on brazil and i am global elite 2. pls no copy pasterio my story',
            false, false, 1581133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Nigirian Scammer', 'eahaow@gmail.com', `Hello,
            With all due respect, I want you to read my letter with one mind and help me. I am Miss Caroline Freund, The only daughter of late Mr. and Mrs. Freund, My Late father was a very wealthy cocoa dealer in Abidjan Côte d'Ivoire. before he was poisoned to death by his business associates on one of their outing to discuss on a business deal.
            When my mother died when she was given birth to me, my father took me so special because I am motherless. Before the death of my late father on 22nd June 2013 in a private hospital here in Abidjan Côte d'Ivoire. He secretly called me on his bedside and told me that he has a sum of $7.5M (Seven Million five Hundred Thousand Dollars) left in a suspense account in a local bank here in Abidjan Côte d'Ivoire, that he used my name as his only daughter for the next of kin in deposit of the fund.
            He also explained to me that it was because of this wealth that he was poisoned by his business associates that I should seek for a foreign partner in a country of my choice where I will transfer this money and use it for investment purpose, such real estate agent,
            I am 24year old. Dear I am honorably seeking your assistance in the following ways.
            1) To provide any bank account where this money would be transferred into.
            2) To serve as the guardian of this fund.
            3) To make arrangement for me to come over to your country to further my education and to secure a residential permit for me in your country.
            Moreover, I am willing to offer you 30 percent of the total sum as compensation for your effort input after the successful transfer of this fund to your nominated account overseas.
            I want you to help me not because of the 30 percent I want to offer you but to take me as your adoptive child and take good care of my life. Please save my life.
            Hope to hear from you immediately for more details for you to receive the money so that I can be coming to your country immediately after you have receive the money so that I can continue my education while this money will be invested by you.
            Thanks and God Bless.
            Best regards,
            Miss Caroline Freund.`, false, false, 1551133930594, loggedinUser.email, 'eden'))


        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        emails.push(_createMail('Steam Store', 'steamStore@gmail.com', 'You have sold an item on the Community Market, An item you listed in the Community Market has been sold to RichHammond. Your Steam Wallet has been credited 0.01 ILS.', false, false, 1451133930594, loggedinUser.email, 'eden'))
        storageService.saveToStorage(MAIL_KEY, emails)
    }

}