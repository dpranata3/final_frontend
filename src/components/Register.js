import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { onRegisterUser } from '../actions'


class Register extends Component {

  onRegisterClick = () => {
    const firstname = this.cust_firstname.value
    const lastname = this.cust_lastname.value
    const username = this.cust_username.value
    const email = this.cust_email.value
    const password = this.cust_password.value
    

    this.props.onRegisterUser(firstname, lastname,username,email,password)
   
  }

  onErrorRegister = () => {
    if (this.props.error !== "") {
      return (

        <div className="alert alert-danger mt-4">
          {this.props.error}
        </div>
      )
    } else {
      return null
    }

  }

  onSuccessRegister = () => {
    if (this.props.success !== "") {
      return (
        <div className="alert alert-success mt-4">
          {this.props.success}
        </div>
      )
    }
    else {
      return null
    }
  }


  render() {

    if (this.props.username === "") {
      return (
        <div className="mt-5 row">
          <div className="col-sm-3 mx-auto card">
            <div className="card-body">
              <div className="border-bottom border-secondary card-title">
                <h1>Register</h1>
              </div>
              <div className="card-title mt-1">
                <h4>Firstname</h4>
              </div>
              <form className="input-group">
                {/* capture from input firstname */}
                <input ref={input => { this.cust_firstname = input }} className="form-control" type="text" placeholder="Your firstname"/>
              </form>
              <div className="card-title mt-1">
                <h4>Lastname</h4>
              </div>
              <form className="input-group">
                {/* capture from input lastname */}
                <input ref={input => { this.cust_lastname = input }} className="form-control" type="text" 
                placeholder="Your lastname"/>
              </form>
              <div className="card-title mt-1">
                <h4>Username</h4>
              </div>
              <form className="input-group">
                {/* capture from input username */}
                <input ref={input => { this.cust_username = input }} className="form-control" type="text" 
                placeholder="choose your username"/>
              </form>
              <div className="card-title mt-1">
                <h4>Email</h4>
              </div>
              <form className="input-group">
                {/* capture from input email */}
                <input ref={input => { this.cust_email = input }} className="form-control" type="text" 
                placeholder="Your email"/>
              </form>
              <div className="card-title mt-1">
                <h4>Password</h4>
              </div>
              <form className="input-group">
                {/* capture from input password */}
                <input ref={input => { this.cust_password = input }} className="form-control" type="password" 
                placeholder="Type your password"/>
              </form>
              {/* action after Register button is clicked */}
              <button className="btn btn-success btn-block mt-5" onClick={this.onRegisterClick}>Register</button>
              {/* Notif */}
              {this.onErrorRegister()}
              {this.onSuccessRegister()}

              <p className="lead">Already have account ? <Link to="/Login">Sign In!</Link></p>
            </div>
          </div>
        </div>
      )
    } else {
      return (<Redirect to="/" />)
    }

  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    error: state.auth.error,
    success: state.auth.success
  }
}

export default connect(mapStateToProps, { onRegisterUser })(Register)