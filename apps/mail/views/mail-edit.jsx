const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { emailService } from "../services/mail.service.js"

export function MailEdit(){

    const navigate = useNavigate()
    const { mailId } = useParams()
    {console.log(mailId)}
    return 's'
}