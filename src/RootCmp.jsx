
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { MailDetails } from "./apps/mail/views/MailDetails.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { SentIndex } from "./apps/mail/views/SentIndex.jsx"
import { StarIndex } from "./apps/mail/views/StarIndex.jsx"
import { DeleteIndex } from "./apps/mail/views/DeleteIndex.jsx"
import { DraftIndex } from "./apps/mail/views/DraftIndex.jsx"
import { Route, Routes } from "react-router-dom"


export function RootCmp() {
    return (
        <section className="app container">
            <Routes>
                <Route path="/" element={<MailIndex />} />
                <Route path="/mail/:mailId" element={<MailDetails />} />
                <Route path="/mail/sent" element={<SentIndex />} />
                <Route path="/mail/stars" element={<StarIndex />} />
                <Route path="/mail/deleted" element={<DeleteIndex />} />
                <Route path="/mail/draft" element={<DraftIndex />} />
            </Routes>
            <UserMsg />
        </section>
    )
}


