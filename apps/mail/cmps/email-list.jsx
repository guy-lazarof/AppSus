const { Link } = ReactRouterDOM

import { EmailPreview } from './email-preview.jsx';

export function MailList({ mails }) {

    return <ul className="book-list">
        {
            mails.map(mail => <li key={mail.id}>
                <EmailPreview mail={mail} />
            </li>)
        }
    </ul>
}