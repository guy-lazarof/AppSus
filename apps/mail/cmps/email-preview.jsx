import { utilService } from '../../../services/util.service.js';

export function EmailPreview({ mail }) {

    let sentAt = utilService.convertTimestampToHour(mail.sentAt)
    return <article className="mail-preview flex justify-center space-between ">
        <div className="mail-subject">{mail.subject}</div>
        <div className="mail-body">{mail.body}</div>
        <div className="mail-time">{sentAt}</div>
    </article>
}