const { Link } = ReactRouterDOM

import { EmailPreview } from './email-preview.jsx';

export function MailList({ mails }) {

    return <ul className="mail-list">
        {
            mails.map(mail => <li key={mail.id} className="mails">
                <EmailPreview mail={mail} />
            </li>)
        }
    </ul>
}