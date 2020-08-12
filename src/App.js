import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import './App.css';
import Landing from './components/Landing';
import Catalog from './components/Catalog';
import MovieDetail from './components/MovieDetail';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [
        { id: 0, title: "Tarzan", year: 1999, img: "https://vignette.wikia.nocookie.net/disney-fan-fiction/images/4/42/Tarzan_2004_cover.jpg/revision/latest?cb=20140331030811", descrShort: "Tarzan was born into wealth but raised into incredible misfortune. Shiprweck, parents mauled by a jaguar. Luckily, a troop of gorillas took him in, but the Big Daddy gorilla never took a liking to him. That is, until the end when it's too late. Why is it too late? Watch and find out." },
        { id: 1, title: "The Lion King", img: "https://img00.deviantart.net/b782/i/2006/207/e/7/the_lion_king_front_cd_cover_by_peachpocket285.jpg", year: 1994, descrShort: "A young lion prince named Simba is born into wealth but raised into incredible misfortune. Trickster uncle, dying father, usurpation. Luckily, an unlikely meerkat-warthog pair take him in and teach him The Ways of the Bum Life. Be prepared for ghostly hallucinations, wild baboons, creepy crawlies." },
        { id: 2, title: "Beauty and the Beast", year: 1991, img: "https://images-na.ssl-images-amazon.com/images/I/81etFyb9N-L._SL1500_.jpg", descrShort: "A kickass woman named Belle who does not succumb to social norms gets crap from a bunch of village idiots, chief amongst them a total tool named Gaston. Belle shows everyone how great she is when she turns a beast (not Gaston) into a man. Love ensues, but then the villagers fall trap to severe group-think mentality led by the main tool himself." },
        { id: 3, title: "The Sword in the Stone", year: 1963, img: "https://scdn.nflximg.net/images/0230/3330230.jpg", descrShort: "Arthur is a young boy who just wants to be a knight's squire. Alas, he is dubbed 'Wart' early on, and it was all downhill from there for a while. On a hunting trip he falls in on Merlin, literally. Merlin is a possibly-mentally-unstable-and-ethically-dubious Wizard that turns Arthur into a literate, at-one-point harassed squirrel. Watch to find out what the heck that means." },
        { id: 4, title: "Beauty and the Beast", year: 2016, img: "https://images-na.ssl-images-amazon.com/images/I/51ArFYSFGJL.jpg", descrShort: "Basically the same as the original, except now Hermi-- Emma Wattson plays Belle, fittingly so some would say, given how actively progressive she is regarding women's rights. Rumor has it that in the bonus scenes she whips out a wand and turns Gaston into a toad, but in order to watch those scenes you need to recite a certain incantation." }
      ],
      users: [
        { id: 0, name: 'Amelia', img: 'https://i.pinimg.com/originals/34/62/d2/3462d27440aa255b1c314ff16f4032b4.png', rentals: [0, 1], budget: 10 },
        { id: 1, name: 'Hannah', img: "https://i.pinimg.com/originals/10/12/c0/1012c06c7e1b0f8f5e60611992785e5a.png", rentals: [], budget: 25 },
        { id: 2, name: 'Ellen', img: "https://i.pinimg.com/originals/c0/8e/6c/c08e6c9595e03202a46a95f66578799f.png", rentals: [], budget: 17 },
        { id: 3, name: 'Guyyyy', img: "https://startupcan.ch/wp-content/uploads/2019/04/profile-pictures-avatars-9.png", rentals: [], budget: 1 }
      ],
      currentUserId: -1
    };
  }

  updateUser = (id) => {
    this.setState({ currentUserId: id })
  }

  isRented = (id) => {
    let userId = this.state.currentUserId
    let user = this.state.users.find(u => u.id === userId)
    let userRentalId = user.rentals
    return userRentalId.includes(id)
  }

  selectedMovie = (id) => {
    let userId = this.state.currentUserId
    let user = this.state.users.find(u => u.id === userId)
    let currentBudget = user.budget

    if (this.isRented(id)) {
      this.updateRentals(id, false)
      this.updateBudget(currentBudget + 4)

    } else if (!this.isRented(id) && currentBudget - 4 >= 0) {
      this.updateRentals(id, true)
      this.updateBudget(currentBudget - 4)

    } else {
      return alert('Insufficient funds')
    }
  }

  updateRentals = (id, bool) => {
    let userId = this.state.currentUserId
    let users = [...this.state.users]
    let user = users.find(u => u.id === userId)

    if (bool) {
      user.rentals.push(id)
      this.setState({ users })

    } else {
      let index = user.rentals.indexOf(id)
      user.rentals.splice(index, 1)
      this.setState({ users })
    }
  }

  updateBudget = (updateBudget) => {
    let userId = this.state.currentUserId
    let users = [...this.state.users]
    let user = users.find(u => u.id === userId)

    user.budget = updateBudget
    this.setState({ users })
  }

  render() {
    let userId = this.state.currentUserId
    let img 
    let user
    if (userId !== -1){
    user = this.state.users.find(u => u.id === userId)
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
            : null }
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