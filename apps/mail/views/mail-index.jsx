const { useState, useEffect } = React

import { MailList } from "../cmps/mail-list.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"

import { mailService } from "../services/mail.service.js"

export function MailIndex() {
    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
    }, [])

    console.log(mails)

    function loadMails() {
        mailService.query().then(mails => setMails(mails))
    }


    return <div>
        <MailFilter />
        <MailList mails={mails} />
    </div>
}

