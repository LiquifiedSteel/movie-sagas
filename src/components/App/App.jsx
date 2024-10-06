import { Route, HashRouter as Router, Link } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import './App.css';
import MovieDetails from '../MovieList/MovieDetails/MovieDetails';
import AddMovie from '../AddMovie/AddMovie';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
        <Route path="/" exact>
          <div className="link" >
            <Link to="/add">Add Movie</Link>
          </div>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Route path="/details">
          <div className="link pad" >
            <Link to="/add">Add Movie</Link>
          </div>
          <MovieDetails />
        </Route>

        {/* Add Movie page */}
        <Route path="/add">
          <div className="link pad" >
            <Link to="/">Back to Movies</Link>
          </div>
          <AddMovie />
        </Route>
      </Router>
    </div>
  );
}

export default App;
