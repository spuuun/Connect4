import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <header>
                <h1>
                    Connect 4! <small>a fun strategy game for all ages</small>
                </h1>
                <nav>
                    <ul>
                        {/* TODO: create <Games/> component that renders CreateNew  & OpenGameList
                        something like:
                            <li><Link to='/games'>Play!</Link></li> */}
                            <li><Link to='/account-details'>Your Profile</Link></li>
                        <li><Link to='/board'>game board</Link></li>
                        <li><Link to='/register'>Register New Account</Link></li>
                    </ul>
                </nav>
            </header>
                

        )
    }
}

export default Navbar


// simple nav --- however we decide to do it
// links to "past games", "stats", "current games", and w/e...