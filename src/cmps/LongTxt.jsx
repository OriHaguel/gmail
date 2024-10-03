import { useState } from "react"

export function LongTxt({ txt, length = 175 }) {
    const shortTxt = txt.substring(0, length)
    const [text, setText] = useState(shortTxt)

    function getFullTxt() {
        setText(text.length === txt.length ? shortTxt : txt)
    }

    function getMsg() {
        if (txt <= length) return
        return text.length === txt.length ? '...' : '...'
    }

    return <p>
        <span className='bold-txt'></span>
        {text}
        <span className='read-more'>{getMsg()}</span>
    </p>
}
