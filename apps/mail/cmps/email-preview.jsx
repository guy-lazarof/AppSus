import { utilService } from '../../../services/util.service.js';

export function EmailPreview({ mail }) {

    const sentAt = utilService.convertTimestampToHour(mail.sentAt)
    const shortTxt = (mail.body.length > 100) ? `${mail.body.substring(0, 100)}...` : mail.body
    
    return <article className="mail-preview flex justify-center space-between ">
        <div className="mail-subject">{mail.subject}</div>
        <div className="mail-body">{shortTxt}</div>
        <div className="mail-time">{sentAt}</div>
    </article>
}