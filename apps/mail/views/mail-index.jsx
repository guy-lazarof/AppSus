const { useState, useEffect } = React
const {useNavigate, useParams, Link } = ReactRouterDOM

import { MailList } from '../cmps/email-list.jsx';
import { MailFilter } from '../cmps/email-filter.jsx';

import { emailService } from '../services/mail.service.js';


export function MailIndex() {

    const [isLoading, setIsLoading] = useState(false)
    const [mails, setMails] = useState([])
    const navigate = useNavigate()

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

    function onRemoveMail(mailId) {
        emailService.remove(mailId).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)
            console.log('d')
        })
            .catch((err) => {
                console.log('Had issues removing', err)
            })
    }

    function onSaveMail(mailToSave) {
        const newMail = { ...mailToSave }
        emailService.save(newMail)
            .then((mailsFromService) => {
                loadMails()
            })
            .catch((err) => {
                console.log('err:', err);
            })
    }

    return <section className="mail-index full main-layout">
        {!isLoading && <MailFilter mails={mails} onSaveMail={onSaveMail} />}
        {!isLoading && <MailList mails={mails} onRemoveMail={onRemoveMail} />}
    </section>
}