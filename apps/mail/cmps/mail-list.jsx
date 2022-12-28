const { Link } = ReactRouterDOM

import { MailPreview } from "./mail-preview.jsx"

import { utilService } from "../../../services/util.service.js"


export function MailList({ mails }) {

    return <section className="mail-container">
        <div className="btn-container">a</div>

        <table border="0" cellSpacing="0">
            <thead>
                <tr>
                    <th>Starred</th>
                    <th>Vendor</th>
                    <th>Speed</th>
                </tr>
            </thead>
            <tbody>
                {mails.map(mail => {
                    console.log(mail.isStared);
                    return <MailPreview mail={mail} key={mail.id} />
                })}
            </tbody>
        </table>


        {/* {mails.map(mail => <div key={mail.id} className="mail-content">
            <button>select</button>
            <button onClick={() => starMsg(mail.id)}>star</button>

            <Link to={`/mail/${mail.id}`} key={mail.id} className='mail'>

                <div>{shortEmail(mail.subject)}</div>
                <div>{shortBody(mail.body)}</div>
                <div>{utilService.displayDate(mail.sentAt)}</div>
            </Link>
        </div>
        )
        } */}

    </section >

}
