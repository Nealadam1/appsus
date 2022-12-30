const { useState, useEffect } = React
const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM

import { MailList } from "../cmps/mail-list.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { LoadingSpinner } from "../../../cmps/loading-spinner.jsx"
import { MailFolderList } from "../cmps/mail-folder-list.jsx"
import { mailService } from "../services/mail.service.js"

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(null)
    const [renderDeleted, setRenderDeleted] = useState(null)
    const [renderStarred, setRenderStarred] = useState(null)
    const [renderSent, setRenderSent] = useState(null)

    useEffect(() => {
        loadMails(filterBy)
    }, [filterBy])

    // console.log(renderDeleted);
    // console.log(renderStarred);
    // console.log(renderSent);

    function displayDeleted() {
        setRenderDeleted(!renderDeleted)
    }

    function displayStarred() {
        setRenderStarred(!renderStarred)
    }

    function displaySent() {
        setRenderSent(!renderSent)
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
            <MailFolderList displayDeleted={displayDeleted} displayStarred={displayStarred} displaySent={displaySent} />
            <Outlet />
        </div>


        <MailFilter setFilter={setFilter} />
        <MailList mails={mails} isRenderDeleted={renderDeleted} displayStarred={renderStarred} displaySent={renderSent} />
    </div>
}

