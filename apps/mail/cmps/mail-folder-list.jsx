
const { useState, useEffect, Fragment } = React

import ReactLogo from ''
export function MailFolderList({ displayDeleted, displayStarred, displaySent }) {
    const [activeDeleted, setActiveDeleted] = useState(null)
    const [activeStar, setActiveStar] = useState(null)
    const [activeSent, setActiveSent] = useState(null)

    return <div>

        <button className={activeDeleted ? 'active' : null} onClick={() => { displayDeleted(true); setActiveDeleted(!activeDeleted) }}><i className="fa fa-search"></i></button>
        <button className={activeStar ? 'active' : null} onClick={() => { displayStarred(true); setActiveStar(!activeStar) }}>Starred</button>
        <button className={activeSent ? 'active' : null} onClick={() => { displaySent(true); setActiveSent(!activeSent) }}>Sent Mail</button>
    </div>
}