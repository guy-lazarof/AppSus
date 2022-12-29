const { Link } = ReactRouterDOM

import { EmailPreview } from './email-preview.jsx';

export function MailList({ mails, onRemoveMail }) {

    return <ul className="mail-list">
        {
            mails.map(mail => <li key={mail.id} className="mail-list">
                <EmailPreview mail={mail} onRemoveMail={onRemoveMail} />
            </li>)
        }
    </ul>
}