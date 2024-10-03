import { useEffect, useState } from "react"
import { emailService } from "../../../apps/mail/services/mail.service.js"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailNavbar } from "../cmps/MailNavbar.jsx"




import { useParams, useNavigate, Link, useSearchParams } from "react-router-dom"




export function MailIndex() {
    const [mails, setMails] = useState()

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromSearchParams(searchParams))
    const [isShowReviewModal, setIsShowReviewModal] = useState(false)


    useEffect(() => {
        setSearchParams(filterBy)
        renderMails()

    }, [filterBy])

    function renderMails() {
        emailService.query(filterBy)
            .then(setMails)
    }
    function onSetFilter(filter) {

        setFilterBy(prevFilter => ({ ...prevFilter, ...filter }))

    }


    function onSelect(mail) {
        emailService.isRead(mail)
            .then((prevMail) => {
                setMails(prevMails => prevMails.map(m => m.id === prevMail.id ? { ...m, isRead: prevMail.isRead } : m))

            }).then(() => navigate(`/mail/${mail.id}`))
    }

    function onSave(mailToAdd) {
        emailService.save(mailToAdd)
            .then((mail) => setMails((prevMails) => ([...prevMails, mail])))
        setIsShowReviewModal(false)
    }


    function onAutoSave(mailToAdd) {
        return emailService.save(mailToAdd)
            .then((savedMail) => emailService.isDrafted(savedMail))


    }





    function onStar(mail) {
        emailService.isStared(mail)
        setStarClicked(prevMail => !prevMail)
    }




    if (!mails) return <h1>loading...</h1>
    return <section >
        <MailNavbar setIsShowReviewModal={setIsShowReviewModal} mails={mails} />
        <section className="mail-main">
            <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <MailList mails={mails} onSelect={onSelect} setMails={setMails} />
            {isShowReviewModal && <MailCompose onSave={onSave} setIsShowReviewModal={setIsShowReviewModal} onAutoSave={onAutoSave} />}
        </section>



    </section>
}

