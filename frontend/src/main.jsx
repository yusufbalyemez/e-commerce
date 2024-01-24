import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartProvider from "./context/CartProvider.jsx"
import MainLayout from './layouts/MainLayout.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
  {/* // <React.StrictMode> bunun kaldırılmasının sebebi development mode olarak geçiyormuş. Bu olunca konsolda 2 kere işlem yapılıyordu */}
      <MainLayout>
        <App />
      </MainLayout>
  {/* // </React.StrictMode>, */}
  </CartProvider>
)
