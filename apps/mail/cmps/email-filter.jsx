const { useState, useEffect } = React
const {useNavigate, useParams, Link } = ReactRouterDOM

import { MailCompose } from './email-compose.jsx';

import { emailService } from '../services/mail.service.js';
import { utilService } from '../../../services/util.service.js';

export function MailFilter({ onSaveMail }) {

    const [isCompose, setIsCompose] = useState(false)
    const [mail, setMail] = useState(emailService.getEmptyMail())
    const navigate = useNavigate()
    
    function onSubmiMail(ev) {
        ev.preventDefault()
        mail.from = 'user@appsus.com'
        mail.author = 'Mahatma Appsus'
        mail.sentAt = Date.now()
        onSaveMail(mail)
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        setMail((prevMail => {
            return { ...prevMail, [field]: value }
        }))
    }

    return <section className="mail-filter">
        <ul className="filter">
            <div onClick={() => setIsCompose(!isCompose)}><i className="fa-regular fa-pen-to-square"></i> Compose</div>
            <li>Inbox</li>
            <li>Starred</li>
            <li>Sent Mail</li>
            <li>Drafts</li>
        </ul>
        {isCompose && <MailCompose onSubmiMail={onSubmiMail} handleChange={handleChange} />}
    </section>
}