import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Policy from '../components/Policy/Policy'
import Slider from '../components/Slider/Sliders'
import Categories from '../components/Categories/Categories'
import Products from '../components/Products/Products'
import Campaigns from '../components/Campaigns/Campaigns'

import Blogs from '../components/Blogs/Blogs'
import Brands from '../components/Brands/Brands'
import CampaignSingle from '../components/CampaignSingle/CampaignSingle'
import React from 'react'
const HomePage = () => {
    return (
        <React.Fragment>
            <Header />
            <Slider />
            <Categories />
            <Products />
            <Campaigns />
            <Blogs />
            <Brands />
            <CampaignSingle />
            <Footer />
        </React.Fragment>
    )
}

export default HomePage