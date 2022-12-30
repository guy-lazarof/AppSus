const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { MailList } from '../cmps/email-list.jsx';
import { MailFilter } from '../cmps/email-filter.jsx';

import { emailService } from '../services/mail.service.js';


export function MailIndex({ mails, onSetFilter, isLoading, loadMails,
    setMails, filterBy, onMarkMail, onImportantMail }) {

    const [markedEmails, setMarkedEmails] = useState([])

    function onImportantMail(mailId) {
        const updatedMails = mails.map(mail => {
            if (mail.id === mailId) {
                return { ...mail, isImportant: !mail.isImportant }
            }
            return mail
        })
        setMails(updatedMails);
    }
    function onRemoveMail(mailId) {
        const isMarked = markedEmails.includes(mailId)
        if (isMarked) {
          const removePromises = markedEmails.map(id => emailService.remove(id));
          Promise.all(removePromises).then(() => {
            const updatedMails = mails.filter(mail => !markedEmails.includes(mail.id))
            setMails(updatedMails)
            setMarkedEmails([])
          }).catch((err) => {
            console.log('Had issues removing emails', err)
          })
        } else {
          emailService.remove(mailId).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)
            setMarkedEmails([])
          }).catch((err) => {
            console.log('Had issues removing email', err);
          })
        }
      }
      



    function onMarkMail(mailId) {
        const updatedMails = mails.map(mail => {
            if (mail.id === mailId) {
                return { ...mail, isRead: !mail.isRead }
            }
            return mail
        })
        setMails(updatedMails);
    }

    function onStarMail(mailId) {
        const updatedMails = mails.map(mail => {
            if (mail.id === mailId) {
                return { ...mail, isStar: !mail.isStar }
            }
            return mail
        })
        setMails(updatedMails);
    }

    function onSaveMail(mailToSave) {
        const newMail = { ...mailToSave }
        emailService.save(newMail)
            .then((mailsFromService) => {
                loadMails()
            })
            .catch((err) => {
                console.log('err:', err);
            })
    }

    return <section className="mail-index full main-layout">
        {!isLoading && <MailFilter mails={mails} onSaveMail={onSaveMail} onSetFilter={onSetFilter} filterBy={filterBy} />}
        {!isLoading && <MailList mails={mails} onRemoveMail={onRemoveMail} onStarMail={onStarMail}
            onMarkMail={onMarkMail} onImportantMail={onImportantMail}
            markedEmails={markedEmails} setMarkedEmails={setMarkedEmails} />}

    </section>
}