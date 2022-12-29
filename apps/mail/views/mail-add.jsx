const { Link, NavLink, Route, Routes, Outlet, useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailAdd() {
    const navigate = useNavigate()
    const [newMail, setNewMail] = useState(mailService.getEmptyMail())

    function onSaveMail(ev) {
        ev.preventDefault()
        mailService.submitMail(newMail)
        // mailService.save(newMail)
        navigate('/mail')
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        setNewMail(prevMail => {
            return { ...prevMail, [field]: value }
        })
    }

    return <form className="compose-container" onSubmit={onSaveMail} >
        <div className="text-area">
            <div className="msg-header">
                <span>New Message</span>
                <button onClick={() => navigate('/mail')}>X</button>
            </div>
            <input type="email"
                placeholder="Recipients"
                onChange={handleChange}
                value={newMail.to}
                name="to" />

            <input type="text"
                placeholder="Subject"
                onChange={handleChange}
                value={newMail.subject}
                name="subject" />

            <textarea name="body" id=""
                cols="30"
                rows="10"
                value={newMail.body}
                onChange={handleChange}></textarea>

            <div>
                <button type="submit">Send</button>
            </div>
        </div>
    </form>
}