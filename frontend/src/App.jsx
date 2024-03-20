import React from 'react'
import { Routes, Route } from "react-router-dom"
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import AuthPage from './pages/AuthPage'
import CartPage from './pages/CartPage'
import BlogDetailPage from './pages/BlogDetailPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import UserPage from './pages/Admin/UserPage'
import CategoryPage from './pages/Admin/Categories/CategoryPage'
import UpdateCategoryPage from './pages/Admin/Categories/UpdateCategoryPage'
import CreateCategoryPage from './pages/Admin/Categories/CreateCategoryPage'
import './App.css'
import CreateProductPage from './pages/Admin/Products/CreateProductPage'




function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/blog/:id" element={<BlogDetailPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path='/admin/*'>
        <Route path='users' element={<UserPage/>}/>
        <Route path='categories' element={<CategoryPage/>}/>
        <Route path='categories/create' element={<CreateCategoryPage/>} />
        <Route path='categories/update/:id' element={<UpdateCategoryPage/>} />
        <Route path='products/create' element={<CreateProductPage/>} />
      </Route>

    </Routes>

  )
}

export default App
