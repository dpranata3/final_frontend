import React, { Component } from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class ManageUser extends Component {


    state={
        users:[],
        selUid:0
    }


    getUser = () => {
        axios.get('/users/manage')
            .then(res => {
                this.setState({users: res.data,selUid:0})
            })
    }

    renderList =()=>{
        return this.state.users.map(user => {
            if(user.customer_id!== this.state.selUid){
                return (
                    <tr key={user.customer_id}>
                        <td>{user.customer_id}</td>
                        <td>{user.cust_username}</td>
                        <td>{user.cust_firstname}</td>
                        <td>{user.cust_lastname}</td>
                        <td>{user.cust_email}</td>
                        <td>{user.createdAt}</td>
                        <td>
                            <button className="btn btn-primary mr-2" onClick={()=>{this.onEditUser(user.customer_id)}}>Edit</button>
                            <button className="btn btn-danger" onClick={()=>{this.onUserDel(user.customer_id)}}>Delete</button>
                        </td>
                    </tr>
                )
            } else {
                return (//when edit data
                    <tr key={user.customer_id}>
                        <td>{user.customer_id}</td>
                        <td>
                            <input className="form-control" ref={input => {this.editFirstname = input}} type="text" defaultValue={user.cust_firsname}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editLastname = input}} type="text" defaultValue={user.cust_lastname}/>
                        </td>
                        <td>
                            <button onClick={() => {this.onSaveUser(user.customer_id)}} className="btn btn-primary mb-2">Save</button>
                            <button onClick={() => {this.setState({selUid: 0})}} className="btn btn-danger">Cancel</button>
                        </td>
                    </tr>
                )

            }
        })
    }

    render (){
        if(this.props.user !==""){
            return (
                <div className="container">
                    <h1 className="display-4 text-center">Manage User</h1>
                    <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">USERNAME</th>
                                <th scope="col">FIRSTNAME</th>
                                <th scope="col">LASTNAME</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">CREATED AT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                </div>
            )
        } else {
           return(<Redirect to='/login'/>);
           
        }


    }
}

const mapStateToProps = state =>{
    return {
        user: state.auth.username
    }
}

export default connect(mapStateToProps)(ManageUser)