import Review from "../components/Review";
import ReviewStars from "../components/ReviewStars";
import styles from "./Reviews.module.css";

export default function Reviews(props) {
  return (
    <main>
      <hr />

      <ReviewStars />
      <div className={styles.review_list} style={{ paddingTop: "15px" }}>
        <div className="container mt-5 mb-5">
          <div className="row g-2">
            <Review
              message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua."
              author="Tony Clark"
              // position="Software Developer"
            />
            <Review
              message="Не вкрав!"
              author="Barry Allen"
              // position="Data Engineer"
            />
            <Review
              message="Чесне слово!"
              author="Bruce Wayne"
              // position="Batman"
            />
          </div>
        </div>
        <hr />
      </div>
    </main>
  );
}
