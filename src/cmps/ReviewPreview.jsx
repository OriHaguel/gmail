import { StarRating } from "./star-rating.jsx"


export function ReviewPreview({ review, onRemoveReview }) {
    return <div className="book-review-details">
        <h4>{review.fullname}</h4>
        <h5><StarRating rating={review.rating} /></h5>
        <h5 className="gray">{review.date}</h5>
        <button className="btn-remove-review" onClick={() => onRemoveReview(review.id)}>×</button>
    </div>
}