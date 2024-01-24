import { useState } from "react"
import "./Gallery.css"
import productsData from "../../../data.json"

const Gallery = () => {
    const [activeImg, setActiveImg] = useState("img/products/product1/1.png")

    return (
        <div className="product-gallery">
            <div className="single-image-wrapper">
                <img src={activeImg} id="single-image" alt="" />
            </div>
            <div className="product-thumb">
                <div className="glide__track" data-glide-el="track">
                    <ol className="gallery-thumbs glide__slides" >
                        {productsData[0].img.thumbs.map((itemImg,key) => (
                            <li className="glide__slide glide__slide--active" key={key} onClick={()=> setActiveImg(itemImg)}>
                                <img src={itemImg} alt="" className={`img-fluid ${itemImg === activeImg ? "active": ""}`} />
                            </li>
                        ))}

                    </ol>
                </div>
                <div className="glide__arrows" data-glide-el="controls">
                    <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Gallery