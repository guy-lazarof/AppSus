const { useEffect, useState } = React
const { useParams, useNavigate} = ReactRouterDOM
const { Link } = ReactRouterDOM


import { emailService } from '../services/mail.service.js';
import { utilService } from '../../../services/util.service.js';

import { MailFilter } from '../cmps/email-filter.jsx';

export function MailDetails() {

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
            mail.isRead = true
            emailService.save(mail)
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

    function onRemoveMail(mailId) {
        emailService.remove(mailId).then(() => {
            navigate('/mail')
        })
            .catch((err) => {
                console.log('Had issues removing', err)
            })
    }

    if (!mail) return <div>Loading...</div>

    return <section className="mail-details">
        {/* <MailFilter /> */}
        <div className="logo-area"><Link to={`/mail`}>
                    <i className="logo fa-regular fa-envelope"> Gmail</i></Link>
                </div>
        <div className="main"><h1>{mail.subject}</h1>
            <div className ="main-first-line flex"><span className="sender">{mail.author}</span>
            <span className="trash" onClick={(event) => {
                onRemoveMail(mail.id)
                event.stopPropagation()
            }} ><i className="fa-solid fa-trash-can"></i></span></div>
            <span className="time">{sentAt}</span>
        <p>{mail.body}</p>
        </div>
    </section>
}
