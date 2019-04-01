import React, { Component } from 'react'
import axios from 'axios'


import ProductItem from './ProductItem'


// Carousel for display the promote product


 class Home extends Component {
       
    //product list
    state = {
        products: []
    }

    componentDidMount () {
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:1991/products')
            .then(res => {
                this.setState({products: res.data})
            })
    }
    renderList = () => {
        return this.state.products.map(iteem => {
             return (
                 <ProductItem 
                    key={iteem.id}
                    item={iteem}
                 />
             )
         })
     }
    

    render() {
        
        return (
            
            <div>
                {/* carousel */}
                <div>
                    <div id="carouselExampleSlidesOnly" className="carousel slide navbar" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={require('../images/1.jpg')} data-interval="1500" className="d-block imgCarousel  " alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img  src={require('../images/2.jpg')} data-interval="1500" className="d-block imgCarousel " alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img  src={require('../images/3.jpg')} data-interval="1500" className="d-block imgCarousel " alt="..." />
                            </div>
                        </div>
                    </div>
                </div>

                
                    <div className="row">
                        <div className="col-2">
                            <h1 className="display-4">Search</h1>
                        </div>
                        <div className="row col-lg-10">
                            {this.renderList()}
                        </div>
                    </div>
               

                <section>
                    <div id="explore-section" className="bg-primary text-white">
                    <div className="row">
                    <h1>About Product Content</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                            vel odio orci. Nunc auctor rutrum erat, sit amet tristique
                            justo. Aenean sed interdum libero. Integer mattis nisi a
                            interdum semper. Aenean lectus ante, ullamcorper et tortor id,
                            semper posuere eros. Suspendisse potenti. In tempus venenatis
                            justo, quis eleifend dui varius eget. Lorem ipsum dolor sit
                            amet, consectetur adipiscing elit. Nunc eget finibus nibh, et
                            eleifend libero. Mauris nec augue purus. Ut tempor bibendum
                            enim non interdum. Interdum et malesuada fames ac ante ipsum
                            primis in faucibus. Curabitur nec nibh quis turpis tincidunt
                            blandit. Ut non dolor et odio ornare hendrerit eget non massa.
                        </p>
                    </div>
                        
                    </div>
                </section>

                <section>
                    <div id="explore-section" className="bg-warning text-muted">
                        <div className="row">
                            <h1>Contact Content</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                                vel odio orci. Nunc auctor rutrum erat, sit amet tristique
                                justo. Aenean sed interdum libero. Integer mattis nisi a
                                interdum semper. Aenean lectus ante, ullamcorper et tortor id,
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Home