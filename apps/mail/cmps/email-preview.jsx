const { Link } = ReactRouterDOM

const { useState, useEffect } = React

import { utilService } from '../../../services/util.service.js';

export function EmailPreview({ mail, onRemoveMail }) {

    const [isHovered, setIsHovered] = useState(false);
    const sentAt = utilService.convertTimestampToHour(mail.sentAt)
    const mainTxt = mail.subject + " " + mail.body
    const isMailRead = mail.isRead
    const shortTxt = (mainTxt.length > 100) ? `${mainTxt.substring(0, 100)}...` : mainTxt

    return <article className="mail-preview flex space-between align-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => { window.location.href = `/#/mail/${mail.id}` }}>

        <div className="fa flex space-between">
            <i className="fa-regular fa-square"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-solid fa-tag"></i>
        </div>
        <div className={isMailRead ? "mail-subject" : "mail-subject bold"}>{mail.author}</div>
        <div className={isMailRead ? "mail-body" : "mail-subject bold"}>{shortTxt}</div>
        <div className={isMailRead ? "mail-time" : "mail-subject bold"}>{sentAt}</div>
        {isHovered && <i className="fa-solid fa-trash-can" onClick={(event) => {
            onRemoveMail(mail.id)
            event.stopPropagation()
        }}></i>}
        {isHovered && <i className="fa-regular fa-envelope"></i>}
    </article>

}