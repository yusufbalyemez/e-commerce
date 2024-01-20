import Header from '../components/Layout/Header/Header'
import Footer from '../components/Layout/Footer/Footer'
import Policy from '../components/Layout/Policy/Policy'
import Slider from '../components/Layout/Slider/Sliders'
import Categories from '../components/Layout/Categories/Categories'
import Products from '../components/Layout/Products/Products'
import Campaigns from '../components/Layout/Campaigns/Campaigns'

import Blogs from '../components/Layout/Blogs/Blogs'
import Brands from '../components/Layout/Brands/Brands'
import CampaignSingle from '../components/Layout/CampaignSingle/CampaignSingle'
const HomePage = () => {
    return (
        <div>
            <Header />
            <Slider />
            <Categories />
            <Products />
            <Campaigns />
            <Blogs />
            <Brands />
            <CampaignSingle />
            <Policy />
            <Footer />
        </div>
    )
}

export default HomePage