import './App.css'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
import Policy from './components/Layout/Policy/Policy'
import Slider from './components/Layout/Slider/Sliders'
import Categories from './components/Layout/Categories/Categories'

function App() {


  return (
    <div>
      <Header />
      <Slider/>
      <Categories/>
      <Policy/>
      <Footer/>
    </div>
  )
}

export default App
