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
        isImportant: false,
        isStar: false,
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
                case 'stared':
                    mails = mails.filter(mail => mail.isStar)
                    break;
                case 'drafts':
                    mails = mails.filter(mail => mail.isDraft)
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
            return mails
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
                isImportant: false,
                isStar: false,
                author: "Sason Dayan",
                id: 'e101',
                subject: 'Important update regarding your account!',
                body: 'Hello, We wanted to let you know about an important update regarding your account. We have recently made some changes to our security protocols and are requiring all users to update their login information. Please follow the steps outlined in the attached document to update your account and ensure the security of your personal informationThank you for your cooperation.Best regards, Avihu',
                isRead: true,
                sentAt: 1551133930594,
                from: 'shuki@gmail.com',
                removedAt: null,
                to: 'user@appsus.com'

            },
            {
                isImportant: false,
                isStar: true,
                author: "Charlie Chaplin",
                id: 'e102',
                subject: 'Miss you!',
                body: 'We would like to invite you to join our upcoming webinar on [topic]. This webinar will provide valuable insights and strategies for [specific topic] and will be hosted by one of our industry experts. The webinar will take place on [date] at [time]. Please register using the link below to secure your spot. [Webinar registration link] We hope to see you there! Best regards,Shmulik Pupik"',
                isRead: false,
                sentAt: 15511033930593,
                from: 'raanan@walla.com',
                removedAt: null,
                to: 'user@appsus.com'
            },
            {
                isImportant: false,
                isStar: false,
                author: "Pickle Rick",
                id: 'e103',
                subject: 'New feature release: XYZ',
                body: 'We are excited to announce the release of a new feature for our platform: XYZ. This feature will allow users to [description of feature] and is now available for all users. To access the new feature, simply log in to your account and navigate to the [relevant section of the platform]. We hope you enjoy using this new tool and find it helpful in your work. Best regards, A.B.Yeoshoa"',
                isRead: true,
                sentAt: 1556133930593,
                from: 'user@appsus.com',
                removedAt: null,
                to: 'koko@appsus.com'
            },
            {
                isImportant: false,
                isStar: false,
                author: "Avi Dado",
                id: 'e104',
                subject: 'URGENT: Security breach notification',
                body: 'We have recently discovered a security breach in our system. While we are working diligently to fix the issue, we recommend that all users change their passwords as a precautionary measure. Please be aware that your personal information may have been compromised as a result of this breach. We apologize for any inconvenience this may have caused and assure you that we are taking all necessary steps to prevent similar incidents in the future. Thank you for your cooperation. Best regards, Randy Orton"',
                isRead: false,
                sentAt: 1555133930593,
                from: 'avis-hostel@gmail.com',
                removedAt: null,
                to: 'user@appsus.com'
            },
            {
                isImportant: false,
                isStar: false,
                author: "Shauli Herzog",
                id: 'e105',
                subject: 'Follow-up on our meeting last week',
                body: 'I wanted to follow up on our meeting last week and provide an update on the progress we have made. As discussed, we are currently working on [specific task] and expect to have it completed by [date]. In the meantime, please let me know if you have any questions or concerns. I am happy to provide further information or assistance as needed. Best regards,Donuld Trump"',
                isRead: true,
                sentAt: 15511339398793,
                from: 'user@appsus.com',
                removedAt: null,
                to: 'sharabani@appsus.com'
            },
            {
                isImportant: false,
                isStar: false,
                author: "Avraham Birken",
                id: 'e156',
                subject: 'Follow-up on our meeting last week',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: 155113393093,
                from: 'maccabi@gmail.com',
                removedAt: null,
                to: 'user@appsus.com'
            },
            {
                isImportant: false,
                isStar: true,
                author: "John Smith",
                id: 'e196',
                subject: 'Invitation to company holiday party',
                body: 'Hello colleagues,  I am pleased to announce that this years company holiday party will take place on Friday, December 15th at the Grand Ballroom. Please save the date and come celebrate the end of the year with us. There will be food, drinks, and entertainment for everyone to enjoy. Please RSVP to this email by December 1st so we can get a head count for catering. I hope to see you all there!  Best regards, Avi Nimni',
                isRead: false,
                sentAt: 16076707398793,
                from: 'hr@company.com',
                removedAt: null,
                to: 'employees@company.com'
              },
              {
                isImportant: false,
                isStar: false,
                author: "Maggie Green",
                id: 'e107',
                subject: 'Reminder: Performance review meeting',
                body: 'Hello Pini Balili,  This is just a friendly reminder that your performance review meeting is scheduled for Wednesday, October 2nd at 2pm in the conference room. Please come prepared to discuss your accomplishments and goals for the upcoming year.  If you have any questions or need to reschedule, please let me know.  Best regards, J.K Sardina',
                isRead: false,
                sentAt: 16042967398793,
                from: 'mgreen@company.com',
                removedAt: null,
                to: 'employee@company.com'
              },
              {
                isImportant: false,
                isStar: false,
                author: "Alice Jenkins",
                id: 'e108',
                subject: 'Important update on company policies',
                body: 'Dear Employees,  I wanted to make you aware of some important updates to our company policies that will take effect on Monday, September 3rd. Please take a moment to review the attached document for details on the changes.  If you have any questions or concerns, please do not hesitate to reach out to me or your supervisor.  Thank you for your attention to this matter.  Best regards, Rondal Shmoland',
                isRead: true,
                sentAt: 16030127398793,
                from: 'ajenkins@company.com',
                removedAt: null,
                to: 'employees@company.com'
              }
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}