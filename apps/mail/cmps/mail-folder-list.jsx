
const { useState, useEffect, Fragment } = React
import { MailCompose } from "../cmps/mail-compose.jsx"

import ReactLogo from ''
export function MailFolderList({ displayDeleted, displayStarred, displaySent }) {
    const [activeDeleted, setActiveDeleted] = useState(null)
    const [activeStar, setActiveStar] = useState(null)
    const [activeSent, setActiveSent] = useState(null)

    return <section className="nav-container">
        <aside>
            <div>
                <MailCompose />
            </div>
            <div>
                <button className={activeDeleted ? 'active' : null} onClick={() => { displayDeleted(true); setActiveDeleted(!activeDeleted) }}><i className="fa-solid fa-trash"></i> <span>Trash</span></button>
            </div>

            <div>
                <button className={(activeStar ? 'active' : null) + ' star'} onClick={() => { displayStarred(true); setActiveStar(!activeStar) }}><i className="fa-solid fa-star"></i> <span>Starred</span></button>
            </div>

            <div>
                <button className={activeSent ? 'active' : null} onClick={() => { displaySent(true); setActiveSent(!activeSent) }}><i className="fa-solid fa-paper-plane"></i> <span>Sent</span></button>
            </div>
        </aside>
    </section>
}