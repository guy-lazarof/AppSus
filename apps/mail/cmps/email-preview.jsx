const { Link } = ReactRouterDOM

const { useState, useEffect } = React

import { utilService } from '../../../services/util.service.js';

export function EmailPreview({ mail, onRemoveMail }) {

    const [isHovered, setIsHovered] = useState(false);
    const sentAt = utilService.convertTimestampToHour(mail.sentAt)
    const mainTxt = mail.subject + " " + mail.body
    const isMailRead = mail.isRead
    const shortTxt = (mainTxt.length > 100) ? `${mainTxt.substring(0, 100)}...` : mainTxt

    return <tbody><tr className="mail-preview flex space-between align-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => { window.location.href = `/#/mail/${mail.id}` }}>
        
        <td> <i className="fa-regular fa-square"></i></td>
        <td> <i className="fa-regular fa-star"></i></td>
        <td> <i className="fa-solid fa-tag"></i></td>

        <td className={isMailRead ? "mail-subject" : "mail-subject bold"}>{mail.author}</td>
        <td className={isMailRead ? "mail-body" : "mail-subject bold"}>{shortTxt}</td>
        <td className={isMailRead ? "mail-time" : "mail-subject bold"}>{sentAt}</td>
        <td>{isHovered && <i className="fa-solid fa-trash-can" onClick={(event) => {
            onRemoveMail(mail.id)
            event.stopPropagation()
        }}></i>}</td>
        <td>{isHovered && <i className="fa-regular fa-envelope"></i>}</td>
    </tr></tbody>

}