import { Link } from "react-router-dom"
import { MailCompose } from "./MailCompose.jsx"
const { useState, useEffect } = 'react'


export function MailNavbar({ setIsShowReviewModal, mails }) {

    function starCounter() {
        if (mails.filter(mail => mail.isStared === true).filter(mail => mail.isDeleted === false).length === 0) {
            return
        }
        return mails.filter(mail => mail.isStared === true).filter(mail => mail.isDeleted === false).length
    }
    function readCounter() {
        return mails.filter(mail => mail.isRead === false).filter(mail => mail.isSent === undefined).length
    }
    function sentCounter() {
        if (mails.filter(mail => mail.isSent === true).filter(mail => mail.isRead === false).length === 0) {
            return
        }
        return mails.filter(mail => mail.isSent === true).filter(mail => mail.isRead === false).length
    }

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item" onClick={() => setIsShowReviewModal(true)}>
                    <Link to='' className="nav-link">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="##000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" /></svg>
                        <span className="link-text">Compose</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/' className="nav-link">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#041E49"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.45 2s2.75-.81 3.45-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z" /></svg>
                        <span className="link-text inbox">Inbox</span>
                        <span className="read-count">{readCounter()}</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/mail/stars' className="nav-link">
                        <svg className="star-link" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill='#444746'><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" /></svg>
                        <span className="link-text">Starred</span>
                        <span className="class-count">{starCounter()}</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/mail/sent' className="nav-link">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#444746"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z" /></svg>
                        <span className="link-text">Sent</span>
                        <span className="class-count">{sentCounter()}</span>

                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/mail/draft' className="nav-link">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#444746"><path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" /></svg>
                        <span className="link-text">Draft</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/mail/deleted' className="nav-link">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#444746"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" /></svg>
                        <span className="link-text">Trash</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}


