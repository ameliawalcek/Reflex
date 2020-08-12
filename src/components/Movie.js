import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import '../style/JS_FILE'

class Movie extends Component {
    selectedMovie = () => {
        this.props.selectedMovie(this.props.movie.id)
    }

    render() {
        let movie = this.props.movie
        return (
            <div className="movie-container" style={{ backgroundImage: `url(${movie.img})`, backgroundSize: '100% 100%' }}>

                {this.props.rented ? <i className="fas fa-minus-circle" onClick={this.selectedMovie}></i>
                    : <i className="fas fa-plus-circle" onClick={this.selectedMovie}></i>}

                <Link to={`/movie/${movie.id}`}><div className='more-info'>More Info</div></Link>
            </div>
        )
    }
}

export default Movie;