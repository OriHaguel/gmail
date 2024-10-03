import { DraftPreview } from "./DraftPreview.jsx"


export function DraftList({ mails, onSelect, setMails }) {
    return <table>
        <tbody className="mail-data-container">

            {
                mails.map(mail => {
                    return mail.isDrafted === true && !mail.isDeleted && <tr className={`mail-data ${mail.isRead ? 'read' : ''}`} key={mail.id}>
                        <DraftPreview mail={mail} onSelect={onSelect} setMails={setMails} />
                    </tr>
                }

                )
            }
        </tbody>
    </table>
}