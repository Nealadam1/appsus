const { Link } = ReactRouterDOM

import { MailPreview } from "./mail-preview.jsx"

import { utilService } from "../../../services/util.service.js"


export function MailList({ mails }) {

    function shortBody(textBody) {
        if (textBody.length > 30) return textBody.substring(0, 30) + '...'
        else return textBody.substring(0, textBody.length) + '...'
    }

    function shortEmail(mail) {
        if (mail.length > 12) return mail.substring(0, 12)
        else return mail.substring(0, mail.length)
    }

    return <section className="mail-container">
        {mails.map(mail => <Link to={`/mail/${mail.id}`} key={mail.id} className='mail'>
            <div>{shortEmail(mail.subject)}</div>
            <div>{shortBody(mail.body)}</div>
            <div>{utilService.displayDate(mail.sentAt)}</div>
        </Link>)}

    </section>

}
