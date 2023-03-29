import styles from "./ReviewStars.module.css";

function ReviewStars() {
  return (
    <div className="d-flex justify-content-center">
      <div className={[styles.content, "text-center"]}>
        <div className={styles.ratings}>
          <span className={styles.product_rating}>4.6</span>
          <span>/5</span>
          <div className={styles.stars}>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </div>

          <div className={styles.rating_text}>
            <span>46 ratings & 15 reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewStars;
