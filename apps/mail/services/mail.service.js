import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';

const MAIL_KEY = 'mailsDB'
_createMails()

export const emailService = {
    query,
    get,
    remove,
    getEmptyMail,
    save,
    getDefaultFilter
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}


function getEmptyMail() {
    return {
        author: '',
        id: '',
        subject: '',
        body: '',
        isRead: true,
        sentAt: '',
        from: '',
        removedAt: null,
        to: ''
    }
}
function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function query(criteria) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            switch (criteria) {
                case 'inbox':
                    mails = mails.filter(mail => mail.from !== loggedinUser.email)
                    break;
                case 'sent':
                    mails = mails.filter(mail => mail.from === loggedinUser.email)
                    break;
                default:
                    break;
            }
            if (criteria.subject) {
                const regex = new RegExp(criteria.subject, 'i')
                mails = mails.filter(mail => regex.test(mail.subject))
              }
              if (criteria.author) {
                const regex = new RegExp(criteria.author, 'i')
                mails = mails.filter(mail => regex.test(mail.author))
              }
            return mails;
        });
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function getDefaultFilter() {
    return {
        subject: '', author: '',
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                author: "Sason Dayan",
                id: 'e101',
                subject: 'Important update regarding your account!',
                body: 'Hello, We wanted to let you know about an important update regarding your account. We have recently made some changes to our security protocols and are requiring all users to update their login information. Please follow the steps outlined in the attached document to update your account and ensure the security of your personal informationThank you for your cooperation.Best regards,[Your Name]',
                isRead: true,
                sentAt: 1551133930594,
                from: 'shuki@gmail.com',
                removedAt: null,
                to: 'user@appsus.com'

            },
            {
                author: "Charlie Chaplin",
                id: 'e102',
                subject: 'Miss you!',
                body: 'We would like to invite you to join our upcoming webinar on [topic]. This webinar will provide valuable insights and strategies for [specific topic] and will be hosted by one of our industry experts. The webinar will take place on [date] at [time]. Please register using the link below to secure your spot. [Webinar registration link] We hope to see you there! Best regards,[Your Name]"',
                isRead: false,
                sentAt: 15511033930593,
                from: 'raanan@walla.com',
                removedAt: null,
                to: 'user@appsus.com'
            },
            {
                author: "Pickle Rick",
                id: 'e103',
                subject: 'New feature release: XYZ',
                body: 'We are excited to announce the release of a new feature for our platform: XYZ. This feature will allow users to [description of feature] and is now available for all users. To access the new feature, simply log in to your account and navigate to the [relevant section of the platform]. We hope you enjoy using this new tool and find it helpful in your work. Best regards, [Your Name]"',
                isRead: true,
                sentAt: 1556133930593,
                from: 'koko@gamil.com',
                removedAt: null,
                to: 'user@appsus.com'
            },
            {
                author: "Avi Dado",
                id: 'e104',
                subject: 'URGENT: Security breach notification',
                body: 'We have recently discovered a security breach in our system. While we are working diligently to fix the issue, we recommend that all users change their passwords as a precautionary measure. Please be aware that your personal information may have been compromised as a result of this breach. We apologize for any inconvenience this may have caused and assure you that we are taking all necessary steps to prevent similar incidents in the future. Thank you for your cooperation. Best regards, [Your Name]"',
                isRead: true,
                sentAt: 1555133930593,
                from: 'avis-hostel@gmail.com',
                removedAt: null,
                to: 'user@appsus.com'
            },
            {
                author: "Shauli Herzog",
                id: 'e105',
                subject: 'Follow-up on our meeting last week',
                body: 'I wanted to follow up on our meeting last week and provide an update on the progress we have made. As discussed, we are currently working on [specific task] and expect to have it completed by [date]. In the meantime, please let me know if you have any questions or concerns. I am happy to provide further information or assistance as needed. Best regards,[Your Name]"',
                isRead: true,
                sentAt: 15511339398793,
                from: 'likus@israel.com',
                removedAt: null,
                to: 'user@appsus.com'
            },
            {
                author: "Avraham Birken",
                id: 'e106',
                subject: 'Follow-up on our meeting last week',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: 155113393093,
                from: 'maccabi@gmail.com',
                removedAt: null,
                to: 'user@appsus.com'
            },
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}