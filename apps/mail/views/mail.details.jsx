const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { LoadingSpinner } from "../../../cmps/loading-spinner.jsx"
import { mailService } from "../services/mail.service.js"

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        getMail()
    }, [id])

    function getMail() {
        mailService.get(id)
            .then(mail => setMail(mail))
            .catch(err => {
                console.log('coulnd not get mail', err)
                navigate(-1)
            })
    }
    // console.log(mail);
    if (!mail) return <LoadingSpinner />
    return (<div>
        <h2>{mail.subject}</h2>
        <p>
            {mail.body}
        </p>
    </div>)
}