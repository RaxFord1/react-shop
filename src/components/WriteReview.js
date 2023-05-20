import React, { useContext, useState } from "react";
import styles from "./WriteReview.module.css";
import { CSSTransition } from "react-transition-group";
import ReviewsContext from "../store/ReviewsContext";

const WriteReview = () => {
  const reviewsCtx = useContext(ReviewsContext);
  const [displayReviewForm, setDisplayReviewForm] = useState(false);
  const [value, setValue] = useState("");

  const onLeaveReview = () => {
    setDisplayReviewForm((prev) => !prev);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    reviewsCtx.addReview(value);
    console.log(value);
  };

  return (
    <div className="container">
      <div className="row" css="margin-top:40px;">
        <div className="col-md-6">
          <div className="well well-sm">
            <div className="text-right">
              <button
                className="btn btn-success btn-green"
                onClick={onLeaveReview}
              >
                {displayReviewForm ? "Close a review form" : "Leave a Review"}
              </button>
            </div>
            <CSSTransition
              in={displayReviewForm}
              timeout={300}
              classNames="fade"
              unmountOnExit
            >
              <div className="row" id="post-review-box">
                <div className="col-md-12">
                  <form
                    acceptCharset="UTF-8"
                    action=""
                    method="post"
                    onSubmit={handleSubmit}
                    className={
                      displayReviewForm ? "form-visible" : "form-hidden"
                    }
                  >
                    <input id="ratings-hidden" name="rating" type="hidden" />
                    <textarea
                      className={["form-control", styles.animated]}
                      cols="50"
                      id="new-review"
                      name="comment"
                      placeholder="Enter your review here..."
                      rows="5"
                      onChange={handleChange}
                    ></textarea>

                    <div className="text-right">
                      <div
                        className={[styles.stars, "starrr"]}
                        data-rating="0"
                      ></div>
                      <button className="btn btn-success btn-lg" type="submit">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
