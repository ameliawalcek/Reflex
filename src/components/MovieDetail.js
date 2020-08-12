import React, { Component } from 'react';
// import '../'

class MovieDetail extends Component {

    render() {
        let id = parseInt(this.props.match.params.id)
        let movie = this.props.movies.find(m => m.id === id)

        return (
            <div className='movie-info'>
                <div className="movie-container" style={{ backgroundImage: `url(${movie.img})`, backgroundSize: '100% 100%' }}></div>
                <div className='title'>{movie.title}</div>
                <div className='year'>{movie.year}</div>
                <div className='description'>{movie.descrShort}</div>
            </div>
        )
    }
}

export default MovieDetail;