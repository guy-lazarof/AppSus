const { Link } = ReactRouterDOM
const { useState, useEffect } = React

import { EmailPreview } from './email-preview.jsx';

export function MailList({ mails, onRemoveMail, onStarMail, markedEmails, setMarkedEmails }) {

    

    return <section className="mail-list">
        {
            mails.map(mail => <table key={mail.id} className="mail-list">
                <EmailPreview mail={mail} onRemoveMail={onRemoveMail} onStarMail={onStarMail}
                 markedEmails={markedEmails} setMarkedEmails={setMarkedEmails}/>
            </table>)
        }
    </section>
}