import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from '../config/axios'
import {connect}  from 'react-redux'
import Cookies from 'universal-cookie';


const cookie = new Cookies()
class ProductItem extends Component {
  // add to cart
  state = {
    cart:[]
  }
  
  onAddCart =(id)=>{
    const inputQty = parseInt(this.qty.value)

    if (id !== undefined) {
      axios.get(`http://localhost:1991/products/`, {
        params: {
          id
        }
      }).then(res => {
        console.log(res.data)
        const prodName = res.data[0].name
        axios.get(`http://localhost:1991/carts`,{
          params:{
            username: cookie.get("masihLogin"),
            productId: id
          }
        }).then(resCart =>{
          if(resCart.data.length > 0){
          console.log(resCart.data)
          const proId= resCart.data[0].id
          const oldQty = resCart.data[0].qty
                   
            axios.put(`http://localhost:1991/carts/${proId}`,{
          
              productId : resCart.data[0].productId,
              username  : this.props.username,
              name      : resCart.data[0].name,
              qty       : oldQty + inputQty,       
              desc      : resCart.data[0].desc,
              price     : resCart.data[0].price,
              src       : resCart.data[0].src  
            }).then(res=>{
              alert(`quantity ${prodName} yang baru telah diupdate`)
            })
          } else {
            axios.post(`http://localhost:1991/carts`,{
              productId: res.data[0].id,
              username  : this.props.username,
              name      : res.data[0].name,
              qty       : inputQty,       
              desc      : res.data[0].desc,
              price     : res.data[0].price,
              src       : res.data[0].src
            }).then(res=>{
              
              alert(`produk ${prodName} telah berhasil ditambahkan ke keranjang anda`)
            })
          }
        })      
      })
    }
  }



  render() {
   if(this.props.username!==""){
    const { item } = this.props;
    

    
    return (
      <div className="card col-lg-3 m-3 col-sm-12 ml-1 " style={{ width: "18rem" }} key={item.id}>
        <img src={`http://localhost:2019/prodImgs/${item.prod_image}`} className="card-img-top" alt={item.prod_name} />
        <div className="card-body">
          <h5 className="card-title">{item.prod_name}</h5>
          <p className="card-text">{item.prod_desc}</p>
          <p className="card-text">Rp.{item.prod_price}</p>
        </div>
        <div className="card-footer">
        {/* input qty */}
          <input ref={input => this.qty = input} className="form-control" type="number" min="0" defaultValue={1}></input>
          <Link to={"/detailproduct/" + item.id}>
            <button className="btn btn-secondary btn-block btn-sm my-2">
              Detail
            </button>
          </Link>
            <button onClick={()=>{this.onAddCart(item.id)}} className="btn btn-primary btn-block btn-sm my-2">
              Add to Cart
          </button>
        </div>
      </div>
    );
   } else {
    const { item } = this.props;
    return (
      <div className="card col-3 m-3" style={{ width: "18rem" }} key={item.id}>
        <img src={`http://localhost:2019/prodImgs/${item.prod_image}`} className="card-img-top" alt={item.prod_name} />
        <div className="card-body">
          <h5 className="card-title">{item.prod_name}</h5>
          <p className="card-text">{item.prod_desc}</p>
          <p className="card-text">Rp.{item.prod_price}</p>
        </div>
        <div className="card-footer">
        {/* input qty */}
          <input ref={input => this.qty = input} className="form-control" type="number"  min="0" defaultValue={1}></input>
          <Link to={"/detailproduct/" + item.id}>
            <button className="btn btn-secondary btn-block btn-sm my-2">
              Detail
            </button>
          </Link>
          <Link to="/login">
          <button className="btn btn-primary btn-block btn-sm my-2">
              Add to Cart
          </button>
          </Link>
           
        </div>
      </div>
    );
    
   }
    
  }
}

const mapStateToProps = state =>{
    return {username:state.auth.username}
}

export default connect(mapStateToProps)(ProductItem);