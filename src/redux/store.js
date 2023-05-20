// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reviewsReducer } from './reducers';

const store = createStore(reviewsReducer, applyMiddleware(thunk));

export default store;