const { Link } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js';

export function EmailPreview({ mail }) {

    const sentAt = utilService.convertTimestampToHour(mail.sentAt)
    const mainTxt = mail.subject + " " + mail.body
    const isMailRead = mail.isRead
    const shortTxt = (mainTxt.length > 100) ? `${mainTxt.substring(0, 100)}...` : mainTxt
    
    return <article className="mail-preview flex space-between align-center" 
    onClick={() => { window.location.href = `/#/mail/edit/${mail.id}` }}>
        
        <div className = "fa flex space-between">
        <i className="fa-regular fa-square"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-solid fa-tag"></i>
        </div>
        <div className={isMailRead? "mail-subject": "mail-subjec bold" }>{mail.author}</div>
        <div className={isMailRead? "mail-body": "mail-subjec bold" }>{shortTxt}</div>
        <div className={isMailRead? "mail-time": "mail-subjec bold" }>{sentAt}</div>
    </article>
}