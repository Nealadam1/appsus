const { useState, useEffect } = React

import { MailList } from "../cmps/mail-list.jsx"

import { mailService } from "../services/mail.service.js"

export function MailIndex() {
    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query().then(mails => setMails(mails))
    }


    return <div><MailList mails={mails} /></div>
}

