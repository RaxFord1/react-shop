import React from "react";
import styles from "./WriteReview.module.css";

class WriteReview extends React.Component {
  constructor(prompt) {
    super(prompt);
    this.state = {
      displayReviewForm: false,
      value: ""
    };
  }

  onLeaveReview = () => {
    if (this.state.displayReviewForm) {
      this.setState((prevState) => ({
        ...prevState,
        displayReviewForm: false,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        displayReviewForm: true,
      }));
    }
  }

  handleChange = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      value: event.target.value,
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    alert("Ваш відгук: «текст відгуку» додано успішно!");
    console.log(this.state.value);
  }

  render() {
    return (
      <div className="container">
        <div className="row" css="margin-top:40px;">
          <div className="col-md-6">
            <div className="well well-sm">
              <div className="text-right">
                <button
                  className="btn btn-success btn-green"
                  onClick={this.onLeaveReview}
                >
                  {this.state.displayReviewForm
                    ? "Close a review form"
                    : "Leave a Review"}
                </button>
              </div>
              {this.state.displayReviewForm ? (
                <div className="row" id="post-review-box" css="display:none;">
                  <div className="col-md-12">
                    <form
                      acceptCharset="UTF-8"
                      action=""
                      method="post"
                      onSubmit={this.handleSubmit}
                    >
                      <input id="ratings-hidden" name="rating" type="hidden" />
                      <textarea
                        className={["form-control", styles.animated]}
                        cols="50"
                        id="new-review"
                        name="comment"
                        placeholder="Enter your review here..."
                        rows="5"
                        onChange={this.handleChange}
                      ></textarea>

                      <div className="text-right">
                        <div
                          className={[styles.stars, "starrr"]}
                          data-rating="0"
                        ></div>
                        <button
                          className="btn btn-danger btn-sm"
                          id="close-review-box"
                          style={{ display: "none", marginRight: "10px" }}
                        >
                          <span className="glyphicon glyphicon-remove"></span>
                          Cancel
                        </button>
                        <button
                          className="btn btn-success btn-lg"
                          type="submit"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WriteReview;
