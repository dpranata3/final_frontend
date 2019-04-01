import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

import { onLogoutUser } from '../actions'


library.add(faShoppingCart)

class Header extends Component {
    
    render() {
        const { username } = this.props.user
        // I need to get rid of this.props.user.userStat
        if (username === '' && this.props.user.userStat === ''){
            return (
                <div>
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <div className="container">
                            <Link className="navbar-brand grow" to="/">MyShopName</Link>
                            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav2">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse row p-2 " id="navbarNav2">
                                <ul className="navbar-nav ml-auto col-12 col-md-5 ">
                                    <li className="nav-item m-1">
                                        <Link className="nav-a  navbar-user" to="/">The Product</Link>
                                    </li>

                                    <li className="nav-item m-1">
                                        <Link className="nav-a navbar-user" to="/register"> Register</Link>
                                    </li>
                                    <li className="nav-item m-1">
                                        <Link className="nav-a navbar-user" to="/login"> Login</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            );
        } else if (this.props.user.userStat === 'administrator') {
            return (
                <div>
                    <nav className="navbar sticky-top navbar-expand-md navbar-light bg-light">
                        <div className="container">
                            <Link className="navbar-brand grow" to="/">MyShopName</Link>
                            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav2">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse row p-2" id="navbarNav2">
                                <ul className="navbar-nav ml-auto col-12 col-md-5">
                                    <li className="nav-item mt-2">
                                        <Link className="nav-link navbar-user" to="/">The Product</Link>
                                    </li>
                                    
                                    <li className="nav-item dropdown mt-2">
                                        <Link to="/" className="nav-link dropdown-toggle navbar-user" data-toggle="dropdown">Hello {username}</Link>
                                        <div className="dropdown-menu">
                                            <Link to="/manageproduct" className="dropdown-item">Manage Product</Link>
                                            {/* <Link to="/productcart" className="dropdown-item">Cart</Link> */}
                                            <Link to="/" className="dropdown-item">Reporting</Link>
                                            <Link to="/" className="dropdown-item">Profile</Link>
                                            <button onClick={this.props.onLogoutUser} className="dropdown-item">Logout</button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            );
        }
        else {
            return (
                <div>
                    <nav className="navbar sticky-top navbar-expand-md navbar-light bg-light">
                        <div className="container">
                            <Link className="navbar-brand grow" to="/">MyShopName</Link>
                            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav2">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse row p-2 " id="navbarNav2">
                                <ul className="navbar-nav ml-auto col-12 col-md-5  ">
                                    <li className="nav-item mt-2 navbar-user">
                                        <Link className="nav-link navbar-user" to="/">The Product</Link>
                                    </li>
                                    <li className="nav-item mt-2 ">
                                        <Link className="nav-link navbar-user " to="/productcart"><FontAwesomeIcon className='navbar-user'  icon={faShoppingCart} /> My Cart</Link>
                                    </li>
                                    <li className="nav-item dropdown mt-2">
                                        <Link to="/" className="nav-link dropdown-toggle navbar-user" data-toggle="dropdown">Hello {username}</Link>
                                        <div className="dropdown-menu">                                            
                                            <Link to="/productcart" className="dropdown-item">Cart</Link>
                                            <Link to="/" className="dropdown-item">Profile</Link>
                                            <button onClick={this.props.onLogoutUser} className="dropdown-item">Logout</button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            );
        }
    }

}


const mapStateToProps = state => {
    console.log(state);
    
    return {
        user: state.auth,
        userStat: state.auth
    }
}



export default connect(mapStateToProps, { onLogoutUser })(Header)