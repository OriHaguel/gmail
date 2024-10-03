import { MailPreview } from "./MailPreview.jsx"

export function StarList({ mails, onSelect, setMails }) {
    return <table>
        <tbody className="mail-data-container">

            {
                mails.map(mail => {
                    return mail.isStared && !mail.isDeleted && <tr className={`mail-data ${mail.isRead ? 'read' : ''}`} key={mail.id}>
                        <MailPreview mail={mail} onSelect={onSelect} setMails={setMails} />
                    </tr>
                }

                )
            }
        </tbody>
    </table>
}