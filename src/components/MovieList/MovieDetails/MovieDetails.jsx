import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function MovieDetails() {
    const movieId = useSelector(store => store.toDetailsReducer);
    const details = useSelector(store => store.detailsReducer)
    const history = useHistory();
    console.log(details);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: "FETCH_DETAILS", payload: movieId});
    }, [])

    return (
        <div data-testid="movieDetails">
            <header>
                <h2>Movie Details</h2>
                <button data-testid="toList" onClick={() => history.push("/")}>Back to Movies List</button>
            </header>
            <div>
                <h3>{details[0].title}</h3>
                <img src={details[0].poster} />
                <p>{details[0].description}</p>
                <ul>
                    {details[0].genreNames.map(genre => (<li>{genre}</li>))}
                </ul>
            </div>
        </div>
    )
}

export default MovieDetails;