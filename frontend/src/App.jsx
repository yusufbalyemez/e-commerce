import React from 'react'
import { Routes,Route } from "react-router-dom"
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ContactPage from './pages/ContactPage'
import AuthPage from './pages/AuthPage'
import CartPage from './pages/CartPage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
    </Routes>

  )
}

export default App
