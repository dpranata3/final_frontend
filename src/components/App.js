import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import cookies from 'universal-cookie'
import {connect} from 'react-redux'

import Header from './Header'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import ManageProduct from './ManageProduct'
import ProductCart from './ProductCart'
import DetailProduct from './DetailProduct'
import {keepLogin} from '../actions'

const cookie = new cookies()

class App extends Component {
    //life cycle hook/method

    componentDidMount() {
        var userCookie = cookie.get('masihLogin')
        var userTipe = cookie.get('tipeUser')

        if (userCookie !== undefined) {
            this.props.keepLogin(userCookie,userTipe)      
        }
    }

    render(){
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/manageproduct" component={ManageProduct} />
                    <Route path="/productcart" component={ProductCart} />
                    <Route path="/detailproduct/:id_product" component={DetailProduct} />
                </div>
            </BrowserRouter>
        )
    }
}

export default connect (null,{keepLogin})(App)