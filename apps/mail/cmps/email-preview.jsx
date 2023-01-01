const { Link } = ReactRouterDOM

const { useState, useEffect } = React

import { utilService } from '../../../services/util.service.js';

export function EmailPreview({ mail, onRemoveMail, onStarMail
    ,markedEmails, setMarkedEmails }) {

    const [isRowClicked, setIsRowClicked] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const sentAt = utilService.convertTimestampToHour(mail.sentAt)
    const mainTxt = mail.subject + " " + mail.body
    const isMailRead = mail.isRead
    const isMailStar = mail.isStar
    const isMailImportant = mail.isImportant
    const shortTxt = (mainTxt.length > 85) ? `${mainTxt.substring(0, 85)}...` : mainTxt


    function onMarkRow(mailId) {
        setIsRowClicked(!isRowClicked)
        const isMarked = markedEmails.includes(mailId)
        if (isMarked) {
            setMarkedEmails(markedEmails.filter(id => id !== mailId))
        } else {
            setMarkedEmails([...markedEmails, mailId])
        }
    }

    return <tbody>
        <tr className={`mail-preview flex space-between align-center ${isRowClicked ? 'clicked' : ''}`} >

            <td className = "squares" onClick={() => { onMarkRow(mail.id) }}>
                {isRowClicked ? <i className="fa-solid fa-square-check"></i> : <i className="fa-regular fa-square"></i>}</td>

            <td className = "squares" onClick={() => { onStarMail(mail.id, 'star') }}>
                <i className={isMailStar ? "fa-regular fa-star gold" : "fa-regular fa-star"}></i></td>

            <td className = "squares" onClick={() => { onStarMail(mail.id, 'important') }}>
                <i className={isMailImportant ? "important label fa-solid fa-tag" : "label fa-solid fa-tag"}></i></td>

            <td className="main-line" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
                <span onClick={() => { window.location.href = `/AppSus/#/mail/${mail.id}` }} className="main-mail-preview ">
                    <span className={isMailRead ? "mail-subject" : "mail-subject bold"}>{mail.author}</span>
                    <span className={isMailRead ? "mail-body" : "mail-body bold"}>{shortTxt}</span>
                    <span className={isMailRead ? "mail-time" : "mail-time bold"}>{sentAt}</span>
                    <span>{isHovered && <i className="fa-solid fa-trash-can" onClick={(event) => {
                        onRemoveMail(mail.id)
                        event.stopPropagation()
                    }}></i>}</span></span>
                <span>{isHovered && <i className="fa-regular fa-envelope" onClick={(event) => {
                    onStarMail(mail.id, 'read')
                    event.stopPropagation()
                }}></i>}</span></td>
        </tr></tbody>

}