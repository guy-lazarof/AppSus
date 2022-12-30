const { useState, useEffect } = React

import { MailSearch } from '../views/mail-search.jsx';
import { MailIndex } from '../views/mail-index.jsx';

import { emailService } from '../services/mail.service.js';

export function MailApp() {

    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState('inbox')
    const [mails, setMails] = useState([])

    useEffect(() => {
        setIsLoading(true)
        loadMails()
    }, [filterBy])

    function loadMails() {
        emailService.query(filterBy).then(mailsToUpdate => {
            setMails(mailsToUpdate)
            setIsLoading(false)
        })
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    return <section className="main-layout"><MailSearch mails={mails} onSetFilter={onSetFilter}
     isLoading={isLoading} />
        <MailIndex mails={mails} onSetFilter={onSetFilter} isLoading={isLoading} loadMails={loadMails} setMails={setMails} filterBy={filterBy} />
    </section>
}