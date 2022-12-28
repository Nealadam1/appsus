const { useState, useEffect, Fragment } = React
const { Link, useParams } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [isReadMail, setIsReadMail] = useState(false)
    const { id } = useParams()
    let readDynmClass = mail.isRead ? 'read-mail' : 'unread-mail'

    useEffect(() => {
        getWindowSize()

        window.addEventListener('resize', () => { setWindowWidth(getWindowSize()) })

        return () => {
            console.log('stopped');
        }
    }, [])

    function getWindowSize() {
        const { innerWidth } = window;
        return innerWidth
    }

    function shortBody(textBody) {
        if (textBody.length > windowWidth / 17) return textBody.substring(0, windowWidth / 17) + '...'
        else return textBody.substring(0, textBody.length) + '...'
    }

    function shortEmail(mail) {
        if (mail.length > 12) return mail.substring(0, 12)
        else return mail.substring(0, mail.length)
    }

    function setRead(id) {
        setIsReadMail(true)
        mail.isRead = true
        mailService.save(mail)
    }
    function unRead(id) {
        setIsReadMail(false)
        mail.isRead = false
        mailService.save(mail)
    }

    function starMsg(id) {
        console.log(id);
    }

    function expandMail() {
        console.log(id);
        return <Link to={`/mail/${mail.id}`} key={mail.id} className='mail'>
            <h2>hello</h2>
        </Link>
    }
    // console.log(mail);
    return <Fragment>
        <tr className={readDynmClass} onClick={() => {
            setRead(mail.id)
            setIsExpanded(!isExpanded)
        }}>
            <td className="left-side">
                <button onClick={() => starMsg(mail.id)}>Star</button>
                <button>select</button>
                <p>{mail.subject}</p>

            </td>
            <td>
                <p>{shortBody(mail.body)}</p>
            </td>
            <td>
                {utilService.displayDate(mail.sentAt)}
            </td>
        </tr>
        <tr hidden={!isExpanded} className="hidden-data">
            <td colSpan="3">
                <div className="hidden-container">
                    <div className="mail-btn-container">
                        <div>
                            <h2>{mail.subject}</h2>
                            <h3>{mail.fromName}</h3>
                            <h4>&#60;{mail.email}&#62;</h4>
                        </div>
                        <div className="btn-spacer">
                            <button>Delete</button>
                            <button onClick={() => {
                                setIsExpanded(!isExpanded)
                                unRead(mail.id)
                            }}>UnRead</button>
                            <button onClick={expandMail}>Expand</button>
                        </div>
                    </div>

                    <div className="">{mail.body}</div>

                </div>
            </td>
        </tr>
    </Fragment>
}