import { emailService } from "../../../apps/mail/services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { MailNavbar } from "../cmps/MailNavbar.jsx"

import { useParams, useNavigate, Link, useSearchParams } from "react-router-dom"
import { useState, useEffect } from 'react'


export function MailDetails() {
    // const [searchParams, setSearchParams] = useSearchParams()
    const params = useParams()
    const navigate = useNavigate()
    const [mail, setMail] = useState();

    const [mails, setMails] = useState()
    const [isShowReviewModal, setIsShowReviewModal] = useState(false)
    useEffect(() => {
        emailService.get(params.mailId)
            .then(setMail)
    }, [params.mailId])


    useEffect(() => {
        renderMails()

    }, [])

    function renderMails() {
        emailService.query()
            .then(setMails)
    }


    function onRemoveMail(mail) {
        if (mail.isDeleted) {
            emailService.remove(mail.id)
                .then(() => navigate('/mail/deleted'))
                .then(() => showSuccessMsg('The mail is deleted!'))
        } else if (!mail.isDeleted) {
            emailService.isDeleted(mail)
                .then(() => onGoBack())
                .then(() => showSuccessMsg('The mail is removed to the trash!'))

        }
    }


    function onGoBack() {
        navigate('/')
    }


    function isUnRead() {
        emailService.isUnRead(mail)
            .then(onGoBack)
    }
    console.log("🚀 ~ MailDetails ~ mail:", mail)
    if (!mail) return <h1>loading...</h1>
    const { subject, body, isRead, sentAt, removedAt, from, to } = mail
    // utilService.getDateDetails(sentAt).monthName
    const dateDetails = utilService.getDateDetails(sentAt)


    return (
        <div>
            <MailNavbar setIsShowReviewModal={setIsShowReviewModal} mails={mails} />
            <form className="filter">
                <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_rtl_r5.png" alt="" />
            </form>
            <div className="mail-details-container">
                <div className="mail-details-icons">
                    <div className="mail-go-back " onClick={onGoBack}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#444746"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg></div>
                    <div onClick={() => onRemoveMail(mail)}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#444746"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" /></svg> </div>
                    <div onClick={isUnRead}><svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="20px" viewBox="0 0 24 24" width="20px" fill="#444746"><g><rect fill="none" height="24" width="24" x="0" /><path d="M22,8.98V18c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2L2.01,6C2.01,4.9,2.9,4,4,4h10.1C14.04,4.32,14,4.66,14,5s0.04,0.68,0.1,1 H4l8,5l3.67-2.29c0.47,0.43,1.02,0.76,1.63,0.98L12,13L4,8v10h16V9.9C20.74,9.75,21.42,9.42,22,8.98z M16,5c0,1.66,1.34,3,3,3 s3-1.34,3-3s-1.34-3-3-3S16,3.34,16,5z" /></g></svg></div>

                </div>
                <span className="mail-detail-span-sub">subject: {subject}</span>
                <div className="mail-date-from-container">

                    <span>{from}</span>
                    <span> sent at:{dateDetails.year < 2024 ? dateDetails.year : `${dateDetails.monthName}  ${dateDetails.day}`} </span>
                </div>
                <p>{body}</p>
                {/* <h3>{isRead ? 'you read this mail' : 'you have not raed this mail'}</h3>
        {removedAt && <h3>removedAt: {removedAt}</h3>} */}
            </div>
        </div>
    )
}

