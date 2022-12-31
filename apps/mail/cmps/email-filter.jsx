const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { MailCompose } from './email-compose.jsx';

import { emailService } from '../services/mail.service.js';
import { utilService } from '../../../services/util.service.js';

export function MailFilter({ onSaveMail, onSetFilter, filterBy }) {

    const [isCompose, setIsCompose] = useState(false)
    const [mail, setMail] = useState(emailService.getEmptyMail())

    function toggleMenu() {
        document.body.classList.toggle('menu-open')
    }

    function onSubmiMail(ev) {
        ev.preventDefault()
        mail.from = 'user@appsus.com'
        mail.author = 'Mahatma Appsus'
        mail.sentAt = Date.now()
        onSaveMail(mail)
        setIsCompose(!isCompose)
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        setMail((prevMail => {
            return { ...prevMail, [field]: value }
        }))
    }
    return <section className="mail-filter">
        <ul className="filter">
            <li className="compose" onClick={() => setIsCompose(!isCompose)}><i className="compose fa-regular fa-pen-to-square"></i> Compose</li>
            <li onClick={() => onSetFilter('inbox')} className={filterBy === 'inbox' ? 'bold' : ''}><i className="fa-solid fa-inbox"></i>Inbox</li>
            <li onClick={() => onSetFilter('stared')} className={filterBy === 'stared' ? 'bold' : ''}><i className="fa-regular fa-star"></i>Stared</li>
            <li onClick={() => onSetFilter('sent')} className={filterBy === 'sent' ? 'bold' : ''}><i className="fa-solid fa-caret-right"></i>Sent</li>
            <li onClick={() => onSetFilter('drafts')} className={filterBy === 'drafts' ? 'bold' : ''}><i className="fa-regular fa-folder"></i>Drafts</li>
        </ul>
        {isCompose && <MailCompose onSubmiMail={onSubmiMail} handleChange={handleChange} />}
        <button className="menu-toggle-btn" onClick={() => { toggleMenu() }}>☰</button>
    </section>
}

