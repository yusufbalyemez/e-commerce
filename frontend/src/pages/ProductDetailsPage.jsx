import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import ProductDetails from '../components/ProductDetails/ProductDetails'
const ProductDetailsPage = () => {
    // 1. Yöntem
    // const params = useParams(); 

    // 2. Yöntem
    const { id: productId } = useParams();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [singleProduct, setSingleProduct] = useState(null);

    const fetchSingleProduct = async () => {

        try {
            const response = await fetch(`${apiUrl}/api/products/${productId}`);

            if (response.ok) {
                const data = await response.json();
                setSingleProduct(data);
            } else {
                console.log("Listelenemedi. Api de bir hata var.")
            }
        } catch (error) {
            console.log("Bir hata:", error)
        }

    }

    useEffect(() => {
        fetchSingleProduct();
    }, []);

    console.log(singleProduct);

    return singleProduct ? <ProductDetails singleProduct={singleProduct}/> : <p>Ürün yükleniyor...</p>
}
export default ProductDetailsPage