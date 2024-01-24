import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setcartItems] = useState(
        localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    ) /* bunun işlemleri ProductItem.jsx de */
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (cartItem) => {
        // setcartItems([...cartItems,product] 1. yol)
        setcartItems((prevCart) => [...prevCart, cartItem]); /* 2. yol */

    };

    const removeFromCart = (itemId) => {
        const filteredCartItems = cartItems.filter((cartItem)=> {
            return cartItem.id !==itemId;
        });

        setcartItems(filteredCartItems)
    }
    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider