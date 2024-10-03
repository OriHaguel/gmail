import { useState, useEffect } from "react"

import { useParams, useNavigate, Link, useSearchParams } from "react-router-dom"
import { MailNavbar } from "../cmps/MailNavbar.jsx"
import { emailService } from "../../../apps/mail/services/mail.service.js"
import { StarList } from "../cmps/StarList.jsx"



export function StarIndex() {
    const [mails, setMails] = useState()
    const [isShowReviewModal, setIsShowReviewModal] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        renderMails()

    }, [])

    function renderMails() {
        emailService.query()
            .then(setMails)
    }

    function onSelect(mail) {
        emailService.isRead(mail)
            .then((prevMail) => {
                setMails(prevMails => prevMails.map(m => m.id === prevMail.id ? { ...m, isRead: prevMail.isRead } : m))

            }).then(() => navigate(`/mail/${mail.id}`))
    }

    if (!mails) return <h1>loading...</h1>
    return <section >
        <MailNavbar setIsShowReviewModal={setIsShowReviewModal} mails={mails} />
        <section className="mail-main">
            <form className="filter">
                <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_rtl_r5.png" alt="" />
            </form>
            <StarList mails={mails} onSelect={onSelect} setMails={setMails} />
        </section>



    </section>
}