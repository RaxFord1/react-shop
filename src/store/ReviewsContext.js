import { createContext, useContext, useEffect, useState } from "react";
import { message } from "antd";
import UserContext from "./UserContext";
import axios from "axios";
import { BACKEND_URL } from "../config/cfg";
import { useParams } from "react-router-dom";

const ReviewsContext = createContext({
  items: [],
  addReview: (review) => {},
  reloadReviews: () => {},
});

export function ReviewsItemsProvider(props) {
  const [reviews, setReviews] = useState([
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      user_name: "Tony Clark",
    },
    {
      text: "Не вкрав!",
      user_name: "Barry Allen",
    },
    {
      text: "Чесне слово!",
      user_name: "Bruce Wayne",
    },
  ]);
  const userCtx = useContext(UserContext);
  const { id } = useParams();
  const [needUpdate, setNeedUpdate] = useState(false);

  useEffect(() => {
    reloadReviewsFromBackend();
  }, [id, needUpdate]);

  function addReview(text) {
    if (userCtx.userId) {
      // TODO: request to server
      axios
        .post(BACKEND_URL + "/review", {
          user_id: userCtx.userId,
          item_id: id,
          message: text,
        })
        .then((response) => {})
        .catch((error) => {
          console.error("Error adding review:", error);
          message.error("Error adding review");
        })
        .finally(() => {
          setNeedUpdate(!needUpdate);
        });
    } else {
      message.error("You need to log in!");
    }
  }

  function reloadReviewsFromBackend() {
    axios
      .get(BACKEND_URL + "/review/" + id)
      .then((response) => {
        if (response.data.message) {
          if (response.data.message === "No reviews found") {
            return;
          }
        }
        setReviews(response.data.items);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
        message.error("Error fetching favorites");
      });
  }

  const context = {
    items: reviews,
    addReview: addReview,
    reloadReviews: reloadReviewsFromBackend,
  };

  return (
    <ReviewsContext.Provider value={context}>
      {props.children}
    </ReviewsContext.Provider>
  );
}

export default ReviewsContext;
