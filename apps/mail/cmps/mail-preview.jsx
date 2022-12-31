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
    let isFavorite = staredMsg ? 'fa-solid fa-star' : 'fa-regular fa-star'

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
        if (windowWidth > 1000) {
            if (textBody.length > windowWidth / 20) return textBody.substring(0, windowWidth / 20) + '...'
            else return textBody.substring(0, textBody.length) + '...'
        } else {
            if (textBody.length > windowWidth / 40) return textBody.substring(0, windowWidth / 40) + '...'
            else return textBody.substring(0, textBody.length) + '...'
        }
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
                <button className="fav-btn" onClick={(ev) => starMsg(ev, mail.id)}><i className={isFavorite}></i></button>
                {/* <button onClick={(ev) => selectMsg(ev, mail.id)}>select</button> */}
                <p>{mail.subject}</p>

            </td>

            <td>
                <p>{shortBody(mail.body)}</p>
            </td>

            <td>
                <p>{utilService.displayDate(mail.sentAt)}</p>
            </td>
        </tr>
        <tr hidden={!isExpanded} className="hidden-data">
            <td colSpan="3">

                <div className="hidden-container">

                    <div className="mail-btn-container">

                        <div className="mail-header">
                            <h2>{mail.subject}</h2>
                            <h4><span className="name-display">{mail.fromName}</span> &#60;{mail.email}&#62;</h4>
                        </div>

                        <div className="btn-spacer">
                            <button title="Delete mail" onClick={() => {
                                onDeleteMail()
                                setIsExpanded(!isExpanded)
                            }}><i className="fa-solid fa-trash"></i></button>

                            <button title="Unread mail" onClick={() => {
                                setIsExpanded(!isExpanded)
                                unRead(mail.id)
                            }}><i className="fa-solid fa-envelope"></i></button>

                            {/* <button onClick={expandMail}>Expand</button> */}

                        </div>

                    </div>

                    <div className=""><pre>{mail.body}</pre></div>

                </div>

            </td>
        </tr>
    </Fragment >
}