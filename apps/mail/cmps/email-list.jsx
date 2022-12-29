const { Link } = ReactRouterDOM

import { EmailPreview } from './email-preview.jsx';
export function MailList({ mails, onRemoveMail }) {
    return <section className="mail-list">
        {
            mails.map(mail => <table key={mail.id} className="mail-list">
                <EmailPreview mail={mail} onRemoveMail={onRemoveMail} />
            </table>)
        }
    </section>
}