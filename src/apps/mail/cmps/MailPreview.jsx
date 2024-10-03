
import { useState, useEffect } from "react"
import { emailService } from "../../../apps/mail/services/mail.service.js"
import { LongTxt } from "../../../cmps/LongTxt.jsx"
import { utilService } from "../../../services/util.service.js"
import React from 'react'


export function MailPreview({ mail, onSelect, setMails }) {
    const [starClicked, setStarClicked] = useState(mail.isStared);



    function onStar() {
        emailService.isStared(mail)
            .then((prevMail) => {
                setMails(prevMails => prevMails.map(m => m.id === prevMail.id ? { ...m, isStared: prevMail.isStared } : m))
            })
            .then(() => setStarClicked(prevMail => !prevMail))



    }

    const dateDetails = utilService.getDateDetails(mail.sentAt)
    return <React.Fragment>
        <td className="input-td">
            <input type="checkbox" />

            {starClicked ? <svg onClick={onStar} className="star-clicked-icon" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="20px" viewBox="0 0 24 24" width="20px" fill="#F4B400"><g><path d="M0 0h24v24H0V0z" fill="none" /><path d="M0 0h24v24H0V0z" fill="none" /></g><g><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" /></g></svg> : <svg onClick={onStar} className="star-icon" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill='#D9D9D9'><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" /></svg>}



        </td>
        <td className="text-container" onClick={() => onSelect(mail)}>
            <span className={`span-text sub from ${!mail.isRead && 'subject'}`}>{mail.from}</span>
            <span className={`span-text sub ${!mail.isRead && 'subject'}`}> {mail.subject}</span>
            {/* <span>{mail.body}</span> */}
            <span className="span-text"><LongTxt txt={mail.body} /></span>
            <span className="span-date">{dateDetails.year < 2024 ? dateDetails.year : `${dateDetails.monthName}  ${dateDetails.day}`} </span>
        </td>

    </React.Fragment>

}