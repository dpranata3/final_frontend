import React, { Component } from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {onAddProduct} from '../actions/products'
import {onSaveProduct} from '../actions/products'



class ManageProduct extends Component {
    
    state = {
        products: [],
        selectedId:0,
        categories:[],
        prodImg:[]
    }
    //ADD PRODUCT
    onAddProductClick = () =>{
        const pCode = this.pCode.value
        const pName = this.pName.value
        const pDesc = this.pDesc.value
        const pPrice = parseInt(this.pPrice.value)
        const pStock = parseInt(this.pStock.value)
        const pCatg = this.categories.value
        const pImg = this.pImg.files[0]

        this.props.onAddProduct(pCode,pName,pDesc,pPrice,pStock,pCatg,pImg)

    }

    //DELETE PRODUCT
    onProdDel =(id)=>{
        const delId = id
        
        axios.delete(`/products/delete/${delId}`)
        
        .then(res => {
            this.getProduct()
        })     
    }
    
   
    //EDIT PRODUCT
    onEditProd =id=>{
        this.setState({selectedId:id})
    }

    onSaveProd =(id)=>{
        const eCode = this.editCode.value
        const eName = this.editName.value
        const eDesc = this.editDesc.value
        const ePrice = parseInt(this.editPrice.value)
        //const eImg = this.editImg.files[0]
        const eStock = parseInt(this.editStock.value)
        const eSafe = parseInt(this.editSafe.value)
        const eStat = parseInt(this.editStat.value)
        const pId = id

        this.props.onSaveProduct(eCode,eName,eDesc,ePrice,eStock,eSafe,eStat,pId)
    }

    componentDidMount() {
        this.getProduct()
        this.getCatg()
    }
   
    getCatg = ()=>{
        axios.get('http://localhost:2019/categories/all')
            .then(resCatg=>{
                this.setState({categories:resCatg.data})
            })
    }

    getProduct = () => {
        axios.get('/products/manage')
            .then(resProd => {
                this.setState({products: resProd.data,selectedId:0})
            })
    }

    getProdImg = (prod_image)=>{
        axios.get(`/products/image/${prod_image}`)
        .then(res=>{
        })
    }
    


    catgList = () =>{
        return this.state.categories.map(catg=>{
            return(
                <option>{catg.category_name}</option>
            )
        })
    }

    imageList = () =>{
        return this.state.prodImg.map(prodImg=>{
            return(
                <img classname="list" src={`http://localhost:2019/prodImg/${prodImg}`}></img>
            )
        })
    }
    
    
    renderList = () => {  
        return this.state.products.map(prod => {
            this.getProdImg(prod.prod_image)
            if(prod.id!== this.state.selectedId){
                return (
                    <tr key={prod.id}>
                        <td>{prod.id}</td>
                        <td>{prod.prod_code}</td>
                        <td>{prod.prod_name}</td>
                        <td>{prod.prod_desc}</td>
                        <td>{prod.prod_price}</td>
                        <td><img src="" className="list"></img></td>
                        <td>{prod.curr_stock}</td>
                        <td>{prod.safety_stock}</td>
                        <td>{prod.prod_status}</td>
                        <td>
                            <button className="btn btn-primary mr-2" onClick={()=>{this.onEditProd(prod.id)}}>Edit</button>
                            <button className="btn btn-danger" onClick={()=>{this.onProdDel(prod.id)}}>Delete</button>
                        </td>
                    </tr>
                )
            } else {
                return (//when edit data
                    <tr key={prod.id}>
                        <td>{prod.id}</td>
                        <td>
                            <input className="form-control" ref={input => {this.editCode = input}} type="text" defaultValue={prod.prod_code}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editName = input}} type="text" defaultValue={prod.prod_name}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editDesc = input}} type="text" defaultValue={prod.prod_desc}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editPrice = input}} type="text" defaultValue={prod.prod_price}/>
                        </td>
                        <td>
                            {/* <input className="form-control" ref={input => this.editImg = input}  type="file" /> */}
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editStock = input}} type="text" defaultValue={prod.curr_stock}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editSafe = input}} type="text" defaultValue={prod.safety_stock}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editStat = input}} type="text" defaultValue={prod.prod_status}/>
                        </td>
                        
                        <td>
                            <button onClick={() => {this.onSaveProd (prod.id)}} className="btn btn-primary mb-2">Save</button>
                            <button onClick={() => {this.setState({selectedId: 0})}} className="btn btn-danger">Cancel</button>
                        </td>
                    </tr>
                )

            }
        })
    }


    render() {
        if(this.props.user !==""){
            return (
                <div className="container">
                    <h1 className="display-4 text-center">Manage Product</h1>
                    <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">CODE</th>
                                <th scope="col">NAME</th>
                                <th scope="col">DESC</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">STOCK</th>
                                <th scope="col">SAFETY STOCK</th>
                                <th scope="col">STATUS</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                    <h1 className="display-4 text-center">Add Product</h1>
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">PRODUCT CODE</th>
                                <th scope="col">PRODUCT NAME</th>
                                <th scope="col">PRODUCT DESC</th>
                                <th scope="col">PRODUCT PRICE</th>
                                <th scope="col">PRODUCT STOCK</th>
                                <th scope="col">PRODUCT CATEGORY</th>
                                <th scope="col">PRODUCT IMAGE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col"><input ref={input => this.pCode = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.pName = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.pDesc = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.pPrice = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.pStock = input} className="form-control" type="text" /></th>
                                <th scope="col"><select className="form-control" ref={select=>{this.categories = select}}>{this.catgList()}</select></th>
                                <th scope="col"><input ref={input => this.pImg = input} className="form-control" type="file" /></th>
                                <th scope="col"><button className="btn btn-outline-warning" onClick={this.onAddProductClick} >Add</button></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return(<Redirect to ="/" />)
        }     
    }
}

const mapStateToProps = state =>{
    return {
        user: state.auth.username
    }
}

export default connect(mapStateToProps,{onAddProduct,onSaveProduct})(ManageProduct)