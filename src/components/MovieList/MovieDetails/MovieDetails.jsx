import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function MovieDetails() {
    const movieId = useSelector(store => store.toDetailsReducer);
    const history = useHistory();

    useEffect(() => {
        const something = 0;
    }, [])

    return (
        <div data-testid="movieDetails">
            <header>
                <h2>Movie Details</h2>
                <button data-testid="toList" onClick={() => history.push("/")}>Back to Movies List</button>
            </header>
        </div>
    )
}

export default MovieDetails;