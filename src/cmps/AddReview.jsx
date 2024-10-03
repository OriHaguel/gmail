const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
import { bookService } from "../services/book-service.js"
import { StarRating } from "./star-rating.jsx"


export function AddReview({ saveReview, onToggleModal }) {

    const [review, setReview] = useState(bookService.getEmptyReview())


    function onSave(ev) {
        ev.preventDefault()
        saveReview(review)
        onToggleModal()
    }

    function handleChange({ target }) {
        const { type, name: prop } = target

        let { value } = target
        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }
        setReview(prevReview => ({ ...prevReview, [prop]: value }))
    }
    // if (!review) return 'loading...'
    return (
        <section className='book-review-add'>
            <div className='review-modal'>

                <h1>Add review</h1>
                <button className="close-button" onClick={onToggleModal}>x</button>


                <form className='book-review-form' onSubmit={onSave}>

                    <label htmlFor="fullname">Enter full name</label>
                    <input onChange={handleChange} type="text" id="fullname" name="fullname" placeholder="fullname" />

                    <StarRating handleChange={handleChange} rating={review.rating} />

                    <label htmlFor="date">Enter rating</label>
                    <input onChange={handleChange} type="date" id="date" name="date" placeholder="date" />

                    <button>save</button>
                </form>
            </div>
        </section>

    )

}