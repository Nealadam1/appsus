const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

import { MailPreview } from "./mail-preview.jsx"
import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"


export function MailList({ mails, isRenderDeleted, displayStarred, displaySent }) {
    const [unreadCount, setUnreadCount] = useState(null)
    const [sentMails, setSentMails] = useState(null)
    const deletedMails = mails.filter(mail => mail.isDeleted)
    const starredMails = mails.filter(mail => mail.isStared)


    useEffect(() => {
        const count = mails.filter(mail => !mail.isRead).length
        setUnreadCount(count)
        getSentMails()
    }, [mails])

    function handleMailRead(dif) {
        setUnreadCount(unreadCount + (dif))
    }

    function getSentMails() {
        mailService.getSentMails().then(mails => setSentMails(mails))
    }


    return <section className="mail-container">
        <div className="btn-container"></div>
        <div className="inbox-unread"><i className="fa-solid fa-inbox"></i> <span className="unread-mail-count">{unreadCount}</span> </div>
        <table border="0" cellSpacing="0">
            <thead>
            </thead>
            <tbody>

                {displayStarred && starredMails.map(mail => {
                    return <Fragment>{mail.isStared && <MailPreview mail={mail} key={mail.id} onMailRead={handleMailRead} isRenderDeleted={isRenderDeleted} />}</Fragment>
                })}

                {displaySent && sentMails.map(mail => {
                    return <MailPreview mail={mail} key={mail.id} onMailRead={handleMailRead} isRenderDeleted={isRenderDeleted} />
                })}

                {isRenderDeleted && deletedMails.map(mail => {
                    return <Fragment>{mail.isDeleted && <MailPreview mail={mail} key={mail.id} onMailRead={handleMailRead} isRenderDeleted={isRenderDeleted} />}</Fragment>
                })}

                {(!isRenderDeleted && !displayStarred) && mails.map(mail => {
                    return <MailPreview mail={mail} key={mail.id} onMailRead={handleMailRead}
                        displayStarred={displayStarred} displaySent={displaySent} />
                })}
            </tbody>
        </table>

    </section >

}
