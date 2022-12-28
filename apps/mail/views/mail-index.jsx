const { useState, useEffect } = React

import { MailList } from "../cmps/mail-list.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"

import { mailService } from "../services/mail.service.js"

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(null)

    useEffect(() => {
        loadMails(filterBy)
    }, [filterBy])

    // console.log(mails)

    function loadMails() {
        mailService.query(filterBy).then(mails => setMails(mails))
    }

    function setFilter(filterBy) {
        setFilterBy(filterBy)
    }

    return <div className="main-container">
        <MailFilter setFilter={setFilter} />
        <MailList mails={mails} />
    </div>
}

