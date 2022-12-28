const { useState, useEffect } = React

import { emailService } from '../services/mail.service.js';
import { MailList } from './email-list.jsx';

export function EmailApp() {

    const [isLoading, setIsLoading] = useState(false)
    const [mails, setMails] = useState([])

    useEffect(() => {
        setIsLoading(true)
        loadMails()
    }, [])

    function loadMails() {
        emailService.query().then(mailsToUpdate => {
            setMails(mailsToUpdate)
            setIsLoading(false)
        })
    }

    return <section className="mail-index full main-layout">
        {!isLoading && <MailList mails={mails} />}
    </section>
}