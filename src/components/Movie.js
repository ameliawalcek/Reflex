import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import '../style/JS_FILE'

function Movie(props) {
    let { movie } = props

    const selectedMovie = () => props.selectedMovie(movie.id)

    return (
        <div className="movie-container" style={{ backgroundImage: `url(${movie.img})`, backgroundSize: '100% 100%' }}>
            {props.rented ? <i className="fas fa-minus-circle" onClick={selectedMovie}></i>
                : <i className="fas fa-plus-circle" onClick={selectedMovie}></i>}

            <Link to={`/movie/${movie.id}`}><div className='more-info'>More Info</div></Link>
        </div>
    )
}

export default Movie;