import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
import Policy from './components/Layout/Policy/Policy'
import Slider from './components/Layout/Slider/Sliders'
import Categories from './components/Layout/Categories/Categories'
import Products from './components/Layout/Products/Products'
import './App.css'

function App() {


  return (
    <div>
      <Header />
      <Slider/>
      <Categories/>
      <Products/>
      <Policy/>
      <Footer/>
    </div>
  )
}

export default App
