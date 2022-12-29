const { useState, useEffect, Fragment } = React
const { Link, useParams } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail, onMailRead, isRenderDeleted, displayStarred, displaySent }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [staredMsg, setStaredMsg] = useState(false)
    const { id } = useParams()
    let readDynmClass = mail.isRead ? 'read-mail' : 'unread-mail'
    let staredDynmClass = staredMsg ? 'favorite' : 'normal'

    useEffect(() => {
        getWindowSize()
        setStaredMsg(mail.isStared)
        window.addEventListener('resize', () => { setWindowWidth(getWindowSize()) })

        return () => {
        }
    }, [mail])

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

    const setRead = () => {
        if (mail.isRead) return
        else onMailRead(-1)

        mail.isRead = true
        mailService.save(mail)
        // Call the onMailRead callback function when the mail is read

    }

    function unRead() {
        mail.isRead = false
        mailService.save(mail)
        onMailRead(1)
    }

    function starMsg(ev, id) {
        ev.stopPropagation()
        setStaredMsg(!staredMsg)
        mail.isStared = !staredMsg
        mailService.save(mail)
        console.log(id);
    }

    function selectMsg(ev, id) {
        ev.stopPropagation()

    }

    function onDeleteMail() {
        mail.isDeleted = true
        mailService.save(mail)
    }

    function expandMail() {
        console.log(id);
        return <Link to={`/mail/${mail.id}`} key={mail.id} className='mail'>
            <h2>hello</h2>
        </Link>
    }

    function renderDeleted() {
        if (isRenderDeleted) return !mail.isDeleted
        else return mail.isDeleted
    }
    function renderSent() {
        if (displaySent) {
            isRenderDeleted = false
            displayStarred = false
            return true
        } else return false
    }


    // console.log(mail.id);

    return <Fragment key={`test${mail.id}`}>
        <tr hidden={renderDeleted()} className={readDynmClass + ' ' + staredDynmClass} onClick={() => {
            setRead(mail.id)
            setIsExpanded(!isExpanded)
        }}>


            <td className="left-side">
                <button className="fav-btn" onClick={(ev) => starMsg(ev, mail.id)}>Star</button>
                {/* <button onClick={(ev) => selectMsg(ev, mail.id)}>select</button> */}
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
                            <button onClick={() => {
                                onDeleteMail()
                                setIsExpanded(!isExpanded)
                            }}><i className="fa-solid fa-trash"></i></button>

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