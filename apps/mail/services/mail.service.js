import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';

const MAIL_KEY = 'mailsDB'
_createMails()

export const emailService = {
    query,
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function query(criteria) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            return mails
        })
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'e101',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1551133930594,
                to: 'momo@momo.com'
            },
            {
                id: 'e102',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 15511033930593,
                to: 'koko@momo.com'
            },
            {
                id: 'e103',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1556133930593,
                to: 'koko@momo.com'
            },
            {
                id: 'e104',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1555133930593,
                to: 'koko@momo.com'
            },
            {
                id: 'e105',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 15511339398793,
                to: 'koko@momo.com'
            },
            {
                id: 'e106',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 155113393093,
                to: 'koko@momo.com'
            },
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}