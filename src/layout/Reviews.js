import Review from "../components/Review";
import ReviewsContext from "../store/ReviewsContext";
import styles from "./Reviews.module.css";
import { useContext, useEffect } from "react";

export default function Reviews() {
  const reviewsCtx = useContext(ReviewsContext);

  return (
    <main>
      <hr />

      <div className={styles.review_list} style={{ paddingTop: "15px" }}>
        <div className="container mt-5 mb-5">
          <div className="row g-2">
            {reviewsCtx.items.map((review, index) => (
              <Review
                key={index}
                message={review.text}
                author={review.user_name}
              />
            ))}
          </div>
        </div>
        <hr />
      </div>
    </main>
  );
}
