const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { emailService } from '../services/mail.service.js';
import { utilService } from '../../../services/util.service.js';

export function MailDetails(){

    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()
    const [sentAt, setSentAt] = useState('')

    useEffect(() => {
        loadMail()
    }, [])

    useEffect(() => {
        if (mail) {
            setSentAt(utilService.convertTimestampToHour(mail.sentAt))
        }
    }, [mail])

    function loadMail() {
        emailService.get(mailId)
            .then((mail) => {
                setMail(mail)
            })
            .catch((err) => {
                console.log('Had issues in mail', err)
                navigate('/mail')
            })
    }

    if (!mail) return <div>Loading...</div>

    return <section className="mail-details">
        <h1>{mail.subject}</h1>
        <div className="mail-head flex space-between">
        <span className="sender">{mail.author}</span>
        <div className="mail-head side flex space-between">
        <span className="sender"><i className="fa-regular fa-star"></i></span>
        <span className="time">{sentAt}</span>
        <span className="trash"><i className="fa-solid fa-trash-can"></i></span>

        </div>
        </div>
        <p>{mail.body}</p>
    </section>
}
