import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function MovieDetails() {
    const movieId = useSelector(store => store.toDetailsReducer);

    useEffect(() => {
        const something = 0;
    }, [])

    return (
        <>
            <header>
                <h2>Movie Details</h2>
                <Link to="/">Back to Movies List</Link>
            </header>
        </>
    )
}

export default MovieDetails;