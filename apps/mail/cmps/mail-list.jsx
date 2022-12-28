const { Link } = ReactRouterDOM

import { MailPreview } from "./mail-preview.jsx"

import { utilService } from "../../../services/util.service.js"


export function MailList({ mails }) {


    return <section className="mail-container">
        {mails.map(mail => <div key={mail.id} className='mail'>
            <div>{mail.subject}</div>
            <div>{mail.body}</div>
            <div>{utilService.displayDate(mail.sentAt)}</div>
        </div>)}

    </section>

}
