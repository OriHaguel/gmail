import { useState, useEffect } from "react"

export function MailFilter({ filterBy, onSetFilter }) {
    const [filter, setFilter] = useState(filterBy)


    useEffect(() => {
        onSetFilter(filter)
    }, [filter])



    function handleOnChange({ target }) {

        let { value, name: field, type } = target
        if (type === 'number') value = +value
        setFilter((prevFilter) => ({ ...prevFilter, [field]: value }))


    }

    return <form className="filter">
        {/* <h1>Gmail</h1>\ */}
        <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_rtl_r5.png" alt="" />
        <div className="input-container">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#444746"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
            <input value={filter.subject} type="text" id="subject" name="subject"
                placeholder={"Search"}
                onChange={handleOnChange} />
        </div>


        {/* <label htmlFor="isRead">price</label>
        <input type="text" id="isRead" name="isRead" placeholder="isRead" onChange={handleOnChange} /> */}
        <select value={filter.isRead} name="isRead" id="isRead" onChange={handleOnChange}>
            <option value={null}>All</option>
            <option value={true}>read</option>
            <option value={false}>unread</option>
        </select>
        <select name="sort" id="sort" onChange={handleOnChange}>
            <option value={null}>All</option>
            <option value={'title'}>title</option>
            <option value={'date'}>date</option>
        </select>



    </form>
}