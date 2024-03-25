
import { useContext } from "react"
import {useNavigate} from "react-router-dom"
import "./ProductItem.css"
import { CartContext } from "../../context/CartProvider"




const ProductItem = ({productItem}) =>{
    
    const {addToCart, cartItems } = useContext(CartContext)
    const navigate = useNavigate();

    const filteredCart = cartItems.find(
      (cartItem)=> cartItem._id === productItem._id
      )

   const originalPrice = productItem.price.current;
   const discountPercentage= productItem.price.discount;

   //İndirimli Fiyat Hesaplama
   const discountedPrice = originalPrice - (discountPercentage * originalPrice) / 100;
   
    return(
        <div className="product-item glide__slide glide__slide--active">
      <div className="product-image">
          
        <a href="#">
          <img src={productItem.img[0]} alt="" className="img1"/>
          <img src={productItem.img[1]} alt="" className="img2"/>
        </a>
      </div>
     
      <div className="product-info">
        
        <a href="$" className="product-title">{productItem.name}</a>
        <ul className="product-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-half"></i>
          </li>
        </ul>
        <div className="product-prices">
          <strong className="new-price">{`$${discountedPrice.toFixed(2)}`}</strong>
          <span className="old-price">{`$${originalPrice.toFixed(2)}`}</span>
        </div>
        <span className="product-discount">-{productItem.price.discount}%</span>
        <div className="product-links">
          <button className="add-to-cart" onClick={()=> addToCart({
            ...productItem,
            price:discountedPrice,
          })
          } 
          disabled={filteredCart}>
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          {/* Link yönteminin diğer alternatifi */}
          <a className="product-link" onClick={(e)=>{
            e.preventDefault()
            navigate(`/product/${productItem._id}`)  
          }}> 
            <i className="bi bi-eye-fill"></i>
          </a>
          <a href="#">
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </div>
    )
}


export default ProductItem