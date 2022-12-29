const { useState, useEffect, Fragment } = React

export function MailFolderList({ displayDeleted, displayStarred, displaySent }) {
    const [activeBtn, setActiveBtn] = useState(null)

    return <div>
        <button className={activeBtn === 'deleted' ? 'active' : null} onClick={() => { displayDeleted(true); setActiveBtn('deleted') }}>Deleted</button>
        <button className={activeBtn === 'starred' ? 'active' : null} onClick={() => { displayStarred(true); setActiveBtn('starred') }}>Starred</button>
        <button className={activeBtn === 'sent' ? 'active' : null} onClick={() => { displaySent(true); setActiveBtn('sent') }}>Sent Mail</button>
    </div>
}