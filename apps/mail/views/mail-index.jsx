const { useState, useEffect } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

import { MailList } from "../cmps/mail-list.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { LoadingSpinner } from "../../../cmps/loading-spinner.jsx"
import { MailFolderList } from "../cmps/mail-folder-list.jsx"
import { mailService } from "../services/mail.service.js"
import { MailCompose } from "../cmps/mail-compose.jsx"

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(null)
    const [renderDeleted, setRenderDeleted] = useState(null)

    useEffect(() => {
        loadMails(filterBy)
    }, [filterBy])

    function displayDeleted() {
        setRenderDeleted(!renderDeleted)
    }

    function loadMails() {
        mailService.query(filterBy).then(mails => setMails(mails))
    }

    function setFilter(filterBy) {
        setFilterBy(filterBy)
    }

    if (!mails) return <LoadingSpinner />
    return <div className="main-container">

        <div className="compose-email">
            <Outlet />
        </div>

        <MailCompose />
        <MailFolderList displayDeleted={displayDeleted} />

        <MailFilter setFilter={setFilter} />
        <MailList mails={mails} isRenderDeleted={renderDeleted} />
    </div>
}

