import { ReviewPreview } from "../cmps/ReviewPreview.jsx"




export function ReviewList({ book, onRemoveReview }) {
    return <div>
        {book.reviews.map(review => (
            <ReviewPreview key={review.id} review={review} onRemoveReview={onRemoveReview} />
        ))}
    </div>
}