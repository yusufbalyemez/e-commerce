import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import MainLayout from './layouts/MainLayout.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> bunun kaldırılmasının sebebi development mode olarak geçiyormuş. Bu olunca konsolda 2 kere işlem yapılıyordu
    <MainLayout>
      <App />
    </MainLayout>
  // </React.StrictMode>,
)
