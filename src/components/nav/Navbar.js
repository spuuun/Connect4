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
                        {/* for testing */}
                        <li><Link to='/board'>game board</Link></li>


                        {/* if user is 'continuing as guest': */}
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/register'>Register New Account</Link></li>
                        {/* else
                        <li><Link to='profile'>Your Profile</Link></li> */}
                    </ul>
                </nav>
            </header>
                

        )
    }
}

export default Navbar