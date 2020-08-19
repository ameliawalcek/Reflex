import React from 'react';

function MovieDetail(props) {
    let id = parseInt(props.match.params.id)
    let movie = props.movies.find(m => m.id === id)

    return (
        <div className='movie-info'>
            <div className="movie-container" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`, backgroundSize: '100% 100%' }}></div>
            <div className='title'>{movie.title}</div>
            <div className='year'>{movie.release_date}</div><br></br>
            <div className='year'>{movie.rating}/10</div>
            <div className='description'>{movie.overview}</div>
        </div>
    )
}

export default MovieDetail;