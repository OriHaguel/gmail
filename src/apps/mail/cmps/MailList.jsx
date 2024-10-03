import { MailPreview } from "./MailPreview.jsx"



export function MailList({ mails, onSelect, setMails }) {


    return <table>
        <tbody className="mail-data-container">

            {
                mails.map(mail => {
                    return !mail.isSent && !mail.isDeleted && <tr className={`mail-data ${mail.isRead ? 'read' : ''}`} key={mail.id}>
                        <MailPreview mail={mail} onSelect={onSelect} setMails={setMails} />
                    </tr>
                }

                )
            }
        </tbody>
    </table>
}
