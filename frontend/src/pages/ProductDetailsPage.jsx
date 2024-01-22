import {Fragment} from 'react'
import ProductDetails from '../components/ProductDetails/ProductDetails'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const ProductDetailsPage = () => {
  return (
    <Fragment>
        <Header/>
        <ProductDetails/>
        <Footer/>
        
    </Fragment>
  )
}

export default ProductDetailsPage