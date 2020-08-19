import React, { Component } from 'react';
import Movie from './Movie';

class Catalog extends Component {
    constructor() {
        super()
        this.state = {
            searchValue: ''
        }
    }

    getUser = () => this.props.users.find(u => u.id === this.props.currentUserId)

    updateSearch = ({ target }) => this.setState({ searchValue: target.value })

    hasRentals = () => {
        let user = this.getUser()
        if (user.rentals.length) {
            return true
        } else {
            return false
        }
    }

    findRentals = () => {
        let user = this.getUser()

        let userRentalId = user.rentals
        let rentalArr = []
        userRentalId.forEach(rentalId => {
            rentalArr.push(this.props.movies.find(movie => movie.id === rentalId))
        })
        return rentalArr
    }

    isRented = (id) => {
        let user = this.getUser()
        let userRentalId = user.rentals
        return userRentalId.includes(id)
    }

    displayMovies = movie => {
        let rented = this.isRented(movie.id)
        let title = movie.title.toLowerCase()

        return (
            title.includes(this.state.searchValue.toLowerCase())
                ? <Movie rented={rented} currentUserId={this.props.currentUserId}
                    selectedMovie={this.props.selectedMovie} movie={movie} key={movie.id} />
                : null
        )
    }

    render() {
        let user = this.getUser()
        let rentals = this.findRentals()

        return (
            <div>{user.name ?
                <div id='user-info'>
                    <p>{user.name}</p>
                    <p>${user.budget}</p>
                </div> : null}

                <div id='search-container'>
                    <input type="text" placeholder="Search a movie" value={this.state.searchValue} onChange={this.updateSearch} />
                    <button>SEARCH</button>
                </div>

                {this.hasRentals() ?
                    <div>
                        <h3>Rentals:</h3>
                        {rentals.map(r => this.displayMovies(r))}
                    </div> :
                    null}
                <div>
                    <h3>Movies:</h3>
                    <div className="catalog-container">
                        {this.props.movies.map(m => this.displayMovies(m))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Catalog;