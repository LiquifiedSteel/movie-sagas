import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./MovieDetails.css";

function MovieDetails() {
    const movieId = useSelector(store => store.toDetailsReducer); // movieId is used to tell the database which movie we want details for
    const details = useSelector(store => store.detailsReducer[0]); // details is an object of all the details for the desired movie
    const history = useHistory(); // history is used for switching pages via routing
    const dispatch = useDispatch();

    // this useEffect sends a request to the redux store asking for the details on the desired movie
    // to be sent to the detailsReducer so the details can be grabbed by the details variable
    useEffect(() => {
        dispatch({type: "FETCH_DETAILS", payload: movieId});
    }, [])

    return !details ? null : (
        <div data-testid="movieDetails">
            <header>
                <h2>Movie Details</h2>
                <button data-testid="toList" onClick={() => history.push("/")}>Back to Movies List</button>
            </header>
            <div>
                <div className="posterCard">
                    <h3 id="detailsTitle">{details.title}</h3>
                    <img className="detailsPoster" src={details.poster} />
                </div>
                <p>{details.description}</p>
                <ul className="genres">
                    {details.genreNames.map(genre => (<li>{genre}</li>))}
                </ul>
            </div>
        </div>
    )
}

export default MovieDetails;