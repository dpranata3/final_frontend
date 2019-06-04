import React, { Component } from 'react'
import axios from '../config/axios'


class DetailProduct extends Component {
    state = {
        product : {},
        prodImage: {}
    }

    componentDidMount() {
        const idproduct = parseInt(this.props.match.params.id_product)
        axios.get(`/products/detail/${idproduct}`)
            .then(res => {
                this.setState({product: res.data})
                const imgName = res.data.prod_image
                axios.get(`/products/image/${imgName}`)
                    .then(res=>{
                        this.setState({prodImage: res.data}) 
                    })
            })
    }
    
    

    render() {
        const {product} = this.state
        const prodImg = this.state.prodImage

    
        
        
        
        
        return (
            <div className="card" key={product.id}>
                <div className="card-header">
                    {product.prod_name}
                </div>
                <div className="card-body">
                    <img src={prodImg} alt={product.prod_name} />
                    <h3 className="card-title">Product: {product.prod_name}</h3>
                    <p className="card-text">Description: {product.prod_desc}</p>
                    <p className="card-text">Price: Rp.{product.prod_price}</p>
                    <a href="/productcart" className="btn btn-block btn-primary">Add to Cart</a>
                </div>
            </div>
        )
    }
}

export default DetailProduct;