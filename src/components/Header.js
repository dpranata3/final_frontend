import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


import { onLogoutUser } from '../actions'

class Header extends Component {

    render() {

        const { username } = this.props.user
        console.log(username)
        const { status } = this.props.stats

        console.log(status)

        if (username === '') {

            return (
                <div>
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <div className="container">
                            <Link className="navbar-brand grow" to="/">MyShopName</Link>
                            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav2">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse row p-2 " id="navbarNav2">
                                <ul className="navbar-nav ml-auto col-12 col-md-5">
                                    <li className="nav-item threed m-1">
                                        <Link className="nav-a threed" to="/">The Product</Link>
                                    </li>

                                    <li className="nav-item m-1">
                                        <Link className="nav-a text-success" to="/register"> Register</Link>
                                    </li>
                                    <li className="nav-item m-1">
                                        <Link className="nav-a text-danger" to="/login"> Login</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            );
        } else {
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
                                    <li className="nav-item threed mt-2">
                                        <Link className="nav-link" to="/">The Product</Link>
                                    </li>
                                    <li className="nav-item dropdown mt-2">
                                        <Link to="/" className="nav-link dropdown-toggle" data-toggle="dropdown">Hello {username}</Link>
                                        <div className="dropdown-menu">
                                            <Link to="/manageproduct" className="dropdown-item">Manage Product</Link>
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
    }

}


const mapStateToProps = state => {
    return { 
        user: state.auth,
        stats: state.auth
    }
}

export default connect(mapStateToProps, { onLogoutUser })(Header)