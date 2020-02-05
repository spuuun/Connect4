import React, { Component } from 'react'
import { Route, Redirect, Link } from 'react-router-dom'
import Register from './src/components/auth/RegistrationForm';
// import LandingAndLoginForm from './components/auth/LandingAndLoginForm';
import Board from './game/Board';
// {CreateNew, History, OpenGames} from './home'
// {ActiveGame, PendingGame} from './game'
// api from './data/dataManager'


export default class ApplicationViews extends Component {
    render() {
        return (
            <>
            <div>hi</div>
                {/* <Route path='' render={} />
                <Route path='' render={} />
                <Route path='' render={} />
                <Route path='' render={} /> */}

                {/* <LandingAndLoginForm /> */}
                <Register />
                <Board />
            </>
        )
    }
}



// sort of the parent component of the whole application
// contains routes to all other components except for those pertaining to auth 
    // --- i.e. besides auth, all components are children of this one 

// in practice, Connect4.js will render the Navbar, ApplicationViews