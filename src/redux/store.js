import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

//========  MAIN SAGA ROOT  ========
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FETCH_DETAILS', fetchMovieDetails)
}

//========  COLLECT ALL MOVIES  ========
function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}

//========  COLLECT A SPECIFIC MOVIE'S DETAILS  ========
function* fetchMovieDetails(action) {
  try {
    // Get the details:
    console.log(action.payload);
    const detailsResponse = yield axios.get(`/api/genres/${action.payload}`);
    // Set the value of the detils reducer:
    yield put({
      type: 'RECIEVE_DETAILS',
      payload: detailsResponse.data
    });
  } catch (error) {
    console.log('fetchMovieDetails error:', error);
  }
}

// ========  SETTING UP MIDDLEWARE  ========
const sagaMiddleware = createSagaMiddleware();

// {{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}
//========  REDUCERS FOR CATA AND FAV ======== 
// {{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}

// ======== MOVIES REDUCER ======== 
const movies = (state = [], action) => {
  // Used to store movies returned from the server
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
}

// ======== GENRES REDUCER ======== 
const genres = (state = [], action) => {
  // Used to store the movie genres
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

// ======== MOVIE ID REDUCER ======== 
const toDetailsReducer = (state = 0, action) => {
  switch (action.type) {
    case 'CAPTURE_MOVIE':
      return action.payload;
    default:
      return state;
  }
}

// ======== MOVIE DETAILS REDUCER ======== 
const detailsReducer = (state = {title: '', poster: '', description: '', genreNames: ''}, action) => {
  switch (action.type) {
    case 'RECIEVE_DETAILS':
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    toDetailsReducer,
    detailsReducer,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
