import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

//========  MAIN SAGA ROOT  ========
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FETCH_DETAILS', fetchMovieDetails);
  yield takeEvery('ADD_MOVIE', addMovie);
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
    const detailsResponse = yield axios.get(`/api/genres/${action.payload}`);
    // Set the value of the details reducer:
    yield put({
      type: 'RECIEVE_DETAILS',
      payload: detailsResponse.data
    });
  } catch (error) {
    console.log('fetchMovieDetails error:', error);
  }
}

function* addMovie(action) {
  try {
    // Add the movie:
    yield axios.post(`/api/movies`, action.payload);
    // Reset the value of the addMovie reducer:
    yield put({type: 'RESET_ADD'});
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
      return action.payload;
    default:
      return state;
  }
}

// ======== ADD MOVIE REDUCER ======== 
const newMovieReducer = (state = {title: '', poster: '', description: '', genre_id: ''}, action) => {
  let NewState;
  switch (action.type) {
    case 'ADDING_TITLE':
      NewState = {...state, title: action.payload};
      return NewState;
    case 'ADDING_POSTER':
      NewState = {...state, poster: action.payload};
      return NewState;
    case 'ADDING_DESCRIPTION':
      NewState = {...state, description: action.payload};
      return NewState;
    case 'ADDING_GENRE':
      NewState = {...state, genre_id: action.payload};
      return NewState;
    case 'RESET_ADD':
      NewState = {title: '', poster: '', description: '', genre_id: ''};
      return NewState;
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
    newMovieReducer,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
