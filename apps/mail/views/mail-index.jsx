const { useState, useEffect } = React
const {useNavigate, useParams, Link } = ReactRouterDOM

import { MailList } from '../cmps/email-list.jsx';
import { MailFilter } from '../cmps/email-filter.jsx';

import { emailService } from '../services/mail.service.js';


export function MailIndex({mails, onSetFilter, isLoading} ) {

    function onRemoveMail(mailId) {
        emailService.remove(mailId).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)
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
        {!isLoading && <MailFilter mails={mails} onSaveMail={onSaveMail} onSetFilter={onSetFilter} />}
        {!isLoading && <MailList mails={mails} onRemoveMail={onRemoveMail} />}
    </section>
}