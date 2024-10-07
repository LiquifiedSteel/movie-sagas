import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function AddMovie() {
    const newMovie = useSelector(store => store.newMovieReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleSubmit() {
        dispatch({type: 'ADD_MOVIE', payload: newMovie});
        history.push('/');
    }

    function handleClick() {
        dispatch({type: 'RESET_ADD'});
        history.push('/');
    }

    return (
        <div>
            <form onSubmit={() => handleSubmit()}>
            <input placeholder="Movie Title" type="text" value={newMovie.title} onChange={() => dispatch({type: 'ADDING_TITLE', payload: event.target.value})} />
            <input placeholder="Movie Poster Url" type="text" value={newMovie.poster} onChange={() => dispatch({type: 'ADDING_POSTER', payload: event.target.value})} />
            <textarea placeholder="Movie Description" type="text" value={newMovie.description} onChange={() => dispatch({type: 'ADDING_DESCRIPTION', payload: event.target.value})} />
            <select onChange={()=> dispatch({type: 'ADDING_GENRE', payload: event.target.value})}>
                <option value={0}></option>
                <option value={1} >Adventure</option>
                <option value={2} >Animated</option>
                <option value={3} >Biographical</option>
                <option value={4} >Comedy</option>
                <option value={5} >Disaster</option>
                <option value={6} >Drama</option>
                <option value={7} >Epic</option>
                <option value={8} >Fantasy</option>
                <option value={9} >Musical</option>
                <option value={10} >Romantic</option>
                <option value={11} >Science-Fiction</option>
                <option value={12} >Space-Opera</option>
                <option value={13} >Superhero</option>
            </select>
            <button type="submit" >Submit Movie</button>
            </form>
            <button onClick={() => handleClick()}>Cancel</button>
        </div>
    )
}

export default AddMovie;