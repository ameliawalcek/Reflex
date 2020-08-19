import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import './App.css';
import Landing from './components/Landing';
import Catalog from './components/Catalog';
import MovieDetail from './components/MovieDetail';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [ ],
      users: [
        { id: 0, name: 'Amelia', img: 'https://i.pinimg.com/originals/34/62/d2/3462d27440aa255b1c314ff16f4032b4.png', rentals: [], budget: 10 },
        { id: 1, name: 'Hannah', img: "https://i.pinimg.com/originals/10/12/c0/1012c06c7e1b0f8f5e60611992785e5a.png", rentals: [], budget: 25 },
        { id: 2, name: 'Ellen', img: "https://i.pinimg.com/originals/c0/8e/6c/c08e6c9595e03202a46a95f66578799f.png", rentals: [], budget: 17 },
        { id: 3, name: 'Guyyyy', img: "https://startupcan.ch/wp-content/uploads/2019/04/profile-pictures-avatars-9.png", rentals: [], budget: 1 }
      ],
      currentUserId: 1
    };
  }

  getPopular() {
    return axios.get('https://api.themoviedb.org/3/movie/popular?api_key=3a1b3fdc574beb3254257b752d27a3f7')
  }

  async componentDidMount() {
    let movies = await this.getPopular()
    movies = movies.data.results
    this.setState({ movies })
  }

  updateUser = (id) => this.setState({ currentUserId: id })

  getCurrentUser = (id) => {
    let { currentUserId, users } = this.state
    return users.find(u => u.id === currentUserId)
  }

  isRented = (id) => {
    let user = this.getCurrentUser(id)
    let userRentalId = user.rentals
    return userRentalId.includes(id)
  }

  selectedMovie = (id) => {
    let user = this.getCurrentUser(id)
    let currentBudget = user.budget

    if (this.isRented(id)) {
      this.updateRentals(id, false)
      this.updateBudget(currentBudget + 4, id)

    } else if (!this.isRented(id) && currentBudget - 4 >= 0) {
      this.updateRentals(id, true)
      this.updateBudget(currentBudget - 4, id)

    } else {
      return alert('Insufficient funds')
    }
  }

  updateRentals = (id, bool) => {
    let user = this.getCurrentUser(id)
    let users = [...this.state.users]

    if (bool) {
      user.rentals.push(id)
      this.setState({ users })

    } else {
      let index = user.rentals.indexOf(id)
      user.rentals.splice(index, 1)
      this.setState({ users })
    }
  }

  updateBudget = (updateBudget, id) => {
    let user = this.getCurrentUser(id)
    let users = [...this.state.users]

    user.budget = updateBudget
    this.setState({ users })
  }

  render() {
    let { currentUserId } = this.state
    let img
    let user
    if (currentUserId !== -1) {
      user = this.state.users.find(u => u.id === currentUserId)
      img = user.img
    }
    return (
      <Router>
        <div id='main-container'>
          <div id="link-header">
            <div id="logo">
              <Link to='/'><div id='logo-text'>REFLIX</div></Link>
            </div>
            <div className='nav-bar'><Link to='/'>Home</Link></div>
            <div className='nav-bar'><Link to='/catalog'>Catalog</Link></div>
            {this.state.currentUserId !== -1 ? <div className='nav-img' style={{ backgroundImage: `url(${img})`, backgroundSize: '100% 100%' }}>.</div>
              : null}
          </div>
          <Route exact path='/' render={() => <Landing updateUser={this.updateUser} users={this.state.users} />} />
          <Route exact path='/catalog' render={() => <Catalog movies={this.state.movies} users={this.state.users} currentUserId={this.state.currentUserId} selectedMovie={this.selectedMovie} />} />
          <Route exact path='/movie/:id' render={({ match }) => <MovieDetail match={match} movies={this.state.movies} />} />
          {/* <Redirect push to="/" /> */}
        </div>
      </Router>
    )
  }
}

export default App;