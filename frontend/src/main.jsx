import React from 'react'
import ReactDOM from 'react-dom/client'
import CartProvider from "./context/CartProvider.jsx"
import {BrowserRouter} from "react-router-dom"
import { Layout } from './layouts/Layout.jsx'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'


//bu kod güzelmiş. Linklere göre kontrol. Console log ile içeriğine bak.
// const isAdmin = window.location; 
// console.log(isAdmin)


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      {/* // <React.StrictMode> bunun kaldırılmasının sebebi development mode olarak geçiyormuş. Bu olunca konsolda 2 kere işlem yapılıyordu */}
      <Layout>
        <App />
      </Layout>
      {/* // </React.StrictMode>, */}
    </CartProvider>
  </BrowserRouter>

)
