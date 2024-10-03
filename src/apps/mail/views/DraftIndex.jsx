import { useState, useEffect } from "react"
import { useParams, useNavigate, Link, useSearchParams } from "react-router-dom"
import { MailNavbar } from "../cmps/MailNavbar.jsx"
import { emailService } from "../../../apps/mail/services/mail.service.js"
import { DraftList } from "../cmps/DraftList.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"


export function DraftIndex() {
    const [mails, setMails] = useState()
    const [mail, setMail] = useState()
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
            .then(() => {
                setMail(mail)
                setIsShowReviewModal(prevModal => !prevModal)
            })
    }
    function onSave(mailToAdd) {
        emailService.save(mailToAdd)
            .then((savedMail) => emailService.isNotDrafted(savedMail))
            .then((prevMail) => setMails(prevMails => prevMails.map(m => m.id === prevMail.id ? { ...m, isDrafted: prevMail.isDrafted } : m)))

        setIsShowReviewModal(false)

    }


    // function onAutoSave(mailToAdd) {
    //     return emailService.save(mailToAdd)
    //         .then((savedMail) => emailService.isDrafted(savedMail))


    // }

    function onAutoSave(mailToAdd) {
        return emailService.save(mailToAdd)
            .then((savedMail) => emailService.isDrafted(savedMail))
            .then((prevMail) => {
                setMails(prevMails => prevMails.map(m => m.id === prevMail.id ? { ...m, isDrafted: true } : m))
                return Promise.resolve(prevMail)
            })


    }

    if (!mails) return <h1>loading...</h1>
    return <section >
        <MailNavbar setIsShowReviewModal={setIsShowReviewModal} mails={mails} />
        <section className="mail-main">
            <form className="filter">
                <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_rtl_r5.png" alt="" />
            </form>
            <DraftList mails={mails} onSelect={onSelect} setMails={setMails} />
            {isShowReviewModal && <MailCompose onSave={onSave} setIsShowReviewModal={setIsShowReviewModal} onAutoSave={onAutoSave} mail={mail} />}

        </section>



    </section>
}