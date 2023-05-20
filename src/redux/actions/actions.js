export const ADD_REVIEW = 'ADD_REVIEW';
export const REMOVE_REVIEW = 'REMOVE_REVIEW';
export const LOAD_REVIEWS = 'LOAD_REVIEWS';

export const loadReviews = reviews => ({
  type: LOAD_REVIEWS,
  payload: reviews,
});

export const addReview = review => ({
  type: ADD_REVIEW,
  payload: review,
});

export const removeReview = reviewId => ({
  type: REMOVE_REVIEW,
  payload: reviewId,
});

export const fetchReviews = item_id => async dispatch => {
  const response = await fetch(`/review/${item_id}`);
  const reviews = await response.json();
  dispatch(loadReviews(reviews.items));
};

export const submitReview = review => async dispatch => {
  const response = await fetch('/review', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  if (response.ok) {
    dispatch(addReview(review));
  }
};