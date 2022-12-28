const { useState, useEffect } = React

import { EmailApp } from '../cmps/email-app.jsx';

import { emailService } from '../services/mail.service.js';

export function MailIndex() {
    return <section className="mail-index full main-layout">
        <div className="full main-layout">
            <EmailApp />
        </div>
    </section>
}
